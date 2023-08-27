import React from 'react'
import styles from "../../styles/UI.module.scss";

interface Props {
    text: string
}

const TagHover = ({
    text
}: Props) => {
    return (
        <div
            className={styles.tagHover}
        >
            <p>{text}</p>
        </div>
    )
}

export default TagHover
