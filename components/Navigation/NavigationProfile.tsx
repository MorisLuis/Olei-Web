import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styles from "../../styles/Navigation/NavigationProfile.module.scss";

const Menu = [
    {
        name: "Cuenta",
        pathname: "/profile",
        key: 1
    },
    {
        name: "Pedidos",
        pathname: "/profile/pedidos",
        key: 2
    }
]

const NavigationProfile = () => {

    const { pathname } = useRouter()

    return (
        <div className={styles.navigationProfile}>
            <h1>Perfil</h1>
            <div className={`${styles.menu} display-flex`}>
                {
                    Menu.map((item) =>
                        <div key={item.key} className={item.pathname === pathname ? `${styles.link} ${styles.active}` : `${styles.link}`}>
                            <Link href={item.pathname}>
                                {item.name}
                            </Link>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default NavigationProfile
