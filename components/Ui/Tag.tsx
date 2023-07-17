import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

import styles from "../../styles/UI.module.scss";

interface Props {
    children: any;
    color?: string;
    close?: boolean;
    onClose?: any;
    cursor?: boolean
}

export const Tag = ({ 
    children, 
    color= "red", 
    close= false, 
    onClose,
    cursor= false
}: Props) => {
    return (
        <p className={cursor ? `${styles.tag} ${styles.option} display-flex align cursor` : `${styles.tag} display-flex align`} onClick={onClose}>
            <span className={`${styles.content} ${styles[color]} display-flex align text-ellipsis`} style={{ fontWeight: "normal" }}>
                {children}
                {
                    close &&
                    <FontAwesomeIcon icon={faClose} className="icon__small cursor" />
                }
            </span>
        </p>
    );
};
