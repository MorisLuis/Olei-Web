import React, { useContext, useState } from 'react'
import FiltersComponent from './FiltersComponent'
import { FilterType } from '@/interfaces/filters';
import { api } from '@/api/api';
import { FiltersContext } from '@/context';
import Input from '@/components/Inputs/inputs';

export default function FilterHome() {

    const [openModal, setOpenModal] = useState(false);
    const { addFilters, filters } = useContext(FiltersContext);

    // Call API ( optional ).
    const getDataOfFilters = async (): Promise<Partial<Record<FilterType, string[]>>> => {
        const { data: { Familias, Marca } } = await api.get("/api/tables");
        return { Familia: Familias, Marca };
    };

    // Submit filter.
    const onSelectFilterValue = (value: string, value2: string) => {
        addFilters({ [value.toLowerCase()]: value2 })
    };

    // Special renders of filters ( optional ).
    const renderFolio = () => {
        return (
            <Input
                label='Folio'
                name='folio'
                onChange={(value: string) => addFilters({ folio: value })}
                value={filters.folio as string}
            />
        )
    };

    // Filter type.
    const Filters: FilterType[] = ['Marca', 'Folio', 'Familia'] // Filters

    // Select filters custum ( optional )
    const CustumFilters = ['Folio'] as const;
    type CustomRenderKey = FilterType & typeof CustumFilters[number];
    type CustomRenderType = {
        [key in CustomRenderKey]?: React.ReactNode;
    };

    const CustumRenders: CustomRenderType[] = [
        { Folio: renderFolio() },
    ];

    return (
        <FiltersComponent
            open={openModal}
            onClick={() => setOpenModal(!openModal)}
            apiCall={getDataOfFilters}
            filters={Filters}
            customFilters={CustumFilters}
            custumRenders={CustumRenders}
            onSelectFilter={onSelectFilterValue}
        />
    )
}
