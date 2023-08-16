import React from 'react'
import styles from "../../styles/Pages/Receipt.module.scss";

import ProductInterface from '@/interfaces/product';
import {ProductCardShort} from '../Cards/ProductCardShort';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import OrderInterface from '@/interfaces/Order';
import { format } from '@/utils/currency';


export const ReceiptRender = () => {
    const { query } = useRouter()
    const orderCookies: OrderInterface[] = localStorage.getItem('order')  ? JSON.parse(localStorage.getItem('order') !) : []
    const orderSelect : OrderInterface | undefined = orderCookies.find((order: OrderInterface) => order.Folio === query.receipt)


    return (
        <div className={styles.receiptRender}>
            <div className={styles.brief}>
                <h4>Resumen del pedido</h4>
                <div className={`${styles.details} display-flex space-between`}>
                    <div className={`${styles.date} display-flex column`}>
                        <div className={styles.item}>
                            <p><span>Fecha:</span> {orderSelect?.Fecha}</p>
                        </div>
                        <div className={styles.item}>
                            <p><span>Pedido por:</span> Luis Morado Campos</p>
                        </div>
                    </div>

                    <div className={`${styles.price} display-flex column`}>
                        <div className={styles.item}>
                            <p><span>Total de productos:</span> {orderSelect?.Cantidad}</p>
                        </div>
                        <div className={styles.item}>
                            <p><span>Subtotal:</span> {format(orderSelect?.Subtotal as number)}</p>
                        </div>
                        <div className={styles.item}>
                            <p className={styles.totalprice}><span>Total (Subtotal + IVA ):</span> {format(orderSelect?.Total as number)}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.productsDetails}>
                {
                    orderSelect?.products.map((product: ProductInterface, Index) =>
                        <ProductCardShort key={Index} product={product} counterVisible={false} />
                    )
                }
            </div>
        </div>
    )
}
