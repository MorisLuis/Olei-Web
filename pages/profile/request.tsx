import LayoutProfile from '@/components/Layouts/LayoutProfile';
import React from 'react'
import styles from "../../styles/Pages/Request.module.scss";

const Pedidos = () => {
    return (
        <LayoutProfile>
            <div className={styles.request}>
                <section className={styles.info}>
                    <div className={styles.header}>
                        <h2>Pedidos actuales</h2>
                        <p>Para cambiar la información, habla con tu administrador.</p>
                    </div>
                    <div className={styles.item}>
                    </div>
                </section>
            </div>
        </LayoutProfile>
    )
}

export default Pedidos
