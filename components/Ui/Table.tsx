import React, { useContext } from 'react';
import styles from "../../styles/UI.module.scss";

import ProductCard from '../Cards/ProductCard';
import { CartContext } from '@/context';
import ProductInterface from '@/interfaces/product';


interface Props {
    data: ProductInterface[]
}

const Table = ({ data }: Props) => {

    const { cart, cartPending } = useContext(CartContext)
    const productsToDisplay: ProductInterface[] = [...data];

    // Define an array of ProductInterface objects to represent products to be displayed
    const productsWithCartInfo: ProductInterface[] = productsToDisplay.map((product: ProductInterface) => {
        // Find the corresponding product in the 'cart' array using matching properties
        const cartProduct = cart.find((cartItem) => cartItem.CodigoProducto === product.CodigoProducto && cartItem.Id_Marca === product.Id_Marca);

        // Find the corresponding product in the 'cartPending' array using matching properties
        const cartProductPending = cartPending.find((cartItem) => cartItem.CodigoProducto === product.CodigoProducto && cartItem.Id_Marca === product.Id_Marca);

        // Calculate the quantity of the product in the active cart ('cart') and pending cart ('cartPending')
        const quantity = cartProduct !== undefined ? cartProduct.Cantidad : 0;
        const quantityPending = cartProductPending !== undefined ? cartProductPending.Cantidad : 0;

        // Create a new object that combines the product information with the calculated quantities
        // If 'quantity' from 'cart' is available, use it; otherwise, use 'quantityPending' from 'cartPending'
        return { ...product, Cantidad: quantity || quantityPending };
    });


    return (
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
                            <ProductCard product={product} key={index} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Table
