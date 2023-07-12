import { api } from '@/api/api';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { Search } from '../Inputs/search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faSquare, faFile } from '@fortawesome/free-solid-svg-icons';
import styles from "./../../styles/Navigation/Header.module.scss"

interface Props {
    setOpenModalCart: React.Dispatch<React.SetStateAction<boolean>>
}

const Header = ({
    setOpenModalCart
}: Props) => {
    const [profileOpen, setProfileOpen] = useState(false)
    const { replace } = useRouter()

    const onLogOut = async () => {
        try {
            const data = await api.post('/api/auth/logout');
            console.log({ data })
            Cookies.remove("token")
            replace("/login")
        } catch (error) {
            console.log({ error })
        }
    }

    return (
        <>
            <div className={`${styles.header}`}>
                <div className={`${styles.content} display-flex space-between`}>

                    <div className={`${styles.left} display-flex align`}>
                        <div className={styles.logo}>
                            Rosco
                        </div>
                        <div className={styles.search}>
                            <Search />
                        </div>
                        <div className={`${styles.orders} display-flex align cursor`}>
                            <FontAwesomeIcon icon={faFile} className={`icon__small`} />
                            <p>Pedidos</p>
                        </div>
                    </div>

                    <div className={`${styles.right} display-flex`}>

                        <div className={`${styles.item} display-flex allCenter`} onClick={() => setOpenModalCart(true)}>
                            <FontAwesomeIcon icon={faBagShopping} className={`icon`} />
                        </div>
                        <div className={`${styles.item} ${styles.profile} display-flex allCenter`} onClick={() => setProfileOpen(!profileOpen)}>
                            <FontAwesomeIcon icon={faSquare} className={`icon`} />
                            {
                                profileOpen &&
                                <div className={styles.profileBox}>
                                    <div className={styles.link}>Perfil</div>

                                    <div
                                        className={`${styles.link} ${styles.logout}`}
                                        onClick={onLogOut}
                                    >
                                        Cerrar Sesión
                                    </div>

                                </div>
                            }
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Header
