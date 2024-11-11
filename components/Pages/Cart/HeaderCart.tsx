import React from 'react'
import styles from "../../../styles/Pages/Cart.module.scss";

export const HeaderCart = () => {
    return (
        <div className={styles.cart}>
            <div className={styles.header}>
                <div className={styles.title}>
                    <h1>Carrito</h1>
                    <p className={styles.paragraph}>Revisa el pedido y despues confirma.</p>
                </div>
            </div>
        </div>
    )
}
