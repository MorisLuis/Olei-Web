import React from 'react'

interface Props {
    label?: string,
    onChange?: any,
    value: string,
    name: string
}

const Input = ({
    label,
    onChange,
    value,
    name
}: Props) => {
    return (
        <div className='display-flex column'>
            <label htmlFor={name}>{label}</label>
            <input
                className="input"
                type="text"
                placeholder='Buscar...'
                onChange={(event) => {
                    if (typeof onChange === 'function') {
                        onChange(event.target.value);
                    }
                }}
                value={value || ""}
            />
        </div>
    )
}

export default Input
