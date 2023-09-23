import React, { useContext, useEffect, useState } from 'react';
import styles from "../../styles/Pages/Request.module.scss";

import TableRequest from '@/components/Ui/Tables/TableRequest';
import LayoutProfile from '@/components/Layouts/LayoutProfile';
import ModalRequest from '@/components/Modals/ModalRequest';
import { useRouter } from 'next/router';
import { ReceiptRender } from '@/components/Renders/ReceiptRender';
import Cookies from 'js-cookie';
import OrderInterface from '@/interfaces/order';
import { ModalMessage } from '@/components/Modals/ModalMessage';
import { CartContext } from '@/context';
import toast from 'react-hot-toast';
import { MessageCard } from '@/components/Cards/MessageCard';
import { api } from '@/api/api';
import ProductInterface from '@/interfaces/product';

const Pedidos = () => {

    const { query, back } = useRouter()

    const { addOrderToCart } = useContext(CartContext)

    const [openModalMessage, setOpenModalMessage] = useState(false)
    const [orders, setOrders] = useState<OrderInterface[]>([]);
    const [orderSelect, setOrderSelect] = useState<ProductInterface[]>()

    useEffect(() => {
        const getOrder = async () => {
            const { data } = await api.get(`/api/order/all`);
            const order: OrderInterface[] = data;
            setOrders(order)
        }

        getOrder()
    }, []);


    const handleSelectOrder = async (folio: string) => {
        const { data } = await api.get(`/api/orderDetails?folio=${folio}`);
        const order: ProductInterface[] = data;
        setOrderSelect(order)
    }


    const onSubmitOrderToCart = async () => {
        if (!orderSelect) return;

        setOpenModalMessage(false)
        back()

        const myPromise = addOrderToCart(orderSelect)
        toast.promise(myPromise, {
            loading: 'Cargando carrito...',
            success: 'Listo! Ya tienes tu carrito lleno',
            error: 'Error when fetching',

        });
    };

    return (
        <>
            <LayoutProfile>
                <div className={styles.request}>
                    <section className={styles.info}>
                        {
                            orders.length > 0 ?
                                <>
                                    <div className={styles.header}>
                                        <h2>Pedidos actuales</h2>
                                        <p>Para cambiar la información, habla con tu administrador.</p>
                                    </div>
                                    <div className={styles.item}>
                                        <TableRequest order={orders} handleSelectOrder={handleSelectOrder} />
                                    </div>
                                </>
                                :
                                <MessageCard title="No hay pedidos actuales">
                                    No hay pedidos actuales en este momento, apareceran una vez que hagas pedidos.
                                </MessageCard>
                        }
                    </section>
                </div>
            </LayoutProfile>

            <ModalRequest
                visible={query.receipt}
                onClose={() => back()}
                handleOpenModalMessage={() => setOpenModalMessage(true)}
                receipt
                actionsVisible
            >
                <ReceiptRender />
            </ModalRequest>

            <ModalMessage
                visible={openModalMessage}
                onClose={() => setOpenModalMessage(false)}
                onAccept={onSubmitOrderToCart}
                title="Usar esta lista en carrito"
            >
                <p>
                    Si aceptas y tienes productos anteriores se cambiaron por los de esta lista.
                </p>
            </ModalMessage>
        </>

    )
}

export default Pedidos
