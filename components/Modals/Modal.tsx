import React, { useState } from 'react';
import styles from "../../styles/Modal.module.scss";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faClose } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import ButtonSmall from '../Buttons/ButtonSmall';


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

    const handelFilter = () => {
        handleClose();
        handleFiltersToQuery?.();
    };

    const handleCleanFilters = () => {
        handleClose();
        handleCleanAllFilters?.();
    }

    const renderActions = () => (
        <div className='display-flex gap__10'>
            <ButtonSmall
                text='Expandir'
                onClick={() => push(`/request/${query?.receipt}`)}
                icon={faExpand}
            />

            <ButtonSmall
                text='Usar en carrito'
                onClick={() => handleOpenUseCart?.()}
                icon={faExpand}
            />
        </div>
    );

    const renderFooter = () => (
        <div className={`${styles.footer} display-flex space-between`}>
            <ButtonSmall
                text='Quitar filtros'
                onClick={handleCleanFilters}
                transparent
            />

            <ButtonSmall
                text='Filtrar'
                onClick={handelFilter}
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