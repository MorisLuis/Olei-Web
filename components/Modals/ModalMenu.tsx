import React, { useContext, useState } from 'react';
import styles from "../../styles/Modal.module.scss";

import { faAnglesRight, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { AuthContext } from '@/context';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { api } from '@/api/api';

interface Props {
    visible: boolean;
    onClose: () => void;
}

const ModalMenu = ({
    visible,
    onClose
}: Props) => {

    const { replace } = useRouter()
    const [closing, setClosing] = useState(false);
    const { user } = useContext(AuthContext);

    const onLogOut = async () => {
        try {
            await api.post('/api/auth/logout');
            Cookies.remove("token")
            replace("/login")
        } catch (error) {
            console.log({ error })
        }
    }


    return visible ? (
        <>
            <div className={styles.modalBackground} onClick={onClose}></div>

            <div className={`${styles.modalSide} ${styles.menu} ${closing ? styles.closing : ''}`}>
                <div className={`${styles.header} display-flex space-between align`} >
                    <div className={`${styles.close} align cursor`} onClick={onClose}>
                        <FontAwesomeIcon icon={faAnglesRight} className={`icon__small cursor display-flex align`} />
                    </div>
                </div>
                <div className={`${styles.content} ${styles.menu}`}>
                    <Link href={"/profile"}>
                        <div className={`${styles.profile} display-flex align`}>
                            <div className={`${styles.icon} display-flex allCenter`}>
                                <p>{user?.Nombre?.slice(0, 1)}</p>
                            </div>
                            <div className={styles.text}>
                                <p className={styles.name}>{user?.Nombre}</p>
                                <p className={styles.user}>{user?.Id_UsuarioOOL}</p>
                            </div>
                        </div>
                    </Link>
                    <div className='divider__small'></div>
                    <Link href={"/profile"}>
                        <div className={`${styles.item} display-flex align`}>
                            <FontAwesomeIcon icon={faUser} className={`icon__small cursor display-flex align`} />
                            <p>Informacion Personal</p>
                        </div>
                    </Link>
                    <Link href={"/profile/pastrequest"}>
                        <div className={`${styles.item} display-flex align`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-6 h-6 icon cursor display-flex align">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                            </svg>
                            <p>Ordenes Anteriores</p>
                        </div>
                    </Link>
                    <Link href={"/profile/request"}>
                        <div className={`${styles.item} display-flex align`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-2 h-2 icon cursor display-flex align" >
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                            </svg>
                            <p>Ordenes Solicitadas</p>
                        </div>
                    </Link>

                    <div className={`${styles.item} display-flex align`} onClick={onLogOut}>
                        <FontAwesomeIcon icon={faRightFromBracket} className={`icon__small cursor display-flex align`} />
                        <p>Cerrar sesión</p>
                    </div>
                </div>
            </div>
        </>
    ) : null;
};

export default ModalMenu;
