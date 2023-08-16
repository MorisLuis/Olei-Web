import React from 'react'
import styles from "../../styles/Components/Cards.module.scss";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCircleQuestion, faCartShopping, faFileInvoice } from '@fortawesome/free-solid-svg-icons';


const getFontAwesomeIcon = (iconName: string): IconProp => {
    switch (iconName) {
        case "faCircleQuestion":
            return faCircleQuestion;
        case "faCartShopping":
            return faCartShopping;
        case "faFileInvoice":
            return faFileInvoice;
        default:
            return faCircleQuestion;
    }
};

interface Props {
    children: any,
    title: string,
    icon?: string
}

export const MessageCard = ({
    children,
    title,
    icon = "faCircleQuestion"
}: Props) => {

    const iconDefinition = getFontAwesomeIcon(icon);


    return (
        <div className={styles.messageCard}>
            <div className={`${styles.icon} display-flex allCenter`}>
                <FontAwesomeIcon icon={iconDefinition} className={`icon`} />
            </div>
            <h2>{title}</h2>
            <div className={styles.paragraph}>
                {children}
            </div>
        </div>
    )
}
