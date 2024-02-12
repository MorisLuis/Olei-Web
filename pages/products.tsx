/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useContext, useEffect, useState } from 'react';
import styles from "../styles/Pages/Products.module.scss";

import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { api } from '@/api/api';

import { Layout } from '@/components/Layouts/Layout';
import HomeFilter from '@/components/HomeFilter';
import Table from '@/components/Ui/Tables/Table';
import Modal from '@/components/Modals/Modal';
import FiltersModalContent from '@/components/Modals/ModalsComponents/FiltersModalContent';
import Grid from '@/components/Ui/Tables/Grid';
import HomeSearch from '@/components/Search/HomeSearch';

import PorductInterface from '@/interfaces/product';
import ProductInterface from '@/interfaces/product';
import FiltersInterface from '@/interfaces/filters';
import { AuthContext, CartContext, ClientContext, FiltersContext } from '@/context';
import QueryParams from '@/utils/queryParams';
import { useTransition, animated } from 'react-spring';
import PageTransition from '@/components/PageTranstion';
import { ProductDetailsRender } from '@/components/Renders/ProductDetailsRender';

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

  const { push, query } = useRouter();
  const { addFilters, removeAllFilters } = useContext(FiltersContext);
  const { productDelete } = useContext(CartContext);
  const { clientChanged } = useContext(ClientContext);
  const { user } = useContext(AuthContext);

  const [products, setProducts] = useState<ProductInterface[]>(productsProps);
  const [productDetails, setProductDetails] = useState<PorductInterface>();
  const [temporalFilters, setTemporalFilters] = useState<FiltersInterface>(filterState);
  const [openModalFilter, setOpenModalFilter] = useState<boolean>(false);
  const [openModalProduct, setOpenModalProduct] = useState<boolean>(false);
  const [nextPage, setNextPage] = useState<number>(1)
  const [showGrid, setShowGrid] = useState(true);
  const [buttonIsLoading, setButtonIsLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true); // Is used to handle the skeleton state in grid and table.
  const [isEntering, setIsEntering] = useState(true); // Part of the animation with react-spring.

  // Used when filters are selected to change the query. Used in Modal.
  const handleFiltersToQuery = () => {

    // Update the active filters from temporary filters set in FiltersModalContent and Global Search.
    setLoadingData(false)
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
    setLoadingData(true)

  };

  // Used to clean all filters.
  const handleCleanAllFilters = () => {
    setLoadingData(false)
    setTemporalFilters(filterState)
    removeAllFilters()
    setOpenModalFilter(false);
    push("/products");
    setLoadingData(true)
  }

  // Used to fetch product when this is selected.
  const handleSelectProduct = async (product: ProductInterface) => {
    

    console.log({
      product
    })
    if (!product) return;

    console.log({
      endpoint: `/api/product/${product.Codigo}?Marca=${product.Marca}`
    })

    try {
      setOpenModalProduct(true)
      const { data } = await api.get(`/api/product/${product.Codigo}?Marca=${product.Marca}`);
      console.log({
        data
      })
      if (data) {
        setProductDetails(data);
      }
    } catch (error) {
      console.log({ error })
    }

  }

  const loadMoreProducts = useCallback(async () => {
    setButtonIsLoading(true);

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
      setButtonIsLoading(false);
    }
  }, [nextPage, query]);

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
    //UseFetchPagination();
    setProducts(productsProps);
    setLoadingData(false);
    setNextPage(2)
  }, [query, productDelete, productsProps, clientChanged])

  // Effect to clean all filter if the query is clean of filters.
  useEffect(() => {
    if (Object.keys(query).length === 0) {
      removeAllFilters()
    }
  }, [])

  // Animation
  const transitions = useTransition(showGrid, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 500 },
  });

  useEffect(() => {
    setIsEntering(false);
  }, []);

  return (
    <>
      <PageTransition key="login-transition" isEntering={isEntering === false}>
        <Layout>
          <div className={styles.products}>

            <HomeFilter
              setOpenModalFilter={setOpenModalFilter}
              setShowGrid={setShowGrid}
              showGrid={showGrid}
              setTemporalFilters={setTemporalFilters}
              setLoadingData={setLoadingData}

              //Methods
              handleCleanAllFilters={handleCleanAllFilters}
            />

            {transitions((style, item) =>
              (item && user?.SwImagenes) ? (
                <main className={styles.content}>
                  <animated.div style={{ ...style, width: "100%" }}>
                    <Grid
                      data={products}
                      loadMoreProducts={loadMoreProducts}
                      buttonIsLoading={buttonIsLoading}
                      loadingData={loadingData}
                      handleSelectProduct={handleSelectProduct}
                    />
                  </animated.div>
                </main>
              ) : (
                <main className={styles.content}>
                  <animated.div style={{ ...style, width: "100%" }}>
                    <Table
                      data={products}
                      loadMoreProducts={loadMoreProducts}
                      buttonIsLoading={buttonIsLoading}
                      loadingData={loadingData}
                    />
                  </animated.div>
                </main>
              )
            )}
          </div>
        </Layout>
      </PageTransition>

      <Modal
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
      </Modal>

      <Modal
        visible={query.product && openModalProduct}
        title="Producto"
        modalBlack

        //Methods
        onClose={() => {
          push('/products', undefined, { scroll: false });
          setOpenModalProduct(false);
          setProductDetails(undefined);
        }}
      >
        <ProductDetailsRender product={productDetails as ProductInterface} />
      </Modal>
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
    const productsProps: ProductInterface[] = data.products

    return {
      props: {
        productsProps
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