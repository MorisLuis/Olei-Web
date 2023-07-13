import React, { useState } from 'react';
import { faAnglesRight, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProductCartCard from '../Cards/ProductCartCard';
import styles from "../../styles/Modal.module.scss";

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
                <div className={`${styles.header} display-flex space-between cursor`} onClick={handleClose}>
                    <div className={`${styles.close} align`}>
                        <FontAwesomeIcon icon={faAnglesRight} className={`icon cursor display-flex align`} />
                    </div>
                    <button className='button-small display-flex align'>
                        Ver carrito
                        <FontAwesomeIcon icon={faArrowUp} className={`icon__small cursor display-flex align rotat45`} />
                    </button>
                </div>

                <div className={styles.content}>
                    <ProductCartCard />
                    <ProductCartCard />
                    <ProductCartCard />
                    <ProductCartCard />
                    <ProductCartCard />
                    <ProductCartCard />
                    <ProductCartCard />
                    <ProductCartCard />
                    <ProductCartCard />
                    <ProductCartCard />
                    <ProductCartCard />

                </div>

                <div className={styles.footer}>
                    footer
                </div>
            </div>
        </>
    ) : null;
};

export default ModalCart;
