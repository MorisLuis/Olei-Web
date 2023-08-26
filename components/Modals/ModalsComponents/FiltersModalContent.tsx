import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { api } from '@/api/api';
import Input from '@/components/Inputs/inputs';
import SelectReact from '@/components/Inputs/select';
import ToggleSwitch from '@/components/Inputs/toggleSwitch';
import FiltersInterface from '@/interfaces/filters';
import Cookies from 'js-cookie';

interface Props {
    setTemporalFilters: Dispatch<SetStateAction<FiltersInterface>>,
    temporalFilters: FiltersInterface,
    visible: boolean
}

const FiltersModalContent = ({
    setTemporalFilters,
    temporalFilters,
    visible
}: Props) => {

    const [familiasFilter, setFamiliasFilter] = useState([])
    const [marcasFilter, setMarcasFilter] = useState([])

    
    // Get the different Familias & Marcas from database.
    useEffect(() => {
        if (visible === false) return;

        const fetchTable = async () => {
            const { data: { Familias, Marca } } = await api.get("/api/tables")
            setFamiliasFilter(Familias)
            setMarcasFilter(Marca)

            const { enStock, familia, folio, marca } = JSON.parse(Cookies.get("activeFilters")!)
            setTemporalFilters((prevState: FiltersInterface) => ({
                ...prevState,
                enStock: enStock,
                familia: familia,
                folio: folio,
                marca: marca
            }))
        }

        fetchTable()

    }, [visible])



    return (
        <div>
            <div className='display-flex space-between mb-small'>
                <div>
                    <h3>Producto en stock</h3>
                    <p>Mostrar solo los productos que tienen stock disponibles hoy.</p>
                </div>
                <ToggleSwitch
                    name='stock'
                    initialState={temporalFilters?.enStock}
                    value={temporalFilters.enStock}
                    onChange={(value: boolean) => {
                        setTemporalFilters((prevState: FiltersInterface) => ({
                            ...prevState,
                            enStock: value
                        }))
                    }}
                />
            </div>

            <div className='divider'></div>

            <SelectReact
                options={familiasFilter?.map((familia) => ({
                    label: familia,
                    value: familia,
                }))}
                label="Familia"
                value={temporalFilters.familia && { value: temporalFilters.familia, label: temporalFilters.familia }}
                onChange={(value: string) => {
                    setTemporalFilters((prevState: FiltersInterface) => ({
                        ...prevState, //@ts-ignore
                        familia: value.value
                    }))
                }}
            />
            <SelectReact
                options={marcasFilter?.map((marca) => ({
                    label: marca,
                    value: marca,
                }))}
                label="Marca"
                value={temporalFilters.marca && { value: temporalFilters.marca, label: temporalFilters.marca }}
                onChange={(value: string) => {
                    setTemporalFilters((prevState: FiltersInterface) => ({
                        ...prevState, //@ts-ignore
                        marca: value.values
                    }))
                }}
            />
            <Input
                label="Folio"
                onChange={(value: string) => {
                    setTemporalFilters((prevState: FiltersInterface) => ({
                        ...prevState,
                        folio: value !== "" ? value : null
                    }))
                }}
                value={temporalFilters.folio as string}
            />
        </div>
    )
}

export default FiltersModalContent
