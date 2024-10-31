import React, { useState } from 'react';
import styles from "../../styles/Modal.module.scss";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faClose } from '@fortawesome/free-solid-svg-icons';
import ButtonSmall from '../Buttons/ButtonSmall';


interface Props {
    visible: boolean;
    children: React.ReactNode;
    title: string;

    //Conditions
    small?: boolean;
    actionsVisible?: boolean;
    decisionVisible?: boolean;
    modalBlack?: boolean;

    //Methods
    onClose: () => void;
    handleActionTopOne?: () => void;
    handleActionTopTwo?: () => void;
    handleActionBottomOne?: () => void;
}

const Modal = ({
    visible,
    children,
    title = '',

    small = false,
    actionsVisible = false,
    decisionVisible = false,
    modalBlack = false,

    onClose,
    handleActionTopOne,
    handleActionTopTwo,
    handleActionBottomOne,
}: Props) => {

    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false)
            onClose();
        }, 300);
    };

    const handleCleanFilters = () => {
        handleClose();
        handleActionBottomOne?.();
    }

    const renderActions = () => (
        <div className={styles.topactions}>
            <ButtonSmall
                text='Expandir'
                onClick={() => handleActionTopOne?.()}
                icon={faExpand}
            />

            <ButtonSmall
                text='Usar en carrito'
                onClick={() => handleActionTopTwo?.()}
                icon={faExpand}
            />
        </div>
    );

    const renderFooter = () => (
        <div className={styles.footer}>
            <ButtonSmall
                text='Quitar filtros'
                onClick={handleCleanFilters}
                transparent
            />

            <ButtonSmall
                text='Filtrar'
                onClick={handleClose}
                extraStyles={{ width: "30%" }}
            />
        </div>
    );

    return visible ?
        <>
            {
                !modalBlack ?
                    <div className={styles.modalBackground} onClick={handleClose}></div> :
                    <div className={styles.modalBackgroundSecondary} onClick={handleClose}></div>
            }

            <div className={`${styles.modalPrincipal} ${small ? styles.small : ''} ${isClosing ? styles.closing : ''}`}>

                <div className={styles.header} >
                    <div className={styles.left}>
                        {title && <h3>{title}</h3>}
                        {actionsVisible && renderActions()}
                    </div>

                    <div className={`${styles.close} cursor`} onClick={handleClose}>
                        <FontAwesomeIcon icon={faClose} className={'icon'} />
                    </div>
                </div>

                <div className={styles.content}>
                    {children}
                </div>

                {decisionVisible && renderFooter()}
            </div>
        </>
        : null
}

export default Modal