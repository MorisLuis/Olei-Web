import React, { CSSProperties, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faClose } from '@fortawesome/free-solid-svg-icons';
import ButtonSmall from '../Buttons/ButtonSmall';
import styles from "../../styles/Modal.module.scss";
import useLockBodyScroll from '@/hooks/useLockBodyScroll';


interface Props {
    visible: boolean;
    children: React.ReactNode;
    title: string;

    //Conditions
    //small?: boolean;
    modalSize?: "medium" | "small" | "normal";
    actionsVisible?: boolean;
    decisionVisible?: boolean;
    modalBlack?: boolean;

    //Methods
    onClose: () => void;
    handleActionTopOne?: () => void;
    handleActionTopTwo?: () => void;
    handleActionBottomOne?: () => void;
    extraStyles?: CSSProperties
}

const Modal = ({
    visible,
    children,
    title = '',

    modalSize = "normal",
    actionsVisible = false,
    decisionVisible = false,
    modalBlack = false,

    onClose,
    handleActionTopOne,
    handleActionTopTwo,
    handleActionBottomOne,
    extraStyles
}: Props) => {

    const [isClosing, setIsClosing] = useState(false);
    useLockBodyScroll(visible);

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
                color='blue'
            />

            <ButtonSmall
                text='Usar en carrito'
                onClick={() => handleActionTopTwo?.()}
                icon={faExpand}
                color='blue'
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

            <div className={`${styles.Modal} ${styles[modalSize]} ${isClosing ? styles.closing : ''}`} style={extraStyles}>

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