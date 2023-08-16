import React from 'react';
import styles from "../../styles/Pages/Request.module.scss";

import RequestCard from '@/components/Cards/RequestCard';
import LayoutProfile from '@/components/Layouts/LayoutProfile';
import ModalRequest from '@/components/Modals/ModalRequest';
import { useRouter } from 'next/router';
import { ReceiptRender } from '@/components/Renders/ReceiptRender';
import Cookies from 'js-cookie';
import OrderInterface from '@/interfaces/Order';

const Pedidos = () => {

    const { query, back } = useRouter()
    const orderCookies : OrderInterface[] = Cookies.get('order') ? JSON.parse(Cookies.get('order')!) : []

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
                            <RequestCard order={orderCookies}/>
                        </div>
                    </section>
                </div>
            </LayoutProfile>

            <ModalRequest
                visible={query.receipt}
                onClose={() => back()}
                receipt
            >
                <ReceiptRender/>
            </ModalRequest>
        </>

    )
}

export default Pedidos
