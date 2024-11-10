import React, { useContext } from 'react';
import styles from "./../../../styles/Navigation/Header.module.scss";

import { AuthContext, ClientContext } from '@/context';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface LeftSectionInterface {
    setModalClientsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const LeftSection = ({
    setModalClientsVisible
}: LeftSectionInterface) => {

    const { push, pathname } = useRouter()
    const { user } = useContext(AuthContext);
    const { client } = useContext(ClientContext);

    const handleClickLogo = () => {
        if (pathname !== '/onboarding/selectClient' && pathname !== '/privacy') {
            push('/products');
        }
    }

    const showClientOfTheCompany = user?.TipoUsuario === 2 && client?.Id_Almacen && pathname !== '/onboarding/selectClient'

    const getLogo = () => {
        const database = user?.Baseweb
        const databaseSplit = database?.split('_')
        const newPath = databaseSplit?.[1]?.toLowerCase().trim();
        const logo = newPath ? `https://oleistorage.blob.core.windows.net/${newPath}/LOGO.png` : '/Logo_horizontal2.png'
        return logo;
    }

    return (
        <div className={styles.left}>
            <div className={styles.logo} onClick={handleClickLogo} >
                <Image
                    fill
                    alt="logo"
                    src={getLogo()}
                    priority
                />
            </div>

            {
                showClientOfTheCompany && (
                    <div className={styles.client} onClick={() => setModalClientsVisible(true)}>
                        <span>|</span>
                        <div className={styles.circular}>
                            <div className={styles.content}>
                                <p>{client.Nombre.slice(0, 1)}</p>
                            </div>
                        </div>
                        <p className={styles.name}>{client.Nombre}</p>
                        <p className={styles.description}>Cliente</p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="icon">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18" />
                        </svg>
                    </div>
                )}
        </div>
    );
}
