import React from 'react';
import ProductCart from '../Cards/ProductCart';
import styles from "../../styles/UI.module.scss";
import ProductInterface from '@/interfaces/product';

interface Props {
    data: any
}

const Table = ({
    data
}: Props) => {


    return (
        <div className={`${styles.table}`}>
            <div className={`${styles.headers} display-flex space-between`}>
                <p>Nombre</p>
                <p>Codigo</p>
                <p>Precio (MXN)</p>
                <p>Familia</p>
                <p>Existencia</p>
                <p></p>
            </div>

            <div className={styles.content}>
                {
                    data?.slice(50, 100).map((item: ProductInterface, index: number) => {
                        return (
                            <ProductCart product={item} key={index}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Table
