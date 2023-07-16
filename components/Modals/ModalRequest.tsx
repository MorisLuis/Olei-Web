import React from 'react';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from "../../styles/Modal.module.scss";

interface Props {
    visible: string | any;
    receipt?: boolean;
    onClose: () => void;
    children: any
}

const ModalRequest = ({
    visible,
    onClose,
    receipt = false,
    children
}: Props) => {

    return visible ?
        <>
            <div className={styles.modalBackground}></div>
            <div className={
                receipt ? `${styles.modalRequest} ${styles.receipt}` :`${styles.modalRequest}`
            }>
                <div className={`${styles.header} display-flex space-between align`} onClick={onClose}>
                    <h3>
                        Recibo
                    </h3>
                    <div className={`${styles.close} cursor`}>
                        <FontAwesomeIcon icon={faClose} className={`icon cursor display-flex align`} />
                    </div>
                </div>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </>
        : null
}

export default ModalRequest