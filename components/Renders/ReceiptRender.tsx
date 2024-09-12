import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from "../../styles/Pages/Receipt.module.scss";

import ProductInterface from '@/interfaces/product';
import { ProductCardShort } from '../Cards/ProductCardShort';
import { useRouter } from 'next/router';
import OrderInterface from '@/interfaces/order';
import { format } from '@/utils/currency';
import { dateFormat } from '@/utils/dateFormat';
import { AuthContext } from '@/context';
import ReceiptRenderSkeleton from '../Skeletons/ReceiptRenderSkeleton';
import { getOrder, getOrderDetails } from '@/services/order';

export const ReceiptRender = () => {
    const { user } = useContext(AuthContext);
    const { query: { receipt } } = useRouter();
    
    const [orderSelect, setOrderSelect] = useState<OrderInterface>();
    const [orderDetailsSelect, setOrderDetailsSelect] = useState<ProductInterface[]>();
    const [loadingOrder, setLoadingOrder] = useState(false);

    // Utilizamos un ref para controlar si ya se ha hecho la solicitud
    const fetchedData = useRef(false);

    const { Fecha, Piezas, Vendedor, Folio, Cliente, Total } = orderSelect ?? {};
    const isEmployee = user?.TipoUsuario === 2;

    const handleGetOrderDetails = async () => {
        if (loadingOrder || orderDetailsSelect) return;
        setLoadingOrder(true);
        try {
            const orderDetails = await getOrderDetails(receipt as string);
            setOrderDetailsSelect(orderDetails);
        } catch (error) {
            console.log('Error al obtener los detalles de la orden:', error);
        } finally {
            setLoadingOrder(false);
        }
    };

    const handleGetOrder = async () => {
        try {
            const order = await getOrder(receipt as string);
            setOrderSelect(order);
        } catch (error) {
            console.log('Error al obtener la orden:', error);
        }
    };

    // Evitar llamadas duplicadas usando el ref `fetchedData`
    useEffect(() => {
        if (!receipt || fetchedData.current) return;
        fetchedData.current = true; // Se marca que ya se hizo la solicitud
        handleGetOrder();
        handleGetOrderDetails();
    }, [receipt]);

    return orderDetailsSelect ? (
        <div className={styles.receiptRender}>
            <div className={styles.brief}>
                <h4>Resumen del pedido</h4>
                <div className={`${styles.details} display-flex space-between`}>
                    <div className={`${styles.date} display-flex column`}>
                        <div className={styles.item}>
                            <p><span>Fecha:</span> {dateFormat(Fecha)}</p>
                        </div>
                        {isEmployee && (
                            <div className={styles.item}>
                                <p><span>Pedido por:</span> {Vendedor}</p>
                            </div>
                        )}
                        <div className={styles.item}>
                            <p><span>Cliente:</span> {Cliente}</p>
                        </div>
                    </div>

                    <div className={`${styles.price} display-flex column`}>
                        <div className={styles.item}>
                            <p><span>Total de productos:</span> {Piezas}</p>
                        </div>
                        <div className={styles.item}>
                            <p><span>Folio:</span> {Folio}</p>
                        </div>
                        <div className={styles.item}>
                            <p className={styles.totalprice}><span>Total (Subtotal + IVA):</span> {format(Total as number)}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.productsDetails}>
                {orderDetailsSelect.map((product: ProductInterface, index: number) => (
                    <ProductCardShort key={index} product={product} counterVisible={false} />
                ))}
            </div>
        </div>
    ) : (
        <ReceiptRenderSkeleton />
    );
};
