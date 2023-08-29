import React, { useContext, useState } from 'react'
import styles from "../../styles/Components/Cards.module.scss";

import Counter from '../Ui/Counter'
import { CartContext } from '@/context';
import { format } from '@/utils/currency';
import ProductInterface from '@/interfaces/product';

interface Props {
    product: ProductInterface,
    counterVisible?: boolean
}

// ProductCardShort - IS USED PRINCIPAL IN REQUEST PAGE.

export const ProductCardShort = ({ product, counterVisible = true }: Props) => {

    const { addProductToCart } = useContext(CartContext)

    const [tempCartProduct, setTempCartProduct] = useState<ProductInterface>({
        Descripcion: product.Descripcion,
        CodigoProducto: product.CodigoProducto,

        Precio: product.Precio,

        Id_Familia: product.Id_Familia,
        Familia: product.Familia,

        Id_Marca: product.Id_Marca,
        Marca: product.Marca,
        Cantidad: product.Cantidad,
        Existencia: product.Existencia
    })

    const onUpdateQuantity = async (Cantidad: number) => {
        setTempCartProduct(currentProduct => ({
            ...currentProduct,
            Cantidad
        }));

        addProductToCart({
            ...tempCartProduct,
            Cantidad
        });
    }

    return (
        <div className={`${styles.productCard} ${styles.receipt} cursor`}>
            <div className={`${styles.info} display-flex space-between`}>

                <div className={styles.name}>
                    <p className={styles.title}>{product?.Descripcion}</p>
                    <p className={styles.code}>{product?.CodigoProducto}</p>
                </div>

                <div className={styles.data}>
                    <p className={`${styles.price} display-flex`}><span>Precio:</span> {format(product?.Precio)} </p>
                    <p className={styles.existen}>Existencia : {product?.Existencia}</p>
                </div>

                <div className={styles.counter}>
                    {
                        counterVisible &&
                        <Counter
                            currentValue={product?.Cantidad || 0}
                            maxValue={
                                product?.Existencia && product?.Existencia < 0 ? null: product?.Existencia 
                            }
                            updatedQuantity={onUpdateQuantity}
                        />
                    }
                    <p className={styles.subtotal}>Subtotal : {product?.Cantidad && format(product?.Precio * product?.Cantidad)}</p>
                </div>
            </div>
        </div>
    )
}
