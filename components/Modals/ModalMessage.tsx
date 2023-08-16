import React from 'react'
import styles from "../../styles/Modal.module.scss";

interface Props {
    visible: Boolean;
    receipt?: boolean;
    children: any;

    //Methods
    onClose?: () => void;
    onAccept: () => void;
}

export const ModalMessage = ({
    visible,
    children,

    onClose,
    onAccept,
}: Props) => {
    return visible ?
        <>
            <div className={styles.modalBackgroundSecondary}></div>

            <div className={styles.modalMessage}>
                <p onClick={onClose}>Close</p><br/>
                <p onClick={onAccept}>Aceptar</p>
                {children}
            </div>
        </>
        : null
}
