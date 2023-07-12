import React from 'react';
import styles from "../../styles/Components/Cards.module.scss";
import Counter from '../Ui/Counter';

interface Props {
    product?: any
}

const ProductCartCard = ({ product }: Props) => {
    return (
        <div className={`${styles.productCard} displar-flex align`}>
            <div className={styles.productName}>
                Herramienta
            </div>
            <div className={`${styles.productInfo} display-flex space-between`}>
                <div className={`${styles.data} display-flex align`}>
                    <div className={`display-flex`}>
                        <p> <span>Codigo: </span> 011 29299 2929</p>
                    </div>
                    <span>·</span>
                    <div>
                        <p>$430</p>
                    </div>
                    <span>·</span>
                    <div className={`display-flex`}>
                        <p> <span>Existencia: </span> 10</p>
                    </div>
                </div>
                <div className={styles.counter}>
                    <Counter/>
                </div>
            </div>
        </div>
    )
}

export default ProductCartCard
