import React, { useContext, useEffect, useState } from 'react';
import styles from "../../styles/Pages/Success.module.scss";

import { Layout } from '@/components/Layouts/Layout';
import { faArrowUp, faExpand } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import Confetti from 'react-confetti';
import { ClientContext } from '@/context';
import PageTransition from '@/components/PageTranstion';


const Success = () => {
    const { push, query } = useRouter()
    const { client } = useContext(ClientContext);

    //Code confetti animation.
    const [showConfetti, setShowConfetti] = useState(true);
    const [confettiOpacity, setConfettiOpacity] = useState(1);
    const [confettiSize, setConfettiSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const confettiTimeout = setTimeout(() => {
            // Start fading out the confetti
            const fadeOutInterval = setInterval(() => {
                setConfettiOpacity((prevOpacity) => {
                    const newOpacity = prevOpacity - 0.1; // Adjust the decrement as needed
                    if (newOpacity <= 0) {
                        clearInterval(fadeOutInterval);
                        setShowConfetti(false); // Hide the confetti after fading out
                        return 0;
                    }
                    return newOpacity;
                });
            }, 200); // Adjust the interval duration as needed

            // Clear the interval and hide the confetti when the component unmounts
            return () => {
                clearInterval(fadeOutInterval);
                setShowConfetti(false);
            };
        }, 5000); // Adjust the initial duration as needed
        setConfettiSize({ width: window.innerWidth, height: window.innerHeight });

        return () => clearTimeout(confettiTimeout);
    }, []);

    const [isEntering, setIsEntering] = useState(true);

    useEffect(() => {
        setIsEntering(false);
    }, []);


    return (
        <PageTransition key="login-transition" isEntering={isEntering === false}>
            <Layout>
                <div className={styles.success}>
                    <h1>Tu pedido ha sido exitoso</h1>
                    <div className={styles.message}>
                        <p className={styles.text}>Tu pedido ha sido realizado y {client.Nombre} lo ha recibido.</p>
                    </div>
                    <div className={`${styles.actions} display-flex`}>
                        <button className="button-small black display-flex allCenter" onClick={() => push(`/${query.order}`)}>
                            Ver recibo
                            <FontAwesomeIcon icon={faExpand} className={`icon__small cursor display-flex align`} />
                        </button>
                        <button className="button-small display-flex allCenter" onClick={() => push("/products")}>
                            Regresar a Inicio
                            <FontAwesomeIcon icon={faArrowUp} className={`icon__small cursor display-flex align rotate45`} />
                        </button>
                    </div>
                    {/* {showConfetti && (
                        <Confetti
                            width={confettiSize.width}
                            height={confettiSize.height}
                            numberOfPieces={300}
                            style={{ opacity: confettiOpacity, transition: 'opacity 0.5s ease-out' }}
                        />
                    )} */}
                </div>
            </Layout>
        </PageTransition>

    )
}

export default Success
