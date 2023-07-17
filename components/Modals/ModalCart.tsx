import React, { useState } from 'react';
import { faAnglesRight, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProductCartCard from '../Cards/ProductCartCard';
import { useRouter } from 'next/router';
import { productsUtils } from '@/utils/products';
import ProductInterface from '@/interfaces/product';

import styles from "../../styles/Modal.module.scss";

interface Props {
    visible: boolean;
    onClose: () => void;
}

const ModalCart = ({
    visible,
    onClose
}: Props) => {
    const { push } = useRouter()
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
                    <button className='button-small display-flex align' onClick={() => push("/cart")}>
                        Ver carrito
                        <FontAwesomeIcon icon={faArrowUp} className={`icon__small cursor display-flex align rotate45`} />
                    </button>
                </div>

                <div className={styles.content}>
                    {
                        productsUtils.map((product: ProductInterface, Index) =>
                            <ProductCartCard product={product} key={Index} />
                        )
                    }
                </div>

                <div className={`${styles.footer} display-flex`}>
                    <h4 className='display-flex'>Subtotal (7 productos): $346.90 MXN</h4>
                </div>
            </div>
        </>
    ) : null;
};

export default ModalCart;
