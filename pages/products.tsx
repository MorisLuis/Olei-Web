/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useContext, useEffect, useState } from 'react';
import styles from "../styles/Pages/Products.module.scss";

import { useRouter } from 'next/router';

import { Layout } from '@/components/Layouts/Layout';
import HomeFilter from '@/components/HomeFilter';
import Table from '@/components/Ui/Tables/Table';
import Modal from '@/components/Modals/Modal';
import FiltersModalContent from '@/components/Modals/ModalsComponents/FiltersModalContent';
import Grid from '@/components/Ui/Tables/Grid';

import ProductInterface from '@/interfaces/product';
import FiltersInterface from '@/interfaces/filters';
import { AuthContext, CartContext, ClientContext, FiltersContext } from '@/context';
import QueryParams from '@/utils/queryParams';
import { useTransition, animated } from 'react-spring';
import PageTransition from '@/components/PageTranstion';
import { ProductDetailsRender } from '@/components/Renders/ProductDetailsRender';
import { getProductById, getProducts, getTotalProducts } from '@/services/product';
import useErrorHandler from '@/hooks/useErrorHandler';

const filterState: FiltersInterface = {
  nombre: null,
  marca: null,
  familia: null,
  folio: null,
  enStock: false
}

export default function Home() {

  const { push, query } = useRouter();
  const { query: { nombre, enStock, marca, folio, familia } } = useRouter();
  const { handleError } = useErrorHandler()

  const { addFilters, removeAllFilters } = useContext(FiltersContext);
  const { productDelete } = useContext(CartContext);
  const { clientChanged } = useContext(ClientContext);
  const { user } = useContext(AuthContext);

  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [totalProducts, setTotalProducts] = useState(0)
  const [productDetails, setProductDetails] = useState<ProductInterface>();
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

    push(url, undefined, { shallow: true })
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

    if (!product.Marca || !product.Codigo) return;
    try {
      setOpenModalProduct(true)
      const data = await getProductById({ Codigo: product.Codigo, Marca: product?.Marca });
      if (data.error) {
        handleError(data.error);
        return;
      }
      setProductDetails(data);
    } catch (error) {
      handleError(error);
    }

  }

  const loadMoreProducts = useCallback(async () => {
    setButtonIsLoading(true);
    try {
      setNextPage(nextPage + 1);
      if (nextPage === 1) return;
      const data = await getProducts(query, nextPage);
      if (data.error) {
        handleError(data.error);
        return;
      }
      setProducts((prevItems: any) => [...prevItems, ...data]);
    } catch (error) {
      setButtonIsLoading(false);
      handleError(error);
    } finally {
      setButtonIsLoading(false);
    }
  }, [nextPage, query]);

  const handleProduct = async () => {
    setLoadingData(true);
    const data = await getProducts(query)
    const total = await getTotalProducts(query)
    setTotalProducts(total)
    setProducts(data)
    setLoadingData(false);
  }

  useEffect(() => {
    if (clientChanged) {
      handleProduct();
      return;
    }

    if (productDelete) {
      setLoadingData(false)
      setProducts(products)
      setLoadingData(true)
      return;
    }

    setLoadingData(true);
    setProducts(products);
    setLoadingData(false);
    setNextPage(2)
  }, [query, productDelete, products, clientChanged])

  // Effect to clean all filter if the query is clean of filters.
  useEffect(() => {
    if (Object.keys(query).length === 0) {
      removeAllFilters()
    }
  }, [])

  useEffect(() => {
    setIsEntering(false);
  }, []);

  useEffect(() => {
    handleProduct()
  }, [nombre, enStock, marca, folio, familia])

  // Animation
  const transitions = useTransition(showGrid, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 500 },
  });

  console.log({clientChanged})

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
                      totalItems={totalProducts}
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
                      totalItems={totalProducts}
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
        visible={(query.product && openModalProduct) ? true : false}
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