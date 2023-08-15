import React from 'react';
import RequestCard from '@/components/Cards/RequestCard';
import LayoutProfile from '@/components/Layouts/LayoutProfile';
import ModalRequest from '@/components/Modals/ModalRequest';
import { useRouter } from 'next/router';
import { ReceiptRender } from '@/components/Renders/ReceiptRender';

import styles from "../../styles/Pages/Request.module.scss";
import Cookies from 'js-cookie';

const Pedidos = () => {

    const { query, back } = useRouter()
    const orderCookies = Cookies.get('order') ? JSON.parse(Cookies.get('order')!) : []

    console.log({orderCookies})
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
                            <RequestCard />
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
