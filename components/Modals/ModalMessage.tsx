import React, { ReactNode } from 'react'
import styles from "../../styles/Modal.module.scss";

interface Props {
    visible: boolean;
    receipt?: boolean;
    children: ReactNode;
    title: string,
    disabled?: boolean;

    //Methods
    onClose: () => void;
    onAccept: () => void;
}

export const ModalMessage = ({
    visible,
    children,
    title,
    disabled,

    onClose,
    onAccept,
}: Props) => {
    return visible ?
        <>
            <div className={styles.modalBackgroundSecondary}></div>

            <div className={styles.modalMessage}>
                <div className={styles.content}>
                    <h2>{title}</h2>
                    <p>{children}</p>
                </div>
                <div className={`${styles.footer} display-flex space-between`}>
                    <button
                        className={disabled ? 'button-small white opacity' : 'button-small white'}
                        onClick={onClose}
                        disabled={disabled}
                    >
                        Cerrar
                    </button><br />

                    <button
                        className={disabled ? 'button-small black opacity' : 'button-small black'}
                        onClick={onAccept}
                        disabled={disabled}
                    >
                        Aceptar
                    </button>
                </div>
            </div>
        </>
        : null
}
