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


    console.log({temporalFilters})
    // Get the different Familias & Marcas from database.
    useEffect(() => {
        if (visible === false) return;

        const fetchTable = async () => {
            const { data: { Familias, Marca } } = await api.get("/api/tables")
            setFamiliasFilter(Familias)
            setMarcasFilter(Marca)

            const activeFilters = JSON.parse(Cookies.get("activeFilters")!);
            if (activeFilters && activeFilters.enStock === false) return
            
            if (!JSON.parse(Cookies.get("activeFilters")!)) return;

            const { enStock, familia, folio, marca, nombre } = JSON.parse(Cookies.get("activeFilters")!)

            setTemporalFilters((prevState: FiltersInterface) => ({
                ...prevState,
                nombre: nombre ? nombre : undefined,
                enStock: enStock ? enStock : false,
                familia: familia,
                folio: folio,
                marca: marca
            }))
        }
        fetchTable()

    }, [visible, setTemporalFilters])


    return (
        <div>
            <div className='display-flex space-between mb-small'>
                <div>
                    <h3>Producto en stock</h3>
                    <p>Mostrar solo los productos que tienen stock disponibles hoy.</p>
                </div>
                <ToggleSwitch
                    name='enStock'
                    value={temporalFilters.enStock}
                    onChange={(value: boolean) => {
                        setTemporalFilters((prevState: FiltersInterface) => ({
                            ...prevState,
                            enStock: value || false
                        }))
                        console.log({ value })
                    }}
                />
            </div>

            <div className='divider'></div>

            <SelectReact
                options={familiasFilter?.map((familia) => ({
                    label: familia,
                    value: familia,
                }))}
                label='Familia'
                name='familia'
                value={temporalFilters.familia && { value: temporalFilters.familia, label: temporalFilters.familia }}
                onChange={(value: string) => {
                    setTemporalFilters((prevState: FiltersInterface) => ({
                        ...prevState, //@ts-ignore
                        familia: value?.value
                    }))
                }}
            />
            <SelectReact
                options={marcasFilter?.map((marca) => ({
                    label: marca,
                    value: marca,
                }))}
                label='Marca'
                name='marca'
                value={temporalFilters.marca && { value: temporalFilters.marca, label: temporalFilters.marca }}
                onChange={(value: string) => {
                    setTemporalFilters((prevState: FiltersInterface) => ({
                        ...prevState, //@ts-ignore
                        marca: value?.value
                    }))
                }}
            />
            <Input
                label='Folio'
                name='folio'
                onChange={(value: string) => {
                    setTemporalFilters((prevState: FiltersInterface) => ({
                        ...prevState,
                        folio: value !== "" ? value : ""
                    }))
                }}
                value={temporalFilters.folio as string}
            />
        </div>
    )
}

export default FiltersModalContent
