import React, { useContext, useEffect, useState } from 'react'
import styles from "../../styles/Pages/Receipt.module.scss";

import ProductInterface from '@/interfaces/product';
import { ProductCardShort } from '../Cards/ProductCardShort';
import { useRouter } from 'next/router';
import OrderInterface from '@/interfaces/order';
import { format } from '@/utils/currency';
import { api } from '@/api/api';
import { dateFormat } from '@/utils/dateFormat';
import { AuthContext } from '@/context';


export const ReceiptRender = () => {

    const { user } = useContext(AuthContext)
    const { query: { receipt } } = useRouter();
    const [orderSelect, setOrderSelect] = useState<OrderInterface | undefined>(undefined);
    const [orderDetailsSelect, setOrderDetailsSelect] = useState<ProductInterface[] | undefined>(undefined)

    useEffect(() => {
        if(!receipt) return;
        const getOrder = async () => {
            const { data } = await api.get(`/api/order/${receipt}`);
            const order: OrderInterface = data;
            setOrderSelect(order)
        } 

        const getOrderDetails = async () => {
            const { data } = await api.get(`/api/orderDetails?folio=${receipt}`);
            console.log({data})
            const orderDetails: ProductInterface[] = data;
            setOrderDetailsSelect(orderDetails)
        } 

        getOrderDetails()
        getOrder()

    }, [receipt]);

    const isEmployee = user?.TipoUsuario === 2

    return (
        <div className={styles.receiptRender}>
            <div className={styles.brief}>
                <h4>Resumen del pedido</h4>
                <div className={`${styles.details} display-flex space-between`}>
                    <div className={`${styles.date} display-flex column`}>
                        <div className={styles.item}>
                            <p><span>Fecha:</span> {dateFormat(orderSelect?.Fecha)}</p>
                        </div>
                        {
                            isEmployee &&
                            <div className={styles.item}>
                                <p><span>Pedido por:</span> {orderSelect?.Vendedor}</p>
                            </div>
                        }
                        <div className={styles.item}>
                            <p><span>Cliente:</span> {orderSelect?.Cliente}</p>
                        </div>
                    </div>

                    <div className={`${styles.price} display-flex column`}>
                        <div className={styles.item}>
                            <p><span>Total de productos:</span> {orderSelect?.Piezas}</p>
                        </div>
                        <div className={styles.item}>
                            <p><span>Folio: </span> {orderSelect?.Folio}</p>
                        </div>
                        <div className={styles.item}>
                            <p className={styles.totalprice}><span>Total (Subtotal + IVA ):</span> {format(orderSelect?.Total as number)}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.productsDetails}>
                {
                    orderDetailsSelect?.map((product: ProductInterface, Index: number) =>
                        <ProductCardShort key={Index} product={product} counterVisible={false} />
                    )
                }
            </div>
        </div>
    )
}
