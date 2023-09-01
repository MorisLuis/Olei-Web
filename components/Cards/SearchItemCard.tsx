import React from 'react'
import styles from "../../styles/Components/Cards.module.scss";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

interface Props {
    productName: string,
    onclick: (value: string) => void
}

export const SearchItemCard = ({ productName, onclick }: Props) => {

    return (
        <div
            className={`${styles.searchItemCard} cursor display-flex align`}
            onClick={() => {
                onclick(productName)
            }}>
            <FontAwesomeIcon icon={faMagnifyingGlass} className={`icon__small`} style={{ zIndex: "99999999", marginRight: "0.75em" }} />
            <p>{productName}</p>
        </div>
    )
}
