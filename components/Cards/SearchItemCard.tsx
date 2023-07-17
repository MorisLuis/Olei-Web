import React from 'react'
import styles from "../../styles/Components/Cards.module.scss";

interface Props {
    productName: string,
    onclick: (value: string) => void
}

export const SearchItemCard = ({ productName, onclick }: Props) => {

    return (
        <div
            className={`${styles.searchItemCard} cursor`}
            onClick={() => {
                onclick(productName)
            }}>
            <p>{productName}</p>
        </div>
    )
}
