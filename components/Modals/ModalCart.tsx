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
    const { cart, cartPending, numberOfItems, subTotal } = useContext(CartContext);

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
                            <ProductShoppingCard product={product} key={Index} />
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
                                {/* <div className={`${styles.productsPendingMessage} display-flex column`}>
                                <div className='display-flex align'>
                                    <FontAwesomeIcon icon={faCircleQuestion} className={`icon cursor display-flex`} />
                                    <div>
                                        <p>Para ver los productos que pediste actualemente inexistentes, selecciona Ver carrito.</p>
                                        <p className={styles.productsLength}>Tienes {cartPending.length} productos pendientes.</p>
                                    </div>
                                </div>
                            </div> */}
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
