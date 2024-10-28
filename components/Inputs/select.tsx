import React from 'react'
import Select, { StylesConfig } from 'react-select'

export type OptionType = {
    label: string
    value: string
}

interface Props {
    options: OptionType[],
    placeholder?: string,
    label?: string,
    onChange: (arg: OptionType) => void,
    value: OptionType | null
    name: string
}

const SelectReact = ({
    options,
    placeholder = "Buscar...",
    label,
    onChange,
    value,
    name
}: Props) => {

    const optionsWithNull = [
        { value: null, label: 'SIN VALOR' },
        ...options
    ];

    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <Select
                placeholder={placeholder}
                options={optionsWithNull}
                isClearable
                styles={customStyles}
                onChange={(value) => {
                    if (typeof onChange === 'function') {
                        onChange(value as OptionType);
                    }
                }}
                value={value}
            />
        </div>
    )
}

export default SelectReact

const customStyles: StylesConfig = {
    control: ({ isFocused }) => ({
        backgroundColor: "white",
        width: "100%",
        height: "40px",
        border: isFocused ? '1px solid #aaa' : '1px solid #ccc',
        borderRadius: "5px",
        display: "flex",
        fontSize: "14px",
        marginBottom: "1em"
    })
};