import React, { useState } from 'react';
import styles from "../../styles/Modal.module.scss";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faClose } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';


interface Props {
    visible: boolean;
    children: React.ReactNode;
    title?: string;

    //Conditions
    small?: boolean;
    receipt?: boolean;
    actionsVisible?: boolean;
    decisionVisible?: boolean;
    modalBlack?: boolean;

    //Methods
    onClose: () => void;
    handleOpenUseCart?: () => void;
    handleFiltersToQuery?: () => void;
    handleCleanAllFilters?: () => void;
}

const Modal = ({
    visible,
    children,
    title = '',

    small = false,
    receipt = false,
    actionsVisible = false,
    decisionVisible = false,
    modalBlack = false,

    onClose,
    handleOpenUseCart,
    handleFiltersToQuery,
    handleCleanAllFilters
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

    const renderActions = () => (
        <>
            <button
                className={`${styles.expand} button-small display-flex align m-right`}
                onClick={() => push(`/request/${query?.receipt}`)}
            >
                Expandir
                <FontAwesomeIcon icon={faExpand} className="icon__small cursor display-flex align rotat45" />
            </button>
            <button
                className={`${styles.expand} button-small display-flex align`}
                onClick={handleOpenUseCart}
            >
                Usar en carrito
                <FontAwesomeIcon icon={faExpand} className="icon__small cursor display-flex align rotat45" />
            </button>
        </>
    );

    const renderFooter = () => (
        <div className={`${styles.footer} display-flex space-between`}>
            <button
                className="button-small transparent"
                onClick={() => {
                    handleClose();
                    handleCleanAllFilters?.();
                }}
            >
                Quitar filtros
            </button>
            <button
                style={{ width: "30%" }}
                className="button-small"
                onClick={() => {
                    handleClose();
                    handleFiltersToQuery?.();
                }}
            >
                Filtrar
            </button>
        </div>
    );

    return visible ?
        <>
            {
                !modalBlack ?
                    <div className={styles.modalBackground} onClick={handleClose}></div> :
                    <div className={styles.modalBackgroundSecondary} onClick={handleClose}></div>
            }

            <div className={`${styles.modalPrincipal} ${receipt ? styles.receipt : ''} ${small ? styles.small : ''} ${isClosing ? styles.closing : ''}`}>

                <div className={`${styles.header} display-flex space-between align`} >
                    <div className={`${styles.left} display-flex align`}>
                        {title && <h3>{title}</h3>}
                        {actionsVisible && renderActions()}
                    </div>

                    <div className={`${styles.close} cursor`} onClick={handleClose}>
                        <FontAwesomeIcon icon={faClose} className={`icon cursor display-flex align`} />
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