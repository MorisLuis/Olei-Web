import React from 'react';
import styles from "../../styles/UI.module.scss";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';


interface Props {
    children: any;
    color?: string;
    close?: boolean;
    onClose?: any;
    cursor?: boolean
}

export const Tag = ({
    children,
    color = "green",
    close = false,
    onClose,
    cursor = false
}: Props) => {
    return (
        <div className={cursor ? `${styles.tag} ${styles.option} display-flex align allCenter` : `${styles.tag} display-flex align`} onClick={onClose}>
            <div className={`${styles.content} ${styles[color]} display-flex allCenter`} style={{ fontWeight: "normal" }}>
                <p>
                    {children}
                </p>
                {
                    close &&
                    <FontAwesomeIcon icon={faClose} className="icon__small" />
                }
            </div>
        </div>
    );
};
