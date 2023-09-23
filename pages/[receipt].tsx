import React from 'react'
import styles from "../styles/Pages/Receipt.module.scss";

import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { ReceiptRender } from '@/components/Renders/ReceiptRender';


const ReceiptPage = () => {

    const {push} = useRouter();

    return (
        <div className={styles.receipt}>
            <div className={`${styles.content} display-flex column`}>
                <div className={`${styles.header} display-flex space-between align blur`}>
                    <h3>Recibo</h3>
                    <div className={`${styles.close} cursor`} onClick={() => push("/profile/request")}>
                        <FontAwesomeIcon icon={faClose} className={`icon display-flex align`} />
                    </div>
                </div>

                <div className={styles.render}>
                    <ReceiptRender />
                </div>
            </div>
        </div>
    )
}

export default ReceiptPage