import React, { ReactNode } from 'react'
import ButtonSmall from '../Buttons/ButtonSmall';
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

            <div className={styles.ModalMessage}>
                <div className={styles.content}>
                    <h2>{title}</h2>
                    <p>{children}</p>
                </div>
                <div className={styles.footer}>
                    <ButtonSmall
                        text='Cerrar'
                        onClick={onClose}
                        disabled={disabled}
                        color='white'
                    />

                    <br />

                    <ButtonSmall
                        text='Aceptar'
                        onClick={onAccept}
                        disabled={disabled}
                        color='red'
                    />

                </div>
            </div>
        </>
        : null
}
