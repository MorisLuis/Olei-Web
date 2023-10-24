import React, { useContext, useState } from 'react';
import styles from "../../styles/Modal.module.scss";

import { faAnglesRight, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProductShoppingCard from '../Cards/ProductShoppingCard';
import { useRouter } from 'next/router';
import { AuthContext, CartContext } from '@/context';
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
    const { cart, cartPending, numberOfItems, subTotal, total, setProductDelete } = useContext(CartContext);
    const { user } = useContext(AuthContext);

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
            <div className={styles.modalBackground} onClick={onClose}></div>

            <div className={`${styles.modalSide} ${closing ? styles.closing : ''}`}>
                <div className={`${styles.header} display-flex space-between align`} >
                    <div className={`${styles.close} align cursor display-flex`} onClick={handleCloseModal}>
                        <FontAwesomeIcon icon={faAnglesRight} className={`icon cursor display-flex align`} />
                        <p>Cerrar</p>
                    </div>
                </div>

                <div className={styles.content}>
                    {
                        cart.length > 0 ? cart.slice().reverse().map((product: ProductInterface, Index) =>
                            <ProductShoppingCard product={product} key={Index} setProductDeleteFromCart={setProductDeleteFromCart} />
                        )
                            :
                            <MessageCard
                                title="No has agregado productos aún"
                                icon="faCartShopping"
                            >
                                No hay productos en tu orden, apareceran una vez que agregues productos.
                            </MessageCard>
                    }
                </div>

                <div className={`${styles.footer} display-flex column`}>
                    <div>
                        {
                            cartPending.length > 0 &&
                            <div className={styles.productsPendingMessage}>
                                <h3>Peticiones</h3>
                                <p>Para ver los productos que pediste actualemente inexistentes, selecciona Ver carrito.</p>
                            </div>
                        }
                    </div>
                    <div className={styles.pricing}>
                        {
                            user?.PrecioIncIVA === 1 ?
                                <h4 className='display-flex'>Total ({numberOfItems} productos): {format(total)}</h4>
                                :
                                <h4 className='display-flex'>Subtotal ( {
                                    numberOfItems === 1 ? `${numberOfItems} producto` : `${numberOfItems} productos`
                                } ): {format(subTotal)}</h4>
                        }
                        <button className={`${styles.seeCart} button display-flex allCenter`} onClick={() => push("/cart")}>
                            Ver carrito
                            <FontAwesomeIcon icon={faArrowUp} className={`icon__small cursor display-flex align rotate45`} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    ) : null;
};

export default ModalCart;
