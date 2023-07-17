import ProductInterface from '@/interfaces/product';
import { productsUtils } from '@/utils/products';
import React from 'react'
import { ProductCard } from '../Cards/ProductCard';

import styles from "../../styles/Pages/Receipt.module.scss";

export const ReceiptRender = () => {
    return (
        <div className={styles.receiptRender}>
            <div className={styles.brief}>
                <h4>Resumen del pedido</h4>
                <div className={`${styles.details} display-flex space-between`}>
                    <div className={`${styles.date} display-flex column`}>
                        <div className={styles.item}>
                            <p><span>Fecha:</span> 21 Septiembre 2023</p>
                        </div>
                        <div className={styles.item}>
                            <p><span>Pedido por:</span> Luis Morado Campos</p>
                        </div>
                    </div>

                    <div className={`${styles.price} display-flex column`}>
                        <div className={styles.item}>
                            <p><span>Total de productos:</span> 211</p>
                        </div>
                        <div className={styles.item}>
                            <p><span>Subtotal:</span> $19,000 MXN</p>
                        </div>
                        <div className={styles.item}>
                            <p className={styles.totalprice}><span>Total (Subtotal + IVA ):</span> $21,000 MXN</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.productsDetails}>
                {
                    productsUtils.map((product: ProductInterface, Index) =>
                        <ProductCard key={Index} product={product} counterVisible={false} />
                    )
                }
            </div>
        </div>
    )
}
