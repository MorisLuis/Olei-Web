import React from 'react'
import styles from "../../styles/Modal.module.scss";

interface Props {
    visible: Boolean;
    receipt?: boolean;
    onClose?: () => void;
    children: any
}

export const ModalSearch = ({
    visible,
    children
}: Props) => {
    return visible ?
        <>
            <div className={styles.modalBackgroundSecondary}></div>

            <div className={styles.modalSearch}>
                {children}
            </div>
        </>
        : null
}
