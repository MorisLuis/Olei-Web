import React, { useCallback, useContext, useEffect, useState } from 'react';

import LayoutProfile from '@/components/Layouts/LayoutProfile';
import Modal from '@/components/Modals/Modal';
import { useRouter } from 'next/router';
import { ReceiptRender } from '@/components/Renders/ReceiptRender';
import OrderInterface from '@/interfaces/order';
import { ModalMessage } from '@/components/Modals/ModalMessage';
import { CartContext } from '@/context';
import toast from 'react-hot-toast';
import { MessageCard } from '@/components/Cards/MessageCard';
import { TableRequestSkeleton } from '@/components/Skeletons/TableRequestSkeleton';
import { getOrderDetails, getOrders } from '@/services/order';
import useErrorHandler from '@/hooks/useErrorHandler';
import TableRequest from '@/components/Ui/Tables/TableComponents/TableSecondaryRequest';

const Pedidos = () => {

    const { query, back, push } = useRouter();
    const { addOrderToCart } = useContext(CartContext)
    const { handleError } = useErrorHandler()

    const [openModalMessage, setOpenModalMessage] = useState(false);
    const [openModalRequest, setOpenModalRequest] = useState(false);
    const [loadingOrdeInCart, setLoadingOrdeInCart] = useState(false)
    const [orders, setOrders] = useState<OrderInterface[]>();

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

    const handleGetOrders = async () => {
        try {
            const data = await getOrders();
            if (data.error) {
                handleError(data.error);
                return;
            }
            setOrders(data)
        } catch (error) {
            handleError(error)
        }
    }

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
            toast.promise(myPromise, {
                loading: 'Cargando carrito...',
                success: 'Listo! Ya tienes tu carrito lleno',
                error: 'Error when fetching',
            });
        }
    }, [handleGetOrderDetails, addOrderToCart, back, handleError]);

    const handleCloseReceiptRender = useCallback(() => {
        setOpenModalRequest(false)
        back()
    }, [back])

    useEffect(() => {
        handleGetOrders();
    }, []);

    useEffect(() => {
        if (!query.receipt) return;
        setOpenModalRequest(true)
    }, [query])

    if (!orders) {
        return (
            <LayoutProfile>
                <TableRequestSkeleton />
            </LayoutProfile>
        )
    }

    if (orders.length < 0) {
        return (
            <MessageCard title="No hay pedidos actuales">
                No hay pedidos actuales en este momento, apareceran una vez que hagas pedidos.
            </MessageCard>
        )
    }

    return (
        <>
            <LayoutProfile>
                <>
                    <div className='mb-medium'>
                        <h2>Pedidos actuales</h2>
                        <p>Para cambiar la información, habla con tu administrador.</p>
                    </div>

                    <TableRequest
                        products={orders}
                        totalProducts={orders.length}
                        buttonIsLoading={false}
                        loadingData={false}
                    />
                </>
            </LayoutProfile>

            <Modal
                title=""
                visible={(query.receipt && openModalRequest) ? true : false}
                actionsVisible

                onClose={handleCloseReceiptRender}
                handleActionTopOne={() => push(`/request/${query?.receipt}`)}
                handleActionTopTwo={() => setOpenModalMessage(true)}
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

export default Pedidos
