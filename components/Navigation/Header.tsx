import { api } from '@/api/api';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faSquare, faFile } from '@fortawesome/free-solid-svg-icons';
import styles from "./../../styles/Navigation/Header.module.scss"
import { SearchGlobal } from '../Inputs/searchGlobal';

interface Props {
    setOpenModalCart: React.Dispatch<React.SetStateAction<boolean>>,
    setFilterActive?: any,
    filterActive?: any
}

const Header = ({
    setOpenModalCart,
    filterActive,
    setFilterActive
}: Props) => {
    const [profileOpen, setProfileOpen] = useState(false)
    const { replace, push, pathname } = useRouter()

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
                        <div className={`${styles.logo} cursor`} onClick={() => push("/")}>
                            Rosco
                        </div>
                        {
                            pathname === "/cart" || /^\/profile\//.test(pathname) || pathname === "/profile" ?
                                <></> :
                                <div className={styles.search}>
                                    <SearchGlobal filterActive={filterActive} setFilterActive={setFilterActive}/>
                                </div>
                        }
                        <div className={`${styles.orders} display-flex align cursor`} onClick={() => push("/profile/request")}>
                            <FontAwesomeIcon icon={faFile} className={`icon__small`} />
                            <p>Pedidos</p>
                        </div>
                    </div>

                    <div className={`${styles.right} display-flex`}>
                        <div className={`${styles.item} ${styles.profile} display-flex allCenter`} onClick={() => setProfileOpen(!profileOpen)}>
                            <FontAwesomeIcon icon={faSquare} className={`icon`} />
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
                                <></> :
                                <div className={`${styles.item}  ${styles.cart}  display-flex allCenter`} onClick={() => setOpenModalCart(true)}>
                                    <div className={`${styles.circle} display-flex allCenter`}>
                                        <p>3</p>
                                    </div>
                                    <FontAwesomeIcon icon={faBagShopping} className={`icon`} />
                                </div>
                        }

                    </div>
                </div>

            </div>
        </>
    )
}

export default Header
