/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from "../styles/Pages/Products.module.scss";

import { Layout } from '@/components/Layouts/Layout';
import Modal from '@/components/Modals/Modal';
import { ProductDetailsRender } from '@/components/Renders/ProductDetailsRender';

import ProductInterface from '@/interfaces/product';
import { AuthContext, CartContext, ClientContext, FiltersContext } from '@/context';
import { getProductById, getProducts, getTotalProducts } from '@/services/product';
import useErrorHandler from '@/hooks/useErrorHandler';
import TableProducts from '@/components/Ui/Tables/TableComponents/TableProducts';
import { useLoadMoreData } from '@/hooks/useLoadMoreData';
import FiltersInterface from '@/interfaces/filters';
import GridProducts from '@/components/Ui/Tables/TableComponents/GridProducts';
import HomeHeader from '@/components/Header';

export default function Home() {
   const { filters } = useContext(FiltersContext);
   const { productDelete } = useContext(CartContext);
   const { clientChanged } = useContext(ClientContext);
   const { user } = useContext(AuthContext);
   const { push, query } = useRouter();
   const { handleError } = useErrorHandler();
   const [productDetails, setProductDetails] = useState<ProductInterface>();
   const [openModalProduct, setOpenModalProduct] = useState<boolean>(false);
   const [showGrid, setShowGrid] = useState(true);

   // Handle data showed
   const { data, isLoading, isButtonLoading, total, handleResetData, handleLoadMore } = useLoadMoreData(
      {
         fetchInitialData: (filtersdata) => getProducts(filtersdata as FiltersInterface),
         fetchPaginatedData: (filtersdata, nextPage) => getProducts(filtersdata as FiltersInterface, nextPage),
         fetchTotalCount: (filters) => getTotalProducts(filters as FiltersInterface),
         filters: filters,
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
      handleResetData()
   }, [filters, productDelete, clientChanged]);

   return (
      <>
         <Layout title='Productos'>
            <div className={styles.products}>
               <HomeHeader
                  setShowGrid={setShowGrid}
                  showGrid={showGrid}
               />
               {
                  (showGrid && user?.SwImagenes) ? (
                     <GridProducts
                        products={data}
                        loadMoreProducts={handleLoadMore}
                        totalProducts={total ?? 0}
                        
                        loadingData={isLoading}
                        buttonIsLoading={isButtonLoading}
                        handleSelectData={handleSelectProduct}
                     />
                  ) : (
                     <TableProducts
                        products={data}
                        totalProducts={total ?? 0}
                        loadMoreProducts={handleLoadMore}
                        loadingData={isLoading}
                        buttonIsLoading={isButtonLoading}
                     />
                  )
               }
            </div>
         </Layout>

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