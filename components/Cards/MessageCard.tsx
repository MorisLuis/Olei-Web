import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import styles from "../../styles/Components/Cards.module.scss";

interface Props {
    children: any,
    title: string
}

export const MessageCard = ({ children, title }: Props) => {
    return (
        <div className={styles.messageCard}>
            <div className={`${styles.icon} display-flex allCenter`}>
                <FontAwesomeIcon icon={faCircleQuestion} className={`icon`} />
            </div>
            <h2>{title}</h2>
            <div className={styles.paragraph}>
                {children}
            </div>
        </div>
    )
}
