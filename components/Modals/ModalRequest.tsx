import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faClose } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import styles from "../../styles/Modal.module.scss";

interface Props {
    visible: string | any;
    receipt?: boolean;
    onClose: () => void;
    children: any
}

const ModalRequest = ({
    visible,
    onClose,
    receipt = false,
    children
}: Props) => {

    const { push } = useRouter();

    return visible ?
        <>
            <div className={styles.modalBackground}></div>
            <div className={
                receipt ? `${styles.modalRequest} ${styles.receipt}` : `${styles.modalRequest}`
            }>
                <div className={`${styles.header} display-flex space-between align`} >
                    <div className={`${styles.left} display-flex align`}>
                        <h3>Recibo</h3>
                        <button className={`${styles.expand} button-small display-flex align`} onClick={() => push("/1")}>
                            Expandir
                            <FontAwesomeIcon icon={faExpand} className={`icon__small cursor display-flex align rotat45`} />
                        </button>
                    </div>

                    <div className={`${styles.close} cursor`} onClick={onClose}>
                        <FontAwesomeIcon icon={faClose} className={`icon cursor display-flex align`} />
                    </div>
                </div>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </>
        : null
}

export default ModalRequest