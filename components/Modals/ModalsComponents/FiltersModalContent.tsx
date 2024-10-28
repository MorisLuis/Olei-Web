import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { api } from '@/api/api';
import Input from '@/components/Inputs/inputs';
import SelectReact, { OptionType } from '@/components/Inputs/select';
import FiltersInterface from '@/interfaces/filters';
import Cookies from 'js-cookie';
import LabelInputSkeleton from '@/components/Skeletons/InputsSkeleton';

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

    const [familiasFilter, setFamiliasFilter] = useState([]);
    const [marcasFilter, setMarcasFilter] = useState([]);
    const [loadFilters, setLoadFilters] = useState(true);

    const getDataOfFilters = async () => {

        const { data: { Familias, Marca } } = await api.get("/api/tables")
        setFamiliasFilter(Familias)
        setMarcasFilter(Marca)
        const activeFilters = JSON.parse(Cookies.get("activeFilters")!);

        if (activeFilters && activeFilters.enStock === false) {
            setLoadFilters(false);
            return;
        }
        if (!JSON.parse(Cookies.get("activeFilters")!)) return;

        const { enStock, familia, folio, marca, nombre } = JSON.parse(Cookies.get("activeFilters")!)
        setTemporalFilters((prevState: FiltersInterface) => ({
            ...prevState,
            nombre: nombre ? nombre : undefined,
            enStock: enStock ? enStock : false,
            familia: familia,
            folio: folio,
            marca: marca
        }));
        setLoadFilters(false);
    }


    // Get the different Familias & Marcas from database.
    useEffect(() => {
        if (visible === false) return;
        getDataOfFilters()
    }, [visible, setTemporalFilters])

    return !loadFilters ? (
        <div>
            <SelectReact
                options={familiasFilter?.map((familia) => ({
                    label: familia,
                    value: familia,
                }))}
                label='Familia'
                name='familia'
                value={
                    temporalFilters.familia
                        ? { value: temporalFilters.familia, label: temporalFilters.familia }
                        : null
                }
                onChange={(value: OptionType) => {
                    setTemporalFilters((prevState: FiltersInterface) => ({
                        ...prevState,
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
                value={
                    temporalFilters.marca
                        ? { value: temporalFilters.marca, label: temporalFilters.marca }
                        : null
                }
                onChange={(value: OptionType) => {
                    setTemporalFilters((prevState: FiltersInterface) => ({
                        ...prevState,
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
    ) :
        <>
            <LabelInputSkeleton />
            <LabelInputSkeleton />
            <LabelInputSkeleton />
        </>
}

export default FiltersModalContent
