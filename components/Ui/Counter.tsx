import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import styles from "../../styles/UI.module.scss"

const Counter = () => {
    return (
        <div className={`${styles.counter} display-flex space-between `}>
            <span className={`${styles.action} cursor display-flex allCenter`} >
                
                <FontAwesomeIcon icon={faMinus} className={`icon__small`} />
            </span>
            <span className={`${styles.number} display-flex allCenter`}>
                0
            </span>
            <span className={`${styles.action} cursor display-flex allCenter`} >
                <FontAwesomeIcon icon={faPlus} className={`icon__small`} />
            </span>
        </div>
    )
}

export default Counter
