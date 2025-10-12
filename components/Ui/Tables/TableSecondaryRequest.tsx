import React, { useCallback, useContext, useState } from 'react'
import { useRouter } from 'next/router';

import TableSecondary, { ColumnSecondaryConfig } from './TableSecondary';
import OrderInterface from '@/interfaces/order';
import ReceiptRender from '@/components/Renders/ReceiptRender';
import { getOrderDetails } from '@/services/order';
import { CartContext } from '@/context';
import TableSkeleton from '@/components/Skeletons/TableSkeleton';
import Modal from '@/components/Modals/Modal';

import { capitalizarTexto, dateFormat, format } from '@/utils';
import { useErrorHandler, useToast } from '@/hooks';
import { Tag, ModalMessage, MessageCard } from '@/components';

interface TableRequestInterface {
    products: OrderInterface[];
    totalProducts: number;
    buttonIsLoading: boolean;
    loadMoreProducts?: () => Promise<void>;
    loadingData: boolean;
}

export default function TableSecondaryRequest({
    products,
    totalProducts,
    buttonIsLoading,
    loadMoreProducts,
    loadingData
}: TableRequestInterface) {

    const NoMoreProductToShow = products.length === totalProducts;
    const { query, back, push } = useRouter();
    const { handleError } = useErrorHandler()
    const { addOrderToCart } = useContext(CartContext)
    const { showPromise } = useToast()

    const [openModalMessage, setOpenModalMessage] = useState(false);
    const [openModalRequest, setOpenModalRequest] = useState(false);
    const [loadingOrdeInCart, setLoadingOrdeInCart] = useState(false)

    const columns: ColumnSecondaryConfig<OrderInterface>[] = [
        {
            key: 'Fecha',
            label: 'Fecha',
            render: (_: string, item: OrderInterface) => (
                <>
                    <h4 style={{ color: "black", fontWeight: 'bold' }}>Fecha: {dateFormat(item.Fecha)}</h4>
                    <Tag>
                        {item.Entregado ? "Entregado" : "En revisión"}
                    </Tag>
                </>
            )
        },
        {
            key: 'Folio',
            label: 'Folio',
            render: (_: string, item: OrderInterface) => (
                <>
                    <p style={{ color: "black" }}><span>Folio:</span> {item.Folio}</p>
                    <p style={{ color: "black" }}><span>Cliente:</span> {capitalizarTexto(item.Cliente as string)}</p>
                </>
            )
        },
        {
            key: 'Total',
            label: 'Total',
            render: (_: string, item: OrderInterface) => (
                <>
                    <h4 style={{ color: "black", fontWeight: 'bold' }}><span>Total:</span> {format(item.Total)}</h4>
                    <p style={{ color: "black" }}><span>Subtotal:</span> {format(item.Subtotal)}</p>
                </>
            )
        },
    ];

    const handleSelectRequest = (item: OrderInterface) => {
        setOpenModalRequest(true)
        push(`/profile/request/?receipt=${item.Folio}&tipoDoc=${item.TipoDoc}`);
    }

    const handleCloseReceiptRender = useCallback(() => {
        setOpenModalRequest(false)
        back()
    }, [back])

    const handleGetOrderDetails = useCallback(async () => {
        try {
            setOpenModalRequest(true)
            const order = await getOrderDetails(query.receipt as string, query.TipoDoc as string, 999)
            if (order.error) {
                handleError(order.error);
                return;
            }
            return order;
        } catch (error) {
            handleError(error)
        }
    }, [handleError, query.receipt, query.TipoDoc])

    const onSubmitOrderToCart = useCallback(async () => {

        let orderDetails;
        try {
            setLoadingOrdeInCart(true)
            const data = await handleGetOrderDetails();
            orderDetails = data;
        } catch (error) {
            setLoadingOrdeInCart(false)
            handleError(error)
        } finally {
            back();
            setOpenModalMessage(false);
            if (!orderDetails) return;
            const myPromise = addOrderToCart(orderDetails);
            setLoadingOrdeInCart(false);
            showPromise(
                "Cargando carrito...",
                "Listo! Ya tienes tu carrito lleno",
                myPromise
            )
        }
    }, [handleGetOrderDetails, addOrderToCart, back, handleError, showPromise]);


    if (loadingData) return <TableSkeleton />;

    if (products.length === 0) {
        return (
            <MessageCard title='No hay coincidencias exactas'>
                <p>Cambia o elimina algunos de los filtros o modifica el área de búsqueda.</p>
            </MessageCard>
        )
    };

    return (
        <>
            <TableSecondary
                columns={columns}
                data={products}
                noMoreData={NoMoreProductToShow}
                loadingMoreData={buttonIsLoading}
                handleLoadMore={loadMoreProducts}
                onClick={(item) => handleSelectRequest(item)}
            />

            <Modal
                title=""
                visible={(query.receipt && openModalRequest) ? true : false}
                actionsVisible

                onClose={handleCloseReceiptRender}
                handleActionTopOne={() => push(`/request/${query?.receipt}`)}
                handleActionTopTwo={() => setOpenModalMessage(true)}
                modalSize='medium'
            >
                <ReceiptRender />
            </Modal>

            <ModalMessage
                visible={openModalMessage}
                onClose={() => setOpenModalMessage(false)}
                onAccept={onSubmitOrderToCart}
                disabled={loadingOrdeInCart}
                title="Usar esta lista en carrito"
            >
                Si aceptas y tienes productos anteriores se cambiaron por los de esta lista.
            </ModalMessage>
        </>
    )
}
