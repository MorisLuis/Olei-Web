import React from 'react'
import Select, { StylesConfig } from 'react-select'

interface Props {
    options: any,
    placeholder?: string,
    label?: string,
    onChange: any
}

const SelectReact = ({
    options,
    placeholder = "Buscar...",
    label,
    onChange
}: Props) => {

    return (
        <div>
            <label htmlFor="Categoria">{label}</label>
            <Select
                placeholder={placeholder}
                options={options}
                isClearable
                styles={customStyles}
                onChange={(value) => {
                    if (typeof onChange === 'function') {
                        onChange(value);
                    }
                }}
            />
        </div>
    )
}

export default SelectReact

const customStyles: StylesConfig = {
    control: ({ isDisabled, isFocused }) => ({
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