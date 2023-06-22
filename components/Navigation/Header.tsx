import { api } from '@/api/api';
import { AuthContext } from '@/context';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext } from 'react'
import styles from "./../../styles/Navigation/Header.module.scss"

const Header = () => {

    const { user, logoutUser } = useContext(AuthContext);
    const { replace } = useRouter()

    console.log({user})

    return (
        <>
            <div className={styles.header}>
                <div>
                    Logo
                </div>
                <div
                    className={styles.logout}
                    onClick={async () => {
                        try {
                            const data = await api.post('/api/auth/logout');
                            console.log({data})
                            Cookies.remove("token")
                            replace("/login")
                        } catch (error) {
                            console.log({ error })
                        }

                    }}
                >
                    Cerra Sesión
                </div>
            </div>
        </>
    )
}

export default Header
