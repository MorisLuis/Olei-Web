import React, { useContext, useEffect, useState } from 'react';
import styles from "../../styles/Pages/Cart.module.scss";

import { CartContext } from '@/context';

import { HeaderCart } from '@/components/Pages/Cart/HeaderCart';
import PageTransition from '@/components/PageTranstion';
import { useSpring, animated } from 'react-spring';
import { MoonLoader } from 'react-spinners';
import { ModalMessage } from '@/components/Modals/ModalMessage';
import { ContentCart } from '@/components/Pages/Cart/ContentCart';
import { FooterCart } from '@/components/Pages/Cart/FooterCart';
import LayoutContentSecondary from '@/components/Layouts/LayoutContentSecondary';
import { useRouter } from 'next/router';
import useLockBodyScroll from '@/hooks/useLockBodyScroll';

const Cart = () => {

    const { cart, removeAllCart } = useContext(CartContext);
    const [orderRequested, setOrderRequested] = useState(false);
    const [openModalMessage, setOpenModalMessage] = useState(false);
    const { back } = useRouter()
    //useLockBodyScroll(openModalMessage)

    const handleRemoveCart = () => {
        removeAllCart()
        setOpenModalMessage(false)
    }

    // Animation 
    const [isEntering, setIsEntering] = useState(true);

    useEffect(() => {
        setIsEntering(false);
    }, []);

    const fadeIn = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
    });

    const orderSubmitedAndCartExisting = cart.length > 0 || !orderRequested;

    return (
        <>
            <PageTransition key="login-transition" isEntering={isEntering === false}>
                {
                    orderSubmitedAndCartExisting ?
                        <LayoutContentSecondary
                            onBack={back}
                            backText="Regresar"
                            footer={<FooterCart setOrderRequested={setOrderRequested} />}
                        >
                            <HeaderCart />
                            <ContentCart setOpenModalMessage={setOpenModalMessage} />
                        </LayoutContentSecondary>
                        :
                        <animated.div style={fadeIn} className={styles.proccesingCart}>
                            <MoonLoader color="#EDBD42" loading={true} size={30} />
                            <h1>Procesando pedido...</h1>
                        </animated.div>
                }
            </PageTransition>

            <ModalMessage
                visible={openModalMessage}
                onClose={() => setOpenModalMessage(false)}
                onAccept={handleRemoveCart}
                title={`Estas seguro de vaciar el carrito?`}
            >
                Podras volver a seleccionar después.
            </ModalMessage>
        </>
    )
}

export default Cart;