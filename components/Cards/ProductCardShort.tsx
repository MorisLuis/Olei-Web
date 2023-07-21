import ProductInterface from '@/interfaces/product'
import React, { useContext, useState } from 'react'
import Counter from '../Ui/Counter'
import styles from "../../styles/Components/Cards.module.scss";
import { ProductCartInterface } from '@/interfaces/productCart';
import { CartContext } from '@/context';

interface Props {
    product: ProductCartInterface,
    counterVisible?: boolean
}

export const ProductCardShort = ({ product, counterVisible = true }: Props) => {

    const { addProductToCart } = useContext(CartContext)

    const [tempCartProduct, setTempCartProduct] = useState<ProductCartInterface>({
        Descripcion: product.Descripcion,
        CodigoProducto: product.CodigoProducto,

        Precio: product.Precio,

        Id_Familia: product.Id_Familia,
        Familia: product.Familia,

        Id_Marca: product.Id_Marca,
        Marca: product.Marca,
        Cantidad: product.Cantidad,
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
                    <p className={styles.title}>{product.Descripcion}</p>
                    <p className={styles.code}>{product.CodigoProducto}</p>
                </div>

                <div className={styles.data}>
                    <p className={`${styles.price} display-flex`}><span>Precio:</span> ${product.Precio} MXN</p>
                    <p className={styles.existen}>Existencia : {product.Existencia}</p>
                </div>

                <div className={styles.counter}>
                    {
                        counterVisible &&
                        <Counter
                            currentValue={product?.Cantidad || 0}
                            maxValue={10}
                            updatedQuantity={onUpdateQuantity}
                        />
                    }
                    <p className={styles.subtotal}>Subtotal : $2,000</p>
                </div>
            </div>
        </div>
    )
}
