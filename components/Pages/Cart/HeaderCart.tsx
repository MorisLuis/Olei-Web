import React from 'react'
import styles from "../../../styles/Pages/Cart.module.scss";
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';

export const HeaderCart = () => {

    const { back } = useRouter();

    return (
        <div className={styles.header}>
            <div className={`${styles.back} display-flex align cursor`} onClick={() => back()}>
                <FontAwesomeIcon icon={faArrowLeftLong} className={`icon__small`} />
                <p>Regresar</p>
            </div>
            <div className={styles.title}>
                <h1>Compra</h1>
                <p className={styles.paragraph}>Revisa el pedido y despues confirma.</p>
            </div>
        </div>
        )
}
