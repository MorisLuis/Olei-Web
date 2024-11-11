import React, { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import styles from "../../styles/UI.module.scss";

interface Props {
    children: ReactNode;
    color?: "green" | "yellow" | "red" | "blue" | "gray";
    close?: boolean;
    onClose?: () => void;
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
        <div className={cursor ? `${styles.tag} ${styles.option}` : `${styles.tag}`} onClick={onClose}>
            <div className={`${styles.content} ${styles[color]}`}>
                <p> {children} </p>
                {close && <FontAwesomeIcon icon={faClose} className="icon__small" />}
            </div>
        </div>
    );
};
