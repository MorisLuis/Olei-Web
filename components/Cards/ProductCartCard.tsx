import ProductInterface from '@/interfaces/product';
import React from 'react';
import Counter from '../Ui/Counter';
import styles from "../../styles/Components/Cards.module.scss";

interface Props {
    product?: ProductInterface
}

const ProductCartCard = ({ product } : Props) => {

    return (
        <div className={`${styles.productCardCard} displar-flex align`}>
            <div className={styles.productName}>
                {product?.Descripcion}
            </div>
            <div className={`${styles.productInfo} display-flex space-between`}>
                <div className={`${styles.data} display-flex align`}>
                    <div className={`${styles.code} display-flex`}>
                        <p className={`text-ellipsis`}> <span>Codigo: </span> {product?.CodigoProducto}</p>
                    </div>

                    <span>·</span>

                    <div className={styles.price}>
                        <p>${product?.Precio} MXN</p>
                    </div>

                    <span>·</span>

                    <div className={`display-flex`}>
                        <p> <span>Existencia: </span> {product?.Existencia}</p>
                    </div>
                </div>
                <div className={styles.counter}>
                    <div className='display-flex'>
                        <Counter/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCartCard
