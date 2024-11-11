import React, { CSSProperties } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface Props {
    value: string,
    name: string
    label?: string,
    onChange?: (arg: string) => void,
    extraStyles?: CSSProperties
    clearInput?: () => void
}

const Input = ({
    label,
    onChange,
    value,
    name,
    extraStyles,
    clearInput
}: Props) => {

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (typeof onChange === 'function') {
            onChange(event.target.value);
        }
    };

    return (
        <div className='inputComponent' style={extraStyles}>
            <label htmlFor={name}>{label}</label>
            <input
                type="text"
                placeholder='Buscar...'
                onChange={(event) => handleOnChange(event)}
                value={value || ""}
            />

            {(value !== "" && clearInput) && (
                <div
                    className="clearinput"
                    onClick={clearInput}
                >
                    <FontAwesomeIcon icon={faXmark} className="icon__small" style={{ zIndex: "99999999" }} />
                </div>
            )}
        </div>
    )
}

export default Input
