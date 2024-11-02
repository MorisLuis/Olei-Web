/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from "../styles/Pages/Products.module.scss";

import { Layout } from '@/components/Layouts/Layout';
import HomeFilter from '@/components/HomeFilter';
import Modal from '@/components/Modals/Modal';
import FiltersModalContent from '@/components/Modals/ModalsComponents/FiltersModalContent';
import { ProductDetailsRender } from '@/components/Renders/ProductDetailsRender';

import ProductInterface from '@/interfaces/product';
import { AuthContext, CartContext, ClientContext, FiltersContext } from '@/context';
import { getProductById, getProducts } from '@/services/product';
import useErrorHandler from '@/hooks/useErrorHandler';
import TableProducts from '@/components/Ui/Tables/TableComponents/TableProducts';
import { useLoadMoreData } from '@/hooks/useLoadMoreData';
import FiltersInterface from '@/interfaces/filters';
import GridProducts from '@/components/Ui/Tables/TableComponents/GridProducts';


export default function Home() {
   const { push, query } = useRouter();
   const { handleError } = useErrorHandler();

   const { filters } = useContext(FiltersContext);
   const { nombre, enStock, marca, folio, familia } = filters;
   const { productDelete } = useContext(CartContext);
   const { clientChanged } = useContext(ClientContext);
   const { user } = useContext(AuthContext);

   const [products, setProducts] = useState<ProductInterface[]>([]);
   const [productDetails, setProductDetails] = useState<ProductInterface>();
   const [openModalFilter, setOpenModalFilter] = useState<boolean>(false);
   const [openModalProduct, setOpenModalProduct] = useState<boolean>(false);
   const [showGrid, setShowGrid] = useState(true);
   const [loadingData, setLoadingData] = useState(true); // Is used to handle the skeleton state in grid and table.

   // Handle data showed
   const { data, isLoading, isButtonLoading, total, handleResetData, handleLoadMore } = useLoadMoreData(
      {
         fetchInitialData: (filtersdata) => getProducts(filtersdata as FiltersInterface),
         fetchPaginatedData: (filtersdata, nextPage) => getProducts(filtersdata as FiltersInterface, nextPage),
         filters: filters
      }
   );

   // Used to fetch product when this is selected.
   const handleSelectProduct = async (product: ProductInterface) => {

      if (!product.Marca || !product.Codigo) return;
      try {
         setOpenModalProduct(true)
         const data = await getProductById({ Codigo: product.Codigo, Marca: product?.Marca });
         if (data.error) return handleError(data.error);
         setProductDetails(data);
      } catch (error) {
         handleError(error);
      }

   }

   const handleCloseProduct = () => {
      push('/products', undefined, { scroll: false });
      setOpenModalProduct(false);
      setProductDetails(undefined);
   };

   useEffect(() => {
      if (clientChanged) {
         handleResetData();
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
   }, [productDelete, products, clientChanged])

   useEffect(() => {
      handleResetData()
   }, [nombre, enStock, marca, folio, familia])

   return (
      <>
         <Layout>
            <div className={styles.products}>
               <HomeFilter
                  setOpenModalFilter={setOpenModalFilter}
                  setShowGrid={setShowGrid}
                  showGrid={showGrid}
                  setLoadingData={setLoadingData}
               />
               {
                  (showGrid && user?.SwImagenes) ? (
                     <GridProducts
                        products={data}
                        loadMoreProducts={handleLoadMore}
                        loadingData={loadingData}
                        buttonIsLoading={isButtonLoading}

                        handleSelectData={handleSelectProduct}
                     />
                  ) : (
                     <TableProducts
                        products={data}
                        loadMoreProducts={handleLoadMore}
                        loadingData={loadingData}
                        buttonIsLoading={isButtonLoading}
                     />
                  )
               }
            </div>
         </Layout>

         <Modal
            visible={openModalFilter}
            title="Filtros"
            small
            modalBlack
            decisionVisible

            //Methods
            onClose={() => setOpenModalFilter(false)}
         >
            <FiltersModalContent
               visible={openModalFilter}
            />
         </Modal>

         <Modal
            visible={(query.product && openModalProduct) ? true : false}
            title="Producto"
            modalBlack

            //Methods
            onClose={handleCloseProduct}
         >
            <ProductDetailsRender product={productDetails as ProductInterface} />
         </Modal>
      </>
   )
}