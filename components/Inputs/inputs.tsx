import React from 'react'

interface Props {
    label?: string,
    onChange?: (arg: string) => void,
    value: string,
    name: string
}

const Input = ({
    label,
    onChange,
    value,
    name
}: Props) => {
    
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        if (typeof onChange === 'function') {
            onChange(event.target.value);
        }
    }

    return (
        <div className='display-flex column'>
            <label htmlFor={name}>{label}</label>
            <input
                className="input"
                type="text"
                placeholder='Buscar...'
                onChange={(event) => handleOnChange(event)}
                value={value || ""}
            />
        </div>
    )
}

export default Input
