import React, { useState } from 'react';
import styles from "../../styles/Modal.module.scss";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faClose } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';


interface Props {
    visible: string | any;
    children: any;
    title?: string;

    //Conditions
    small?: boolean;
    receipt?: boolean;
    actionsVisible?: boolean;
    modalBlack?: boolean;

    //Methods
    onClose: () => void;
    handleOpenModalMessage?: () => void;
    onclick?: () => void;
}

const ModalRequest = ({
    visible,
    children,
    title,

    small,
    actionsVisible,
    receipt = false,
    modalBlack,

    onClose,
    handleOpenModalMessage,
    onclick
}: Props) => {

    const { push, query } = useRouter();
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false)
            onClose();
        }, 300);
    };


    return visible ?
        <>
            {
                !modalBlack ?
                    <div className={styles.modalBackground} onClick={handleClose}></div> :
                    <div className={styles.modalBackgroundSecondary}  onClick={handleClose}></div>
            }

            <div className={`${styles.modalPrincipal} ${receipt ? styles.receipt : ''} ${small ? styles.small : ''} ${isClosing ? styles.closing : ''}`}>

                <div className={`${styles.header} display-flex space-between align`} >
                    <div className={`${styles.left} display-flex align`}>
                        <h3>{title}</h3>
                        {
                            actionsVisible &&
                            <>
                                <button className={`${styles.expand} button-small display-flex align`} onClick={() => push(`/${query?.receipt}`)}>
                                    Expandir
                                    <FontAwesomeIcon icon={faExpand} className={`icon__small cursor display-flex align rotat45`} />
                                </button>
                                <button className={`${styles.expand} button-small display-flex align`} onClick={handleOpenModalMessage}>
                                    Usar en carrito
                                    <FontAwesomeIcon icon={faExpand} className={`icon__small cursor display-flex align rotat45`} />
                                </button>
                            </>
                        }
                    </div>

                    <div
                        className={`${styles.close} cursor`}
                        onClick={() => {
                            handleClose()
                        }}>
                        <FontAwesomeIcon icon={faClose} className={`icon cursor display-flex align`} />
                    </div>
                </div>

                <div className={styles.content}>
                    {children}
                </div>

                <div className={`${styles.footer} display-flex`}>
                    <button
                    style={{width: "30%"}}
                        className='button-small black'
                        onClick={() => {
                            handleClose()
                            onclick?.()
                        }}>Filtrar</button>
                </div>
            </div>
        </>
        : null
}

export default ModalRequest