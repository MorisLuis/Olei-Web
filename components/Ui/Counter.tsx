import React, { forwardRef, useRef } from 'react';
import styles from "../../styles/UI.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

interface CounterInterface {
    counter: number;
    setCounter: React.Dispatch<React.SetStateAction<number>> | ((value: number) => void);
    unit?: string
}

const Counter = forwardRef<HTMLInputElement, CounterInterface>(({
    counter,
    setCounter,
    unit
}, ref) => {

    const inputRef = useRef<HTMLInputElement>(null);

    const addProduct = () => {
        setCounter(Number(counter) + 1);
    };

    const handleInputChange = (value: string) => {
        let numericValue;
        const normalizedValue = value.replace(',', '.');
        const decimalCount = (normalizedValue.match(/\./g) || []).length;

        if (decimalCount > 1) return;

        if (value.endsWith('.')) {
            numericValue = Number(value.concat("1"));
        } else {
            numericValue = Number(value);
        }

        setCounter(numericValue);
    };

    const subtractProduct = () => {
        if (counter <= 0) return;
        setCounter(Number(counter) - 1);
    };

    const modifyUnit = () => {
        let unitModified = unit?.trim();
        if (unitModified === "PIEZA") {
            unitModified = "PZA";
        }
        return unitModified;
    };

    return (
        <div className={styles.counter} id="counter">
            <div
                className={
                    counter < 1 ? `${styles.action} disabled` :
                        counter >= 1 ? `${styles.action} ${styles.active}` :
                            `${styles.action} cursor`
                }
                onClick={subtractProduct}>
                <FontAwesomeIcon icon={faMinus} className={`icon__small`} />
            </div>

            <div onClick={() => inputRef.current?.focus()}>
                <input
                    ref={ref}
                    value={counter.toString()}
                    onChange={(e) => handleInputChange(e.target.value)}
                    type="text"
                    className={styles.number}
                />
                {unit && <span>{modifyUnit()}</span>}
            </div>


            <div
                className={
                    counter >= 1 ? `${styles.action} ${styles.active} cursor display-flex allCenter` :
                        `${styles.action} cursor display-flex allCenter`
                }
                onClick={addProduct}>
                <FontAwesomeIcon icon={faPlus} className={`icon__small`} />
            </div>
        </div>
    );
});

Counter.displayName = 'Counter'
export default Counter;
