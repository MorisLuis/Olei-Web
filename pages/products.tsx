import { useEffect, useState } from 'react';
import styles from "../styles/Pages/Home.module.scss";

import { api } from '@/api/api';
import { GetServerSideProps } from 'next';
import { Layout } from '@/components/Layouts/Layout';
import Table from '@/components/Ui/Table';
import PorductInterface from '@/interfaces/product';
import ProductInterface from '@/interfaces/product';
import ModalRequest from '@/components/Modals/ModalRequest';
import FiltersModalContent from '@/components/Modals/ModalsComponents/FiltersModalContent';
import FiltersInterface from '@/interfaces/filters';
import HomeFilter from '@/components/HomeFilter';
import { useRouter } from 'next/router';

interface Props {
  productsProps: ProductInterface[]
}

const filterState: FiltersInterface = {
  nombre: null,
  marca: null,
  familia: null,
  folio: null,
  enStock: false,
}

export default function Home({ productsProps }: Props) {

  const { query: { page, limit }, push, query } = useRouter()
  const [products, setProducts] = useState<ProductInterface[]>(productsProps)
  const [filtersActive, setFiltersActive] = useState<FiltersInterface>(filterState);
  const [temporalFilters, setTemporalFilters] = useState<FiltersInterface>(filterState)
  const [openModalFilter, setOpenModalFilter] = useState<boolean>(false)

  const handleFiltersToQuery = () => {
    // Update the active filters from temporary filters set in FiltersModalContent and Global Search.
    setFiltersActive(temporalFilters);
    setOpenModalFilter(false);

    // Construct the base URL with pagination settings.
    let url = `/products?page=${page}&limit=${limit}`;

    /**
       * Add a query parameter to the URL if the value is defined and not empty.
       * @param paramName - The name of the query parameter.
       * @param value - The value to be added as a query parameter.
       */
    const addQueryParam = (paramName: string, value: any) => {
      if (value !== null && value !== "" && value !== undefined) {
        url += `&${paramName}=${value}`;
      }
    };

    // Add specific query parameters based on filters.
    addQueryParam("nombre", query.nombre);
    addQueryParam("marca", temporalFilters.marca);
    addQueryParam("familia", temporalFilters.familia);
    addQueryParam("folio", temporalFilters.folio);
    addQueryParam("enStock", temporalFilters.enStock);

    push(url);
  };

  const handleCloseTag = (filter: any) => {
    // Delete tag, setting filters active.
    if (filter === "enStock") {
      setFiltersActive((prevState: FiltersInterface) => ({
        ...prevState,
        [filter[0]]: false
      }))
    } else {
      setFiltersActive((prevState: FiltersInterface) => ({
        ...prevState,
        [filter[0]]: null
      }))
    }

    // Construct the base URL with pagination settings.
    let url = `/products?page=${page}&limit=${limit}`;

    //Add a query parameter to the URL if the value is defined and not empty.
    const addQueryParam = (paramName: string, value: any) => {
      if (value !== null && value !== "" && value !== undefined && value !== filter[1]) {
        url += `&${paramName}=${value}`;
      }
    };

    // Add specific query parameters based on filters.
    addQueryParam("nombre", query.nombre);
    addQueryParam("marca", filtersActive.marca);
    addQueryParam("familia", filtersActive.familia);
    addQueryParam("folio", filtersActive.folio);
    addQueryParam("enStock", filtersActive.enStock);

    push(url);
  }

  useEffect(() => {
    const UseFetchPagination = () => {
      setProducts(productsProps)
    }
    UseFetchPagination()
  }, [query])

  return (
    <>
      <Layout filtersActive={filtersActive} setFiltersActive={setFiltersActive}>
        <div className={styles.home}>

          <HomeFilter
            filterState={filterState}
            setFiltersActive={setFiltersActive}
            filtersActive={filtersActive}
            handleCloseTag={handleCloseTag}
            setOpenModalFilter={setOpenModalFilter}
          />

          <main className={styles.main}>
            <Table data={products} />
          </main>
        </div>
      </Layout>

      <ModalRequest
        visible={openModalFilter}
        title="Filtros"
        small
        modalBlack
        onClose={() => setOpenModalFilter(false)}
        onclick={handleFiltersToQuery}
      >
        <FiltersModalContent
          setTemporalFilters={setTemporalFilters}
          temporalFilters={temporalFilters}
          visible={openModalFilter}
        />
      </ModalRequest>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const page = ctx.query.page;
  const limit = ctx.query.limit;
  const nombre = ctx.query.nombre;
  const enStock = ctx.query.enStock;
  const marca = ctx.query.marca;
  const folio = ctx.query.folio;
  const familia = ctx.query.familia;

  // Construir la URL base con page y limit
  let url = `/api/product?page=${page}&limit=${limit}`;

  // Agregar los parámetros de consulta según las condiciones
  if (nombre) {
    url += `&nombre=${nombre}`;
  }

  if (enStock) {
    url += `&enStock=${enStock}`;
  }

  if (marca !== undefined) {  // Aquí usamos `!== undefined` para manejar tanto `null` como `undefined`
    url += `&marca=${marca}`;
  }

  if (folio) {
    url += `&folio=${folio}`;
  }

  if (familia) {
    url += `&familia=${familia}`;
  }

  try {
    const { data } = await api.get(url);  // Usamos la URL construida aquí
    const productsProps: PorductInterface[] = data.products;

    return {
      props: {
        productsProps
      }
    };
  } catch (error) {
    console.error(error);

    return {
      props: {
        productsProps: []
      }
    };
  }
};
