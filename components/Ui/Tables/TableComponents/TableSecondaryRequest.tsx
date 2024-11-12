import React, { useCallback, useContext, useState } from 'react'
import { MessageCard } from '@/components/Cards/MessageCard';
import TableSecondary, { ColumnSecondaryConfig } from '../TableSecondary';
import OrderInterface from '@/interfaces/order';
import { useRouter } from 'next/router';
import { Tag } from '../../Tag';
import { capitalizarTexto } from '@/utils/textCapitalize';
import { dateFormat } from '@/utils/dateFormat';
import { format } from '@/utils/currency';
import Modal from '@/components/Modals/Modal';
import { ModalMessage } from '@/components/Modals/ModalMessage';
import { ReceiptRender } from '@/components/Renders/ReceiptRender';
import { getOrderDetails } from '@/services/order';
import useErrorHandler from '@/hooks/useErrorHandler';
import { CartContext } from '@/context';
import TableSkeleton from '@/components/Skeletons/TableSkeleton';
import useToast from '@/hooks/useToast';

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
        push(`/profile/request/?receipt=${item.Folio}`);
    }

    const handleCloseReceiptRender = useCallback(() => {
        setOpenModalRequest(false)
        back()
    }, [back])

    const handleGetOrderDetails = useCallback(async () => {
        try {
            setOpenModalRequest(true)
            const order = await getOrderDetails(query.receipt as string)
            if (order.error) {
                handleError(order.error);
                return;
            }
            return order;
        } catch (error) {
            handleError(error)
        }
    }, [handleError, query.receipt])

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
    }, [handleGetOrderDetails, addOrderToCart, back, handleError]);

    console.log({ loadingData })

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
                <p>Si aceptas y tienes productos anteriores se cambiaron por los de esta lista.</p>
            </ModalMessage>
        </>
    )
}
