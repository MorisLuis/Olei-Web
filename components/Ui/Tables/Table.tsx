import React, { useContext, useEffect, useState } from 'react';
import styles from "../../../styles/UI.module.scss";
import md5 from 'md5';

import ProductCard from '../../Cards/ProductCard';
import { CartContext } from '@/context';
import ProductInterface from '@/interfaces/product';
import { MessageCard } from '../../Cards/MessageCard';
import TableSkeleton from '../../Skeletons/TableSkeleton';
import ButtonAnimated from '@/components/Buttons/ButtonAnimated';


interface Props {
    data: ProductInterface[],
    loadMoreProducts: () => Promise<void>,
    isLoading: boolean,
    loadingData: boolean
}

const Table = ({ data, loadMoreProducts, isLoading, loadingData }: Props) => {

    const { cart, cartPending } = useContext(CartContext)
    const [productsToDisplay, setProductsToDisplay] = useState<ProductInterface[]>([])

    useEffect(() => {
        setProductsToDisplay([...data])
    }, [data])

    // Define an array of ProductInterface objects to represent products to be displayed
    const productsWithCartInfo: ProductInterface[] = productsToDisplay.map((product: ProductInterface) => {
        // Find the corresponding product in the 'cart' array using matching properties
        const cartProduct = cart.find((cartItem) => (cartItem.CodigoProducto === product.CodigoProducto) && (cartItem.Id_Marca === product.Id_Marca));

        // Find the corresponding product in the 'cartPending' array using matching properties
        const cartProductPending = cartPending.find((cartItemPending) => (cartItemPending.CodigoProducto === product.CodigoProducto) && (cartItemPending.Id_Marca === product.Id_Marca));

        // Calculate the quantity of the product in the active cart ('cart') and pending cart ('cartPending')
        const quantity = cartProduct !== undefined ? cartProduct.Cantidad : 0;
        const quantityPending = cartProductPending !== undefined ? cartProductPending.Cantidad : 0;

        // Create a new object that combines the product information with the calculated quantities
        // If 'quantity' from 'cart' is available, use it; otherwise, use 'quantityPending' from 'cartPending'
        //return { ...product, Cantidad: quantity || quantityPending };

        const productWithCartInfo: ProductInterface = {
            ...product,
            Cantidad: quantity !== 0 ? quantity : quantityPending,
        };

        return productWithCartInfo;
    });

    return (
        <>
            {
                loadingData ?
                    <TableSkeleton />
                    :
                    !loadingData && productsWithCartInfo.length === 0 ?
                        <MessageCard title='No hay coincidencias exactas'>
                            <p>Cambia o elimina algunos de los filtros o modifica el área de búsqueda.</p>
                        </MessageCard>
                        :
                        <>
                            <div className={`${styles.table}`}>
                                <div className={`${styles.headers} display-flex space-between`}>
                                    <p>Nombre</p>
                                    <p>Codigo</p>
                                    <p>Marca</p>
                                    <p>Familia</p>
                                    <p>Existencia</p>
                                    <p>Precio (MXN)</p>
                                    <p></p>
                                </div>

                                <div className={styles.content}>
                                    {
                                        productsWithCartInfo?.map((product: ProductInterface, index: number) => {
                                            return (
                                                <ProductCard product={product} key={product.CodigoProducto && (product.CodigoProducto + product.Id_Marca)} />
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            {
                                (productsWithCartInfo.length >= 20 && productsWithCartInfo.length % 20 === 0) &&
                                <ButtonAnimated
                                    onclick={loadMoreProducts}
                                    disabled={isLoading}
                                />
                            }
                            {
                                !(productsWithCartInfo.length >= 20 && productsWithCartInfo.length % 20 === 0) &&
                                <p style={{ textAlign: "center", paddingTop: "1em", color: "gray" }}>Ya no hay mas productos, cambia los filtros para ver otros resultados</p>
                            }
                        </>
            }
        </>
    )
}

export default Table
