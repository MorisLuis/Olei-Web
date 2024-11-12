import React, { useContext, useState } from 'react';
import styles from "../../../styles/Pages/Cart.module.scss";

import { format } from '@/utils/currency';
import { CartContext } from '@/context';
import { useRouter } from 'next/router';
import { postOrder } from '@/services/order';
import useErrorHandler from '@/hooks/useErrorHandler';
import ButtonAnimated from '@/components/Buttons/ButtonAnimated';

interface FooterCartInterface {
    setOrderRequested: React.Dispatch<React.SetStateAction<boolean>>
}

export const FooterCart = ({
    setOrderRequested
}: FooterCartInterface) => {

    const { cart, total, numberOfItems, removeAllCart, subTotal } = useContext(CartContext);
    const { push } = useRouter();
    const [blockPostOrder, setBlockPostOrder] = useState(false);
    const { handleError } = useErrorHandler()

    const submitOrder = async () => {
        setOrderRequested(true);

        try {
            const result = await postOrder({ subTotal, total, numberOfItems, cart });
            if (result.error) return handleError(result.error);
            removeAllCart();
            push(`/cart/success?order=${result}`);
        } catch (error) {
            handleError(error);
            setBlockPostOrder(true);
        } finally {
            setOrderRequested(false);
        }
    }

    if (blockPostOrder) return (
        <div className={styles.footer}>
            <div className={`${styles.footer__content} display-flex align`}>
                <p className={styles.total}>Intentelo mas tarde</p>
            </div>
        </div>
    )

    return (
        <div className={styles.cart}>
            <div className={styles.footer}>
                <div className={`${styles.footer__content} display-flex align`}>
                    {
                        cart.length > 0 &&
                        <>
                            <p className={styles.total}>Total (Incluye IVA) : {format(total)} </p>
                            <div className={styles.buttonConfirm}>
                                <ButtonAnimated
                                    onSubmit={submitOrder}
                                    textDefault="Confirmar pedido"
                                />
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

