import React, { useContext, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import styles from "../../../styles/Pages/Cart.module.scss";
import { format } from '@/utils/currency';
import { CartContext } from '@/context';
import useMeasure from 'react-use-measure'
import OrderInterface from '@/interfaces/order';
import ProductInterface from '@/interfaces/product';
import { api } from '@/api/api';
import { useRouter } from 'next/router';

export const submitOrder = async ({
    removeAllCart,
    subTotal,
    total,
    numberOfItems,
    cart,
    push,
    setOrderRequested
}: any) => {
    setOrderRequested(true)


    const order: OrderInterface = {
        Total: total,
        Piezas: numberOfItems,
        Subtotal: subTotal
    }

    const productOrdered: ProductInterface[] = cart.map((product: ProductInterface) => {

        const productDetails: ProductInterface = {
            Codigo: product.Codigo,
            Id_Marca: product?.Id_Marca,
            Piezas: product.Piezas,
            Precio: product.Precio,
            Impuesto: product.Impuesto,
            Descripcion: product.Descripcion,
            Existencia: product?.Existencia,
        }

        return productDetails
    })

    let newOrder;

    try {
        await api.post('/api/orderDetails', productOrdered);
    } catch (error) {
        console.log({ error })
    }


    try {
        newOrder = await api.post('/api/order', order)
    } catch (error) {
        console.log({ error })
    }

    if (newOrder) {
        const folio = newOrder.data.order.Folio.value;
        removeAllCart()
        push(`/cart/success?order=${folio}`)
    }
}

export const FooterCart = ({    setOrderRequested
}: any) => {

    const { cart, total, numberOfItems, removeAllCart, subTotal } = useContext(CartContext);
    const { push } = useRouter();

    const [open, toggle] = useState(false);
    const [text, setText] = useState('Confirmar pedido');
    const [ref, { width }] = useMeasure();
    const [animationComplete, setAnimationComplete] = useState(false);

    const props = useSpring({
        width: open ? width : 0,
        onRest: () => {
            if (!animationComplete) {
                submitOrder({
                    removeAllCart,
                    subTotal,
                    total,
                    numberOfItems,
                    cart,
                    push,
                    setOrderRequested
                });
                setAnimationComplete(true);
            }
        },
    });

    const handleClick = () => {
        toggle(!open);
        setText(open ? 'Confirmar pedido' : 'Enviando...');
    };

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

