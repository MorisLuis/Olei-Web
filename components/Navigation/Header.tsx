import React, { useContext, useState } from 'react';
import styles from "./../../styles/Navigation/Header.module.scss";

import { api } from '@/api/api';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { AuthContext, CartContext, ClientContext } from '@/context';
import { ModalSearch } from '../Modals/ModalSearch';

interface Props {
    setOpenModalCart: React.Dispatch<React.SetStateAction<boolean>>
}

const Header = ({
    setOpenModalCart
}: Props) => {

    const [profileOpen, setProfileOpen] = useState(false)
    const { replace, push, pathname } = useRouter()
    const { numberOfItems } = useContext(CartContext);
    const { client } = useContext(ClientContext);
    const { user } = useContext(AuthContext);

    const [modalSearchVisible, setModalSearchVisible] = useState(false);

    const onLogOut = async () => {
        try {
            await api.post('/api/auth/logout');
            Cookies.remove("token")
            replace("/login")
        } catch (error) {
            console.log({ error })
        }
    }

    return (
        <>
            <div className={`${styles.header} blur`}>
                <div className={`${styles.content} display-flex space-between`}>
                    <div className={`${styles.left} display-flex align`}>
                        <div className={`${styles.logo} cursor`} onClick={() => push("/products")}>
                            Rosco
                        </div>

                        {
                            (user?.TipoUsuario === 2 && client?.Id_Almacen) &&
                            <div className={`${styles.client} display-flex align cursor`}>
                                <span>/</span>
                                <div className={`${styles.circular} display-flex allCenter`}>{client.Nombre.slice(0, 1)}</div>
                                <p className={`${styles.name} display-flex align`}>{client.Nombre}</p>
                                <p className={styles.description}>Cliente</p>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 icon" style={{marginLeft: "1em"}}>
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                                </svg>
                            </div>
                        }
                    </div>


                    <div className={`${styles.right} display-flex`}>
                        {
                            pathname === "/cart" || /^\/profile\//.test(pathname) || pathname === "/profile" || pathname === "/onboarding/search" ?
                                <></> :
                                <div className={`${styles.search} display-flex allCenter cursor`} onClick={() => setModalSearchVisible(true)} >
                                    <button className='display-flex align cursor'>
                                        <FontAwesomeIcon icon={faSearch} className={`icon`} />
                                        <p>Buscar</p>
                                    </button>
                                </div>
                        }
                        <div className={`${styles.orders} display-flex align cursor`} onClick={() => push("/profile/request")}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-6 h-6 icon">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>
                            <p>Pedidos</p>
                        </div>

                        <div className={`${styles.item} ${styles.profile} display-flex allCenter`} >
                            <div className={`${styles.icon} display-flex allCenter`} onClick={() => setProfileOpen(!profileOpen)}>
                                <p>M</p>
                            </div>

                            {
                                profileOpen &&
                                <div className={styles.profileBox}>
                                    <div className={styles.link} onClick={() => push("/profile")}>Perfil</div>

                                    <div
                                        className={`${styles.link} ${styles.logout}`}
                                        onClick={onLogOut}
                                    >
                                        Cerrar Sesión
                                    </div>
                                </div>
                            }
                        </div>

                        {
                            pathname === "/cart" ?
                                <></>
                                :
                                <div className={`${styles.item}  ${styles.cart}  display-flex allCenter`} onClick={() => setOpenModalCart(true)}>
                                    <div className={`${styles.circle} display-flex allCenter`}>
                                        <p>{numberOfItems}</p>
                                    </div>
                                    <svg className="w-6 h-6 icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                    </svg>
                                </div>
                        }
                    </div>
                </div>

            </div>

            <ModalSearch
                visible={modalSearchVisible}
                onClose={() => setModalSearchVisible(false)}
            />
        </>
    )
}

export default Header
