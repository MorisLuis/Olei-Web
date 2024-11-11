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
                className='select'
                onChange={(value) => {
                    if (typeof onChange === 'function') {
                        onChange(value as OptionType);
                    }
                }}
                value={value}
                styles={customStyles}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                        ...theme.colors,
                        primary25: '#F9FAFA',
                        primary: '#EDBD42',
                    },
                })}
            />
        </div>
    )
}

export default SelectReact

const customStyles: StylesConfig = {
    control: () => ({
        width: "100%",
        display: "flex",
        color: "white"
    })
};