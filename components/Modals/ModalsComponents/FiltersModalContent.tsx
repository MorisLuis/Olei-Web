import SelectReact from '@/components/Inputs/select'
import ToggleSwitch from '@/components/Inputs/toggleSwitch'
import FiltersInterface from '@/interfaces/filters'
import { Studies } from '@/utils/studies'
import React, { useState } from 'react'

interface Props {
    handleFiltersToQuery: any,
    filterState: FiltersInterface
}


const FiltersModalContent = ({
    handleFiltersToQuery,
    filterState
}: Props) => {

    const [temporalFilters, setTemporalFilters] = useState<FiltersInterface>(filterState)

    return (
        <div>
            <div className='display-flex space-between mb-small'>
                <div>
                    <h3>Producto en stock</h3>
                    <p>Mostrar solo los productos que tienen stock disponibles hoy.</p>
                </div>
                <ToggleSwitch
                    name='stock'
                    initialState={temporalFilters?.noStock}
                    onChange={(value: boolean) => {
                        setTemporalFilters((prevState: FiltersInterface) => ({
                            ...prevState,
                            noStock: value
                        }))
                    }}
                />
            </div>

            <div className='divider'></div>
            <SelectReact
                options={Studies?.map((study) => ({
                    label: study?.name,
                    value: study?._id,
                }))}
                label="Marca"
                onChange={(value: string) => {
                    setTemporalFilters((prevState: FiltersInterface) => ({
                        ...prevState, //@ts-ignore
                        marca: value.label
                    }))
                }}
            />
            <SelectReact
                options={Studies?.map((study) => ({
                    label: study?.name,
                    value: study?._id,
                }))}
                label="Familia"
                onChange={(value: string) => {
                    setTemporalFilters((prevState: FiltersInterface) => ({
                        ...prevState,//@ts-ignore
                        familia: value.label
                    }))
                }}
            />
            <SelectReact
                options={Studies?.map((study) => ({
                    label: study?.name,
                    value: study?._id,
                }))}
                label="Folio"
                onChange={(value: string) => {
                    setTemporalFilters((prevState: FiltersInterface) => ({
                        ...prevState,//@ts-ignore
                        folio: value.label
                    }))
                }}
            />
            <button onClick={() => handleFiltersToQuery(temporalFilters)}>Filtrar</button>
        </div>
    )
}

export default FiltersModalContent
