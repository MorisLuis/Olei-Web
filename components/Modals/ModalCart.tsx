import React, { useState } from 'react';
import styles from "../../styles/Modal.module.scss";
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProductCartCard from '../Cards/ProductCartCard';

interface Props {
    visible: boolean;
    onClose: () => void;
}

const ModalCart = ({
    visible,
    onClose
}: Props) => {
    const [closing, setClosing] = useState(false);

    const handleClose = () => {
        setClosing(true);
        setTimeout(() => {
            setClosing(false)
            onClose();
        }, 300);
    };

    return visible ? (
        <>
            <div className={styles.modalBackground}></div>

            <div className={`${styles.modalCart} ${closing ? styles.closing : ''}`}>
                <div className={`${styles.header} cursor`} onClick={handleClose}>
                    <div className={`${styles.close} align`}>
                        <FontAwesomeIcon icon={faAnglesRight} className={`icon cursor display-flex align`} />
                    </div>
                </div>

                <div className={styles.content}>
                    <ProductCartCard/>
                </div>
            </div>
        </>
    ) : null;
};

export default ModalCart;
