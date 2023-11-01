import React from 'react'
import styles from "../../styles/Modal.module.scss";

interface Props {
    visible: boolean;
    receipt?: boolean;
    children: any;
    title: string,

    //Methods
    onClose: () => void;
    onAccept: () => void;
}

export const ModalMessage = ({
    visible,
    children,
    title,

    onClose,
    onAccept,
}: Props) => {
    return visible ?
        <>
            <div className={styles.modalBackgroundSecondary}></div>

            <div className={styles.modalMessage}>
                <div className={styles.content}>
                    <h2>{title}</h2>
                    <p>
                        {children}
                    </p>
                </div>
                <div className={`${styles.footer} display-flex space-between`}>
                    <button className='button-small white' onClick={onClose}>Cerrar</button><br/>
                    <button className='button-small black' onClick={onAccept}>Aceptar</button>
                </div>
            </div>
        </>
        : null
}
