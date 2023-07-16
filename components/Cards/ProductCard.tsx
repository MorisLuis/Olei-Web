import ProductInterface from '@/interfaces/product'
import React from 'react'
import Counter from '../Ui/Counter'
import styles from "../../styles/Components/Cards.module.scss";

interface Props {
    product: ProductInterface,
    counterVisible?: boolean
}

export const ProductCard = ({ product, counterVisible = true }: Props) => {
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
                        <Counter />
                    }
                    <p className={styles.subtotal}>Subtotal : $2,000</p>
                </div>
            </div>
        </div>
    )
}
