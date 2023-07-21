import React, { useContext } from 'react';
import ProductCart from '../Cards/ProductCart';
import styles from "../../styles/UI.module.scss";
import ProductInterface from '@/interfaces/product';
import { CartContext } from '@/context';

interface Props {
    data: ProductInterface[]
}

const Table = ({
    data
}: Props) => {
    const { cart } = useContext(CartContext)

    const productsToDisplay: ProductInterface[] = [...data];

    const productsWithCartInfo: ProductInterface[] = productsToDisplay.map((product : ProductInterface) => {
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
                    productsWithCartInfo?.slice(0, 100).map((product: ProductInterface, index: number) => {
                        return (
                            <ProductCart product={product} key={index}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Table
