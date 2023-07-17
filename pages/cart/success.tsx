import { Layout } from '@/components/Layouts/Layout';
import React from 'react';
import { faArrowUp, faExpand } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from "../../styles/Pages/Success.module.scss";
import { useRouter } from 'next/router';

const Success = () => {
    const { push } = useRouter()
    return (
        <Layout>
            <div className={styles.success}>
                <h1>Tu pedido ha sido exitoso</h1>
                <div className={styles.message}>
                    <p className={styles.text}>Tu pedido ha sido realizado y Rosco lo ha recibido.</p>
                </div>
                <div className={`${styles.actions} display-flex`}>
                    <button className="button-small black display-flex allCenter" onClick={() => push("/1")}>
                        Ver recibo
                        <FontAwesomeIcon icon={faExpand} className={`icon__small cursor display-flex align`} />
                    </button>
                    <button className="button-small display-flex allCenter" onClick={() => push("/")}>
                        Regresar a Inicio
                        <FontAwesomeIcon icon={faArrowUp} className={`icon__small cursor display-flex align rotate45`} />
                    </button>
                </div>
            </div>
        </Layout>
    )
}

export default Success
