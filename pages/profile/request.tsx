import React, { useContext, useEffect, useState } from 'react';
import styles from "../../styles/Pages/Request.module.scss";

import RequestCard from '@/components/Cards/RequestCard';
import LayoutProfile from '@/components/Layouts/LayoutProfile';
import ModalRequest from '@/components/Modals/ModalRequest';
import { useRouter } from 'next/router';
import { ReceiptRender } from '@/components/Renders/ReceiptRender';
import Cookies from 'js-cookie';
import OrderInterface from '@/interfaces/Order';
import { ModalMessage } from '@/components/Modals/ModalMessage';
import { CartContext } from '@/context';
import ProductInterface from '@/interfaces/product';

const Pedidos = () => {

    const { query, back } = useRouter()
    const { addOrderToCart } = useContext(CartContext)

    const [openModalMessage, setOpenModalMessage] = useState(false)
    const [orders, setOrders] = useState<OrderInterface[]>([]);
    const [orderSelect, setOrderSelect] = useState<OrderInterface>()

    useEffect(() => {
        const orderFromCookies: any[] =  localStorage.getItem('order') ? JSON.parse(localStorage.getItem('order')!) : [];
        console.log({orderFromCookies})
        setOrders(orderFromCookies);
    }, []);


    const onSubmitOrderToCart = () => {
        if(!orderSelect?.products) return;
        addOrderToCart(orderSelect?.products)
        setOpenModalMessage(false)
    }

    console.log({orders})

    return (
        <>
            <LayoutProfile>
                <div className={styles.request}>
                    <section className={styles.info}>
                        <div className={styles.header}>
                            <h2>Pedidos actuales</h2>
                            <p>Para cambiar la información, habla con tu administrador.</p>
                        </div>
                        <div className={styles.item}>
                            <RequestCard order={orders} setOrderSelect={setOrderSelect} />
                        </div>
                    </section>
                </div>
            </LayoutProfile>

            <ModalRequest
                visible={query.receipt}
                onClose={() => back()}
                handleOpenModalMessage={() => setOpenModalMessage(true)}
                receipt
            >
                <ReceiptRender />
            </ModalRequest>

            <ModalMessage
                visible={openModalMessage}
                onClose={() => setOpenModalMessage(false)}
                onAccept={onSubmitOrderToCart}
            >
            </ModalMessage>
        </>

    )
}

export default Pedidos
