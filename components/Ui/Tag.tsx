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
    color= "green", 
    close= false, 
    onClose,
    cursor= false
}: Props) => {
    return (
        <div className={cursor ? `${styles.tag} ${styles.option} display-flex align cursor` : `${styles.tag} display-flex align`} onClick={onClose}>
            <p className={`${styles.content} ${styles[color]} display-flex align text-ellipsis cursor`} style={{ fontWeight: "normal" }}>
                {children}
                {
                    close &&
                    <FontAwesomeIcon icon={faClose} className="icon__small cursor" />
                }
            </p>
        </div>
    );
};
