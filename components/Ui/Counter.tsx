import React from 'react';
import styles from "../../styles/UI.module.scss";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

interface Props {
    currentValue: number;
    maxValue?: number | null;

    // Methods
    updatedQuantity: (newValue: number) => void;
}

const Counter = ({
    currentValue,
    maxValue,
    updatedQuantity
}: Props) => {
    

    const addOrRemove = (value: number) => {

        if (value === -1) {
            if (currentValue < 0) return;
            return updatedQuantity(currentValue - 1);
        }

        if(maxValue){
            if (currentValue >= maxValue) return;
        }
        updatedQuantity(currentValue + 1);
    }

    return (
        <div className={`${styles.counter} display-flex space-between `}>
            <div
                className={
                    currentValue < 1 ? `${styles.action} cursor display-flex allCenter disabled` :
                        currentValue >= 1 ? `${styles.action} ${styles.active} cursor display-flex allCenter` :
                            `${styles.action} cursor display-flex allCenter`
                }
                onClick={() => addOrRemove(-1)}>
                <FontAwesomeIcon icon={faMinus} className={`icon__small`} />
            </div>
            <div className={`${styles.number} display-flex allCenter`}>
                {currentValue}
            </div>
            <div
                className={
                        currentValue >= 1 ? `${styles.action} ${styles.active} cursor display-flex allCenter` :
                            `${styles.action} cursor display-flex allCenter`
                } onClick={() => addOrRemove(+1)}>
                <FontAwesomeIcon icon={faPlus} className={`icon__small`} />
            </div>
        </div>
    )
}

export default Counter
