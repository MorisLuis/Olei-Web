/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from "../styles/Pages/Products.module.scss";

import { Layout } from '@/components/Layouts/Layout';
import HomeFilter from '@/components/HomeFilter';
import Modal from '@/components/Modals/Modal';
import FiltersModalContent from '@/components/Modals/ModalsComponents/FiltersModalContent';
import Grid from '@/components/Ui/Tables/Grid';
import PageTransition from '@/components/PageTranstion';
import { ProductDetailsRender } from '@/components/Renders/ProductDetailsRender';

import ProductInterface from '@/interfaces/product';
import { AuthContext, CartContext, ClientContext, FiltersContext } from '@/context';
import { useTransition, animated } from 'react-spring';
import { getProductById, getProducts, getTotalProducts } from '@/services/product';
import useErrorHandler from '@/hooks/useErrorHandler';
import CustomTable, { ColumnConfig } from '@/components/TableTest';
import Counter from '@/components/Ui/Counter';
import { useProductsWithCartInfo } from '@/hooks/useProductsWithCartInfo';
import { capitalizarTexto } from '@/utils/textCapitalize';


export default function Home() {
   const { push, query } = useRouter();
   const { handleError } = useErrorHandler();

   const { filters } = useContext(FiltersContext);
   const { nombre, enStock, marca, folio, familia } = filters;
   const { productDelete } = useContext(CartContext);
   const { clientChanged } = useContext(ClientContext);
   const { user } = useContext(AuthContext);

   const [products, setProducts] = useState<ProductInterface[]>([]);
   const [totalProducts, setTotalProducts] = useState(0)
   const [productDetails, setProductDetails] = useState<ProductInterface>();
   const [openModalFilter, setOpenModalFilter] = useState<boolean>(false);
   const [openModalProduct, setOpenModalProduct] = useState<boolean>(false);
   const [nextPage, setNextPage] = useState<number>(1)
   const [showGrid, setShowGrid] = useState(true);
   const [buttonIsLoading, setButtonIsLoading] = useState(false);
   const [loadingData, setLoadingData] = useState(true); // Is used to handle the skeleton state in grid and table.
   const [isEntering, setIsEntering] = useState(true); // Part of the animation with react-spring.

   const { addProductToCart } = useContext(CartContext);

   const test = (item: any, newValue: number) => {
      addProductToCart({
         ...item,
         Cantidad: newValue
      })
   }

   const columns: ColumnConfig<ProductInterface>[] = [
      {
         key: 'Descripcion',
         label: 'Descripción',
         render: (Descripción: string) => <span style={{ color: "black" }}>{capitalizarTexto(Descripción)}</span>,
      },
      {
         key: 'Codigo',
         label: 'Código',
         className: 'text-blue-500 font-bold',
      },
      {
         key: 'Precio',
         label: 'Precio (USD)',
         render: (value: number) => <span>${value.toFixed(2)}</span>,
      },
      {
         key: 'Existencia',
         label: 'Existencia',
      },
      {
         key: 'Cantidad',
         label: 'Cantidad',
         render: (value: number, item: ProductInterface) => (
            <Counter
               counter={value ?? 0} // Aquí usamos el `Codigo` como identificador único
               setCounter={(newValue: number) => test(item, newValue)}
            />
         ), width: "20%"
      },
   ];

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
         setProducts((prevItems: ProductInterface[]) => [...prevItems, ...data]);
      } catch (error) {
         setButtonIsLoading(false);
         handleError(error);
      } finally {
         setButtonIsLoading(false);
      }
   }, [nextPage, query]);

   const handleProduct = async () => {
      setLoadingData(true);
      const data = await getProducts(filters)
      const total = await getTotalProducts(filters)
      setTotalProducts(total)
      setProducts(data)
      setLoadingData(false);
   };

   const handleCloseProduct = () => {
      push('/products', undefined, { scroll: false });
      setOpenModalProduct(false);
      setProductDetails(undefined);
   };

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

   const { productsWithCartInfo } = useProductsWithCartInfo(products)


   return (
      <>
         <PageTransition key="login-transition" isEntering={isEntering === false}>
            <Layout>
               <div className={styles.products}>
                  <HomeFilter
                     setOpenModalFilter={setOpenModalFilter}
                     setShowGrid={setShowGrid}
                     showGrid={showGrid}
                     setLoadingData={setLoadingData}
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
                              <CustomTable
                                 columns={columns}
                                 data={productsWithCartInfo}
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