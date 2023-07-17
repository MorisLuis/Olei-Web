import React from 'react';
import styles from "../../styles/UI.module.scss";

interface Props {
    children: any;
    color?: string 
}

export const Tag = ({ children, color = "red" }: Props) => {
    return (
        <p className={`${styles.tag} display-flex align`}>
            <span className={`${styles.content} ${styles[color]} text-ellipsis`} style={{fontWeight: "normal" }}>
                {children}
            </span>
        </p>
    );
};
