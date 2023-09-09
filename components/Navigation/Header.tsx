import React, { useContext, useState } from 'react';
import styles from "./../../styles/Navigation/Header.module.scss";

import { api } from '@/api/api';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faFile, faSearch } from '@fortawesome/free-solid-svg-icons';
import { SearchGlobal } from '../Inputs/searchGlobal';
import { CartContext } from '@/context';
import { ModalSearch } from '../Modals/ModalSearch';

interface Props {
    setOpenModalCart: React.Dispatch<React.SetStateAction<boolean>>
}

const Header = ({
    setOpenModalCart,
}: Props) => {
    const [profileOpen, setProfileOpen] = useState(false)
    const { replace, push, pathname } = useRouter()
    const { numberOfItems } = useContext(CartContext);
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

    const handleSelectOption = (value : string) => {

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
                            pathname === "/cart" || /^\/profile\//.test(pathname) || pathname === "/profile" || pathname === "/" ?
                                <></> :
                                <div className={`${styles.search} display-flex allCenter cursor`}>
                                    <button className='display-flex align cursor'>
                                        <FontAwesomeIcon icon={faSearch} className={`icon__small`} />
                                        <p onClick={() => setModalSearchVisible(true)}>Buscar</p>
                                    </button>
                                </div>
                        }
                        <div className={`${styles.orders} display-flex align cursor`} onClick={() => push("/profile/request")}>
                            <FontAwesomeIcon icon={faFile} className={`icon__small`} />
                            <p>Pedidos</p>
                        </div>
                    </div>

                    <div className={`${styles.right} display-flex`}>
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
                                    <FontAwesomeIcon icon={faBagShopping} className={`icon`} />
                                </div>
                        }
                    </div>
                </div>

            </div>

            <ModalSearch
                visible={modalSearchVisible}
                onClose={() => setModalSearchVisible(false)}
                results={""}
            >
                <div className={styles.messageModal}>
                    <p>Busca un producto por su nombre o codigo</p>
                </div>

            </ModalSearch>
        </>
    )
}

export default Header
