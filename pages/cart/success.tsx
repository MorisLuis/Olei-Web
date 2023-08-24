import React, { useEffect, useState } from 'react';
import styles from "../../styles/Pages/Success.module.scss";

import { Layout } from '@/components/Layouts/Layout';
import { faArrowUp, faExpand } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import OrderInterface from '@/interfaces/order';

const Success = () => {
    const { push, query } = useRouter()
    const [actualOrder, setActualOrder] = useState<OrderInterface>()

    useEffect(() => {
        const ordersFromCookies: any[] =  localStorage.getItem('order') ? JSON.parse(localStorage.getItem('order')!) : [];
        const actualOrder = ordersFromCookies.find((order) => order.Folio === query.order)
        setActualOrder(actualOrder)
    }, []);

    return (
        <Layout>
            <div className={styles.success}>
                <h1>Tu pedido ha sido exitoso</h1>
                <div className={styles.message}>
                    <p className={styles.text}>Tu pedido ha sido realizado y Rosco lo ha recibido.</p>
                </div>
                <div className={`${styles.actions} display-flex`}>
                    <button className="button-small black display-flex allCenter" onClick={() => push(`/${query.order}`)}>
                        Ver recibo
                        <FontAwesomeIcon icon={faExpand} className={`icon__small cursor display-flex align`} />
                    </button>
                    <button className="button-small display-flex allCenter" onClick={() => push("/products?page=1&limit=20")}>
                        Regresar a Inicio
                        <FontAwesomeIcon icon={faArrowUp} className={`icon__small cursor display-flex align rotate45`} />
                    </button>
                </div>
            </div>
        </Layout>
    )
}

export default Success
