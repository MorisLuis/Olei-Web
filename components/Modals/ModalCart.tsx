import React, { useContext, useState } from 'react';
import styles from "../../styles/Modal.module.scss";

import { faAnglesRight, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProductShoppingCard from '../Cards/ProductShoppingCard';
import { useRouter } from 'next/router';
import { CartContext } from '@/context';
import { format } from '@/utils/currency';
import ProductInterface from '@/interfaces/product';
import { MessageCard } from '../Cards/MessageCard';


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
    const [productDeleteFromCart, setProductDeleteFromCart] = useState(false)
    const { cart, cartPending, numberOfItems, subTotal, setProductDelete } = useContext(CartContext);

    const handleCloseModal = () => {
        if (productDeleteFromCart) {
            setProductDelete(true)
            setClosing(true);
            setTimeout(() => {
                setClosing(false)
                setProductDelete(false)
                setProductDeleteFromCart(false)
                onClose();
            }, 300);
        } else {
            setClosing(true);
            setTimeout(() => {
                setClosing(false)
                onClose();
            }, 300);
        }
    };

    return visible ? (
        <>
            <div className={styles.modalBackground}></div>

            <div className={`${styles.modalCart} ${closing ? styles.closing : ''}`}>
                <div className={`${styles.header} display-flex space-between align`} >
                    <div className={`${styles.close} align cursor`} onClick={handleCloseModal}>
                        <FontAwesomeIcon icon={faAnglesRight} className={`icon cursor display-flex align`} />
                    </div>

                    <button className='button-small display-flex align' onClick={() => push("/cart")}>
                        Ver carrito
                        <FontAwesomeIcon icon={faArrowUp} className={`icon__small cursor display-flex align rotate45`} />
                    </button>
                </div>

                <div className={styles.content}>
                    {
                        cart.length > 0 ? cart.slice().reverse().map((product: ProductInterface, Index) =>
                            <ProductShoppingCard product={product} key={Index} setProductDeleteFromCart={setProductDeleteFromCart} />
                        )
                            :
                            <>
                                <MessageCard
                                    title="No has agregado productos aún"
                                    icon="faCartShopping"
                                >
                                    No hay productos en tu orden, apareceran una vez que agregues productos.
                                </MessageCard>
                            </>
                    }
                </div>

                <div className={`${styles.footer} display-flex column`}>
                    <div>
                        {
                            cartPending.length > 0 &&
                            <>
                                <div className={styles.productsPendingMessage}>
                                    <h3>Peticiones</h3>
                                    <p>Para ver los productos que pediste actualemente inexistentes, selecciona Ver carrito.</p>
                                </div>
                            </>
                        }
                    </div>
                    <h4 className='display-flex'>Subtotal ({numberOfItems} productos): {format(subTotal)}</h4>
                </div>
            </div>
        </>
    ) : null;
};

export default ModalCart;
