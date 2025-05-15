import React, { useCallback, useContext, useEffect, useState } from 'react'
import styles from "../../styles/Pages/Receipt.module.scss";

import { useRouter } from 'next/router';
import OrderInterface from '@/interfaces/order';
import { format } from '@/utils/currency';
import { dateFormat } from '@/utils/dateFormat';
import { AuthContext } from '@/context';
import ReceiptRenderSkeleton from '../Skeletons/ReceiptRenderSkeleton';
import { getOrder, getOrderDetails, getTotalOrderDetails } from '@/services/order';
import useErrorHandler from '@/hooks/useErrorHandler';
import TableSecondaryRequestDetails from '../Ui/Tables/TableComponents/TableSecondaryRequestDetails';
import { useLoadMoreData } from '@/hooks/useLoadMoreData';

export const ReceiptRender = () => {
    const { user } = useContext(AuthContext);
    const { query: { receipt } } = useRouter();
    const { handleError } = useErrorHandler()
    const [orderSelect, setOrderSelect] = useState<OrderInterface>();
    const { Fecha, Cantidad, Vendedor, Folio, Cliente, Total } = orderSelect ?? {};
    const isEmployee = user?.TipoUsuario === 2;

    const { data, isButtonLoading, total, handleResetData, handleLoadMore } = useLoadMoreData(
        {
            fetchInitialData: () => getOrderDetails(receipt as string, 1),
            fetchPaginatedData: (arg, nextPage) => getOrderDetails(receipt as string, nextPage),
            fetchTotalCount: () => getTotalOrderDetails(receipt as string),
        }
    );

    const handleGetOrder = useCallback(async () => {
        if (typeof receipt !== 'string') return;
        try {
            const order = await getOrder(receipt);
            if (order.error) {
                handleError(order.error);
                return;
            }
            setOrderSelect(order);
        } catch (error) {
            handleError(error);
        }
    }, [handleError, receipt])

    // Evitar llamadas duplicadas usando el ref `fetchedData`
    useEffect(() => {
        if (!receipt) return;
        handleGetOrder();
    }, [handleGetOrder, receipt]);

    useEffect(() => {
        if(!receipt) return
        handleResetData()
    }, [handleResetData, receipt]);


    if (data.length <= 0) {
        return (
            <ReceiptRenderSkeleton />
        )
    }

    return (
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
                            <p><span>Cliente:</span> {Cliente ? Cliente : "Sin información"}</p>
                        </div>
                    </div>

                    <div className={`${styles.price} display-flex column`}>
                        <div className={styles.item}>
                            <p><span>Total de productos:</span> {Cantidad}</p>
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

            <TableSecondaryRequestDetails
                products={data}
                totalProducts={total ?? 0}
                buttonIsLoading={isButtonLoading}
                loadMoreProducts={handleLoadMore}
            />
        </div>
    )
};
