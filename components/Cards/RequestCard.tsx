import Link from 'next/link';
import React from 'react';
import { faFileLines, faFilePen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from "../../styles/Components/Cards.module.scss";

const RequestCard = () => {
    return (
        <div className={styles.requestCart}>
            <div className={styles.info}>
                <div className={styles.header}>
                    <p><span>Fecha:</span> 27 Julio 2023</p>
                </div>
                <div className={styles.data}>
                    <p><span>Total:</span> $3,450 MXN</p>
                    <p><span>Productos:</span> 30</p>
                </div>
            </div>

            <div className={`${styles.action} display-flex`}>
                <div className={`${styles.content} display-flex`}>
                    <Link
                        href="/profile/request/?receipt=1"
                        as="/1"
                        className='button-small black display-flex align'
                    >
                        Ver recibo
                        <FontAwesomeIcon icon={faFileLines} className={`icon__small cursor display-flex align`} />
                    </Link>
                    <button className='button-small black display-flex align'>
                        Modificar
                        <FontAwesomeIcon icon={faFilePen} className={`icon__small cursor display-flex align`} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RequestCard
