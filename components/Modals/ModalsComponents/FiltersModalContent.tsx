import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { api } from '@/api/api';
import Input from '@/components/Inputs/inputs';
import SelectReact, { OptionType } from '@/components/Inputs/select';
import FiltersInterface from '@/interfaces/filters';
import Cookies from 'js-cookie';
import LabelInputSkeleton from '@/components/Skeletons/InputsSkeleton';
import { FiltersContext } from '@/context';

interface Props {
    visible: boolean
}

const FiltersModalContent = ({
    visible
}: Props) => {

    const [familiasFilter, setFamiliasFilter] = useState([]);
    const [marcasFilter, setMarcasFilter] = useState([]);
    const [loadFilters, setLoadFilters] = useState(true);
    const { addFilters, filters } = useContext(FiltersContext);

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

        setLoadFilters(false);
    }

    // Get the different Familias & Marcas from database.
    useEffect(() => {
        if (visible === false) return;
        getDataOfFilters()
    }, [visible]);

    if (loadFilters) {
        return (
            <>
                <LabelInputSkeleton />
                <LabelInputSkeleton />
                <LabelInputSkeleton />
            </>
        )
    };

    return (
        <div className='display-flex column gap__20'>
            <SelectReact
                options={familiasFilter?.map((familia) => ({
                    label: familia,
                    value: familia,
                }))}
                label='Familia'
                name='familia'
                value={
                    filters.familia
                        ? { value: filters.familia, label: filters.familia }
                        : null
                }
                onChange={(value: OptionType) => addFilters({ familia: value?.value })}
            />

            <SelectReact
                options={marcasFilter?.map((marca) => ({
                    label: marca,
                    value: marca,
                }))}
                label='Marca'
                name='marca'
                value={
                    filters.marca
                        ? { value: filters.marca, label: filters.marca }
                        : null
                }
                onChange={(value: OptionType) => addFilters({ marca: value?.value })}

            />

            <Input
                label='Folio'
                name='folio'
                onChange={(value: string) => addFilters({ folio: value })}
                value={filters.folio as string}
            />
        </div>
    )
}

export default FiltersModalContent
