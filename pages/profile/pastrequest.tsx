import React, { useContext, useEffect, useState } from 'react';
import LayoutProfile from '@/components/Layouts/LayoutProfile';
import ModalRequest from '@/components/Modals/ModalRequest';
import { useRouter } from 'next/router';
import { ReceiptRender } from '@/components/Renders/ReceiptRender';

import styles from "../../styles/Pages/Request.module.scss";
import { MessageCard } from '@/components/Cards/MessageCard';
import { api } from '@/api/api';
import OrderInterface from '@/interfaces/order';
import ProductInterface from '@/interfaces/product';
import { CartContext } from '@/context';
import toast from 'react-hot-toast';

const PedidosAnteriores = () => {

    const { query, back } = useRouter()

    const { addOrderToCart } = useContext(CartContext)
    const [openModalMessage, setOpenModalMessage] = useState(false)
    const [orders, setOrders] = useState<OrderInterface[]>([]);
    const [orderSelect, setOrderSelect] = useState<ProductInterface[]>()


    /* useEffect(() => {
        const getOrder = async () => {
            const { data } = await api.get(`/api/order/all`);
            const order: OrderInterface[] = data;
            setOrders(order)
        }

        getOrder()
    }, []); */


    const handleSelectOrder = async (folio: string) => {
        /* const { data } = await api.get(`/api/orderDetails?folio=${folio}`);
        const order: ProductInterface[] = data;
        setOrderSelect(order) */
    }


    const onSubmitOrderToCart = async () => {
        /* if (!orderSelect) return;

        setOpenModalMessage(false)
        back()

        const myPromise = addOrderToCart(orderSelect)
        toast.promise(myPromise, {
            loading: 'Cargando carrito...',
            success: 'Listo! Ya tienes tu carrito lleno',
            error: 'Error when fetching',

        }); */
    };

    return (
        <>
            <LayoutProfile>
                <div className={styles.request}>
                    <section className={styles.info}>
                        <MessageCard
                            title="No hay pedidos anteriores"
                        >
                            No hay pedidos anteriores en este momento, apareceran una vez que hagas pedidos.
                        </MessageCard>
                    </section>
                </div>
            </LayoutProfile>

            <ModalRequest
                visible={query.receipt}
                title="Recibo"

                //Conditions
                receipt
                actionsVisible

                //Methods
                onClose={() => back()}
            >
                <ReceiptRender />
            </ModalRequest>
        </>

    )
}

export default PedidosAnteriores
