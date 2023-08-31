import { useCallback, useContext, useEffect, useState } from 'react';
import styles from "../styles/Pages/Home.module.scss";

import { api } from '@/api/api';
import { GetServerSideProps } from 'next';
import { Layout } from '@/components/Layouts/Layout';
import PorductInterface from '@/interfaces/product';
import ProductInterface from '@/interfaces/product';
import ModalRequest from '@/components/Modals/ModalRequest';
import FiltersModalContent from '@/components/Modals/ModalsComponents/FiltersModalContent';
import FiltersInterface from '@/interfaces/filters';
import HomeFilter from '@/components/HomeFilter';
import { useRouter } from 'next/router';
import Table from '@/components/Ui/Tables/Table';
import { FiltersContext } from '@/context';
import ButtonAnimated from '@/components/Buttons/ButtonAnimated';

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

  const { push, query } = useRouter()
  const { addFilters, removeFilters, filters, removeAllFilters } = useContext(FiltersContext);

  const [products, setProducts] = useState<ProductInterface[]>(productsProps)
  const [temporalFilters, setTemporalFilters] = useState<FiltersInterface>(filterState)
  const [openModalFilter, setOpenModalFilter] = useState<boolean>(false)
  const [nextPage, setNextPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(true);


  const handleFiltersToQuery = () => {

    // Update the active filters from temporary filters set in FiltersModalContent and Global Search.
    setOpenModalFilter(false);

    addFilters(temporalFilters);

    let url = `/products`;

    // Variable to track if the first query parameter has been added
    let isFirstQueryParam = true;

    /**
     * Add a query parameter to the URL if the value is defined and not empty.
     * @param paramName - The name of the query parameter.
     * @param value - The value to be added as a query parameter.
     */
    const addQueryParam = (paramName: string, value: any) => {
      if (value !== null && value !== "" && value !== undefined && value !== false) {
        if (isFirstQueryParam) {
          url += `?${paramName}=${value}`;
          isFirstQueryParam = false;
        } else {
          url += `&${paramName}=${value}`;
        }
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

  const handleCleanAllFilters = () => {
    setOpenModalFilter(false);
    push("/products");
  }

  const handleCloseTag = (filter: any) => {

    removeFilters({
      [filter[0]]: filter[1]
    })

    setTemporalFilters((prevState: FiltersInterface) => ({
      ...prevState,
      [filter[0]]: filter[1] === "true" ? false : filter[1]
  }))

    // Construct the base URL with pagination settings.
    let url = `/products`;

    // Variable to track if the first query parameter has been added
    let isFirstQueryParam = true;

    //Add a query parameter to the URL if the value is defined and not empty.
    const addQueryParam = (paramName: string, value: any) => {
      if (value !== null && value !== "" && value !== undefined && value !== false) {
        if (isFirstQueryParam) {
          url += `?${paramName}=${value}`;
          isFirstQueryParam = false;
        } else {
          url += `&${paramName}=${value}`;
        }
      }
    };

    // Add specific query parameters based on filters.
    addQueryParam("nombre", filter[0] === "nombre" ? null : filters.nombre);
    addQueryParam("marca", filter[0] === "marca" ? null : filters.marca);
    addQueryParam("familia", filter[0] === "familia" ? null : filters.familia);
    addQueryParam("folio", filter[0] === "folio" ? null : filters.folio);
    addQueryParam("enStock", filter[0] === "enStock" ? null : filters.enStock);

    push(url);
  }

  const loadMoreProducts = async () => {
    setIsLoading(true);

    let url = `/api/product?page=${nextPage}&limit=20`;
    /**
     * Add a query parameter to the URL if the value is defined and not empty.
     * @param paramName - The name of the query parameter.
     * @param value - The value to be added as a query parameter.
     */
    const addQueryParam = (paramName: string, value: any) => {
      if (value !== null && value !== "" && value !== undefined && value !== false) {
        url += `&${paramName}=${value}`;
      }
    };

    // Add specific query parameters based on filters.
    addQueryParam("nombre", query.nombre);
    addQueryParam("marca", query.marca);
    addQueryParam("familia", query.familia);
    addQueryParam("folio", query.folio);
    addQueryParam("enStock", query.enStock);

    try {
      setNextPage(nextPage + 1);
      if (nextPage === 1) return;

      const { data: { products } } = await api.get(url);
      setProducts((prevItems) => [...prevItems, ...products]);
      console.log({products})
    } catch (error) {
      console.error('Error loading more items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const UseFetchPagination = useCallback(() => {
    setProducts(productsProps);
  }, [productsProps]);

  useEffect(() => {
    setLoadingData(true);
    UseFetchPagination()
    setLoadingData(false);
    setNextPage(2)
  }, [query, UseFetchPagination])

  useEffect(() => {
    loadMoreProducts()
    console.log("load")
  }, [])

  useEffect(() => {
    if (Object.keys(query).length === 0) {
      removeAllFilters()
    }
  }, [])

  return (
    <>
      <Layout>
        <div className={styles.home}>
          <HomeFilter
            filterState={filterState}
            handleCloseTag={handleCloseTag}
            setOpenModalFilter={setOpenModalFilter}
          />

          <main className={styles.main}>
            <Table
              data={products}
              loadMoreProducts={loadMoreProducts}
              isLoading={isLoading}
              loadingData={loadingData}
            />
          </main>
        </div>
      </Layout>

      <ModalRequest
        visible={openModalFilter}
        title="Filtros"
        small
        modalBlack
        decisionVisible

        //Methods
        onClose={() => setOpenModalFilter(false)}
        handleFiltersToQuery={handleFiltersToQuery}
        handleCleanAllFilters={handleCleanAllFilters}
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
  const nombre = ctx.query.nombre;
  const enStock = ctx.query.enStock;
  const marca = ctx.query.marca;
  const folio = ctx.query.folio;
  const familia = ctx.query.familia;

  // Construir la URL base con page y limit
  let url = `/api/product?page=1&limit=20`;

  // Agregar los parámetros de consulta según las condiciones
  if (nombre) {
    url += `&nombre=${nombre}`;
  }

  if (enStock) {
    url += `&enStock=${enStock}`;
  }

  if (marca !== undefined) {
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
