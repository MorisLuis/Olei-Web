import { useCallback, useContext, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import styles from "../styles/Pages/Products.module.scss";

import { api } from '@/api/api';
import { Layout } from '@/components/Layouts/Layout';
import HomeFilter from '@/components/HomeFilter';
import Table from '@/components/Ui/Tables/Table';
import ModalRequest from '@/components/Modals/ModalRequest';
import FiltersModalContent from '@/components/Modals/ModalsComponents/FiltersModalContent';
import PorductInterface from '@/interfaces/product';
import ProductInterface from '@/interfaces/product';
import FiltersInterface from '@/interfaces/filters';
import { CartContext, ClientContext, FiltersContext } from '@/context';
import QueryParams from '@/utils/queryParams';
import HomeSearch from '@/components/HomeSearch';


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
  const { productDelete } = useContext(CartContext);
  const { clientChanged } = useContext(ClientContext);

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


    const queryParams = {
      nombre: query.nombre,
      marca: temporalFilters.marca,
      familia: temporalFilters.familia,
      folio: temporalFilters.folio,
      enStock: temporalFilters.enStock,
    };

    const handleQueryParams = QueryParams();
    let url = handleQueryParams({ queryParams });
    push(url)
  };

  const handleCloseTag = (filter: string[]) => {

    removeFilters({
      [filter[0]]: filter[1]
    })

    console.log({ filter })

    setTemporalFilters((prevState: FiltersInterface) => ({
      ...prevState,
      [filter[0]]: filter[1] === "true" ? false : undefined
    }))

    const queryParams = {
      nombre: filter[0] === "nombre" ? undefined : filters.nombre,
      marca: filter[0] === "marca" ? null : filters.marca,
      familia: filter[0] === "familia" ? null : filters.familia,
      folio: filter[0] === "folio" ? null : filters.folio,
      enStock: filter[0] === "enStock" ? false : filters.enStock,
    }

    const handleQueryParams = QueryParams();
    let url = handleQueryParams({ queryParams });
    push(url)
  }

  const loadMoreProducts = async () => {
    setIsLoading(true);

    let url = `/api/product?page=${nextPage}&limit=20`;

    const queryParams = {
      nombre: query.nombre,
      marca: query.marca,
      familia: query.familia,
      folio: query.folio,
      enStock: query.enStock,
    };

    const handleQueryParams = QueryParams();
    let urlNew = handleQueryParams({ queryParams, url });

    try {
      setNextPage(nextPage + 1);
      if (nextPage === 1) return;

      const { data: { products } } = await api.get(urlNew);
      setProducts((prevItems: any) => [...prevItems, ...products]);
    } catch (error) {
      console.error('Error loading more items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCleanAllFilters = () => {
    setTemporalFilters(filterState)
    removeAllFilters()
    setOpenModalFilter(false);
    push("/products");
  }

  const UseFetchPagination = useCallback(() => {
    setProducts(productsProps);
  }, [productsProps]);

  useEffect(() => {
    if (clientChanged) {
      setLoadingData(false)
      const productsOfTheClient = async () => {
        const { data } = await api.get('/api/product?page=1&limit=20');
        const productsProps: PorductInterface[] = data.products;
        setProducts(productsProps)
      }
      productsOfTheClient();
      setLoadingData(true);
      return;
    }
    if (productDelete) {
      setLoadingData(false)
      setProducts(productsProps)
      setLoadingData(true)
      return;
    }
    setLoadingData(true);
    UseFetchPagination()
    setLoadingData(false);
    setNextPage(2)
  }, [query, UseFetchPagination, productDelete, productsProps, clientChanged])

  useEffect(() => {
    loadMoreProducts()
  }, [])

  useEffect(() => {
    if (Object.keys(query).length === 0) {
      removeAllFilters()
    }
  }, [])


  return (
    <>
      <Layout>
        <div className={styles.products}>

          <HomeSearch
            setTemporalFilters={setTemporalFilters}
          />

          <HomeFilter
            handleCloseTag={handleCloseTag}
            setOpenModalFilter={setOpenModalFilter}
            handleCleanAllFilters={handleCleanAllFilters}
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
  const { nombre, enStock, marca, folio, familia } = ctx.query;
  let url = `/api/product?page=1&limit=20`;

  if (nombre) url += `&nombre=${nombre}`;
  if (enStock) url += `&enStock=${enStock}`;
  if (marca !== undefined) url += `&marca=${marca}`;
  if (folio) url += `&folio=${folio}`;
  if (familia) url += `&familia=${familia}`;

  try {
    const { data } = await api.get(url);
    return {
      props: {
        productsProps: data.products,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        productsProps: [],
      },
    };
  }
};