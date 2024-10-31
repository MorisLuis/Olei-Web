import React, { useContext, useEffect, useState } from 'react';
import styles from "../../styles/Pages/Success.module.scss";

import { Layout } from '@/components/Layouts/Layout';
import { faArrowUp, faExpand } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { ClientContext } from '@/context';
import PageTransition from '@/components/PageTranstion';
import ButtonSmall from '@/components/Buttons/ButtonSmall';


const Success = () => {
    const { push, query } = useRouter()
    const { client } = useContext(ClientContext);

    const [isEntering, setIsEntering] = useState(true);

    useEffect(() => {
        setIsEntering(false);
    }, []);


    return (
        <PageTransition key="login-transition" isEntering={isEntering === false}>
            <Layout>
                <div className={styles.success}>
                    <h1>Tu pedido ha sido exitoso</h1>
                    <div className={styles.message}>
                        <p className={styles.text}>Tu pedido con el folio {query.order} ha sido realizado y {client.Nombre} lo ha recibido.</p>
                    </div>
                    <div className={`${styles.actions} display-flex`}>
                        <ButtonSmall
                            text='Ver recibo'
                            onClick={() => push(`/request/${query.order}`)}
                            icon={faExpand}
                            color='black'
                        />

                        <ButtonSmall
                            text='Regresar a Inicio'
                            onClick={() => push("/products")}
                            icon={faExpand}
                            color='black'
                        />

                    </div>
                </div>
            </Layout>
        </PageTransition>

    )
}

export default Success
