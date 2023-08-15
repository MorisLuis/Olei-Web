import React, { useContext } from 'react';
import styles from "../../styles/UI.module.scss";

import ProductCard from '../Cards/ProductCard';
import { CartContext } from '@/context';
import { ProductCartInterface } from '@/interfaces/productCart';


interface Props {
    data: ProductCartInterface[]
}

const Table = ({ data }: Props) => {

    const { cart } = useContext(CartContext)
    const productsToDisplay: ProductCartInterface[] = [...data];

    const productsWithCartInfo: ProductCartInterface[] = productsToDisplay.map((product: ProductCartInterface) => {
        const cartProduct = cart.find((cartItem) => cartItem.CodigoProducto === product.CodigoProducto && cartItem.Id_Marca === product.Id_Marca);

        const quantity = cartProduct !== undefined ? cartProduct.Cantidad : 0;
        return { ...product, Cantidad: quantity };
    });

    return (
        <div className={`${styles.table}`}>
            <div className={`${styles.headers} display-flex space-between`}>
                <p>Nombre</p>
                <p>Codigo</p>
                <p>Marca</p>
                <p>Precio (MXN)</p>
                <p>Familia</p>
                <p>Existencia</p>
                <p></p>
            </div>

            <div className={styles.content}>
                {
                    productsWithCartInfo?.slice(0, 100).map((product: ProductCartInterface, index: number) => {
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
