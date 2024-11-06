import React, { useContext } from 'react';
import styles from "../../../styles/Menu.module.scss";

import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext, CartContext, FiltersContext } from '@/context';
import Link from 'next/link';
import ModalSideways from '../ModalSideways';

interface Props {
    visible: boolean;
    onClose: () => void;
}

const ModalMenu = ({
    visible,
    onClose
}: Props) => {

    const { user, logoutUser } = useContext(AuthContext);
    const { removeAllFilters } = useContext(FiltersContext);
    const { removeAllCart } = useContext(CartContext);

    const handleLogout = () => {
        logoutUser();
        removeAllFilters();
        removeAllCart();
    }

    return (
        <ModalSideways
            visible={visible}
            onClose={onClose}
            extraStyles={{ width: "20%" }}
        >
            <div className={styles.Menu}>
                <div className={styles.content}>
                    <Link href={"/profile"} className={styles.profile}>
                        <div className={styles.icon}>
                            <p>{user?.Nombre?.slice(0, 1)}</p>
                        </div>
                        <div className={styles.text}>
                            <p className={styles.name}>{user?.Nombre}</p>
                            <p className={styles.user}>{user?.Id_UsuarioOOL}</p>
                        </div>
                    </Link>

                    <div className='divider__small'></div>

                    <Link href={"/profile"} className={styles.item}>
                        <FontAwesomeIcon icon={faUser} className={`icon__small cursor display-flex align`} />
                        <p>Informacion Personal</p>
                    </Link>

                    <Link href={"/profile/pastrequest"} className={styles.item}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 icon cursor display-flex align">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                        </svg>
                        <p>Ordenes Anteriores</p>
                    </Link>

                    <Link href={"/profile/request"} className={styles.item}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-2 h-2 icon cursor display-flex align" >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                        <p>Ordenes Solicitadas</p>
                    </Link>

                    <div className={styles.item} onClick={handleLogout}>
                        <FontAwesomeIcon icon={faRightFromBracket} className={`icon__small cursor display-flex align`} />
                        <p>Cerrar sesión</p>
                    </div>
                </div>
            </div>
        </ModalSideways>
    )
};

export default ModalMenu;
