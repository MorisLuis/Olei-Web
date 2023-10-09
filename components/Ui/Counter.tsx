import React from 'react';
import styles from "../../styles/UI.module.scss";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';

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

        const sume = currentValue + value
        if(sume < 0) return;

        if (value === -1) {
            if (currentValue < 0) return;
            return updatedQuantity(currentValue - 1);
        }

        if (maxValue) {
            if (currentValue >= maxValue) {
                toast('Ya no hay mas existencias, de este producto!', {
                    position: "bottom-center",
                    style:{
                        backgroundColor:"#f9f9f9",
                        border:"1px solid #cacaca",
                        fontSize:"14px",
                        textAlign: "center"
                    },
                    icon: <span style={{ fontSize: '20px'}}>⚠️</span>,
                });
                return
            };
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
