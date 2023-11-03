import React, { useContext } from 'react';
import styles from "./../../../styles/Navigation/Header.module.scss";

import { AuthContext, ClientContext } from '@/context';
import { useRouter } from 'next/router';

export const LeftSection = ({
    setModalClientsVisible
}: any) => {

    const { push, pathname } = useRouter()
    const { user } = useContext(AuthContext);
    const { client } = useContext(ClientContext);

    return (
        <div className={`${styles.left} display-flex align`}>
            <div className={`${styles.logo} cursor`} onClick={() => {
                if (pathname !== '/onboarding/selectClient') {
                    push('/products');
                }
            }}>
                {user?.Company}
            </div>

            {user?.TipoUsuario == '2' && client?.Id_Almacen && pathname !== '/onboarding/selectClient' && (
                <div className={`${styles.client} display-flex align cursor`} onClick={() => setModalClientsVisible(true)}>
                    <span>|</span>
                    <div className={`${styles.circular} display-flex allCenter`}>
                        <div className={styles.content}>
                            <p>{client.Nombre.slice(0, 1)}</p>
                        </div>
                    </div>
                    <p className={`${styles.name} display-flex align`}>{client.Nombre}</p>
                    <p className={styles.description}>Cliente</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="icon">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18" />
                    </svg>
                </div>
            )}
        </div>
    );
}
