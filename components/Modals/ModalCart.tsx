import React, { useContext, useState } from 'react';
import styles from "../../styles/Modal.module.scss";

import { faAnglesRight, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProductShoppingCard from '../Cards/ProductShoppingCard';
import { useRouter } from 'next/router';
import { CartContext } from '@/context';
import { format } from '@/utils/currency';
import ProductInterface from '@/interfaces/product';


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
    const { cart, numberOfItems, subTotal } = useContext(CartContext);

    const handleCloseModal = () => {
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
                <div className={`${styles.header} display-flex space-between cursor`} onClick={handleCloseModal}>
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
                        cart.map((product: ProductInterface, Index) =>
                            <ProductShoppingCard product={product} key={Index} />
                        )
                    }
                </div>

                <div className={`${styles.footer} display-flex`}>
                    <h4 className='display-flex'>Subtotal ({numberOfItems} productos): {format(subTotal)}</h4>
                </div>
            </div>
        </>
    ) : null;
};

export default ModalCart;
