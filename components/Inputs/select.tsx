import React from 'react'
import Select, { StylesConfig } from 'react-select'

export type OptionType = {
    label: string
    value: string | number
}

interface Props {
    options: OptionType[],
    onChange: (arg: OptionType) => void,
    value: OptionType | null
    name: string
    placeholder?: string,
    label?: string,
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
        { value: null, label: 'Sin valor' },
        ...options
    ];

    return (
        <div>
            <label htmlFor={name} className='label'>{label}</label>
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
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary25: '#F9FAFA',
                        primary: '#1C3873',
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
        color: "white",
    })
};