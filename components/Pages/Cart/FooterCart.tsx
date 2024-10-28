import React, { useContext, useState } from 'react';
import styles from "../../../styles/Pages/Cart.module.scss";

import { useSpring, animated } from '@react-spring/web';
import { format } from '@/utils/currency';
import { CartContext } from '@/context';
import useMeasure from 'react-use-measure'
import { useRouter } from 'next/router';
import { postOrder } from '@/services/order';
import useErrorHandler from '@/hooks/useErrorHandler';

interface FooterCartInterface {
    setOrderRequested: React.Dispatch<React.SetStateAction<boolean>>
}

export const FooterCart = ({
    setOrderRequested
}: FooterCartInterface) => {

    const { cart, total, numberOfItems, removeAllCart, subTotal } = useContext(CartContext);
    const { push } = useRouter();

    const [open, toggle] = useState(false);
    const [text, setText] = useState('Confirmar pedido');
    const [ref, { width }] = useMeasure();
    const [animationComplete, setAnimationComplete] = useState(false);
    const [blockPostOrder, setBlockPostOrder] = useState(false);
    const { handleError } = useErrorHandler()

    const submitOrder = async () => {
        setOrderRequested(true);

        try {
            const result = await postOrder({ subTotal, total, numberOfItems, cart });
            if (result.error) {
                handleError(result.error);
                return;
            }
            removeAllCart();
            push(`/cart/success?order=${result.folio}`);
        } catch (error) {
            handleError(error);
            setBlockPostOrder(true);
        } finally {
            setOrderRequested(false);
        }
    }

    const props = useSpring({
        width: open ? width : 0,
        onRest: () => {
            if (!animationComplete) {
                submitOrder();
                setAnimationComplete(true);
            }
        },
    });

    const handleClick = () => {
        toggle(!open);
        setText(open ? 'Confirmar pedido' : 'Enviando...');
    };

    if (blockPostOrder) return (
        <div className={styles.footer}>
            <div className={`${styles.footer__content} display-flex align`}>
                <p className={styles.total}>Intentelo mas tarde</p>
            </div>
        </div>
    )

    return (
        <div className={styles.footer}>
            <div className={`${styles.footer__content} display-flex align`}>
                {
                    cart.length > 0 &&
                    <>
                        <p className={styles.total}>Total (Incluye IVA) : {format(total)} </p>
                        <div className={`${styles.buttonConfirm} containerbutton`}>
                            <div ref={ref} className={"mainbutton"} onClick={handleClick}>
                                <animated.div className={"fillbutton"} style={props} />
                                <animated.div className={"contentbutton"}>{text}</animated.div>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

