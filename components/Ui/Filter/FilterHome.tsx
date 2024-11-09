import React, { useContext, useState } from 'react'
import FiltersComponent, { FilterData } from './FiltersComponent'
import { FilterType } from '@/interfaces/filters';
import { api } from '@/api/api';
import { FiltersContext } from '@/context';
import Input from '@/components/Inputs/inputs';


export default function FilterHome() {

    const [openModal, setOpenModal] = useState(false);
    const { addFilters, filters } = useContext(FiltersContext);

    // Call API ( optional ).
    const getDataOfFilters = async (): Promise<FilterData[]> => {
        const { data: { Familias, Marca } } = await api.get("/api/tables");
        const filtersData: FilterData[] = [
            { type: 'Familia', data: Familias, value: filters.familia },
            { type: 'Marca', data: Marca, value: filters.marca },
        ];
        return filtersData;
    };

    // Submit filter.
    const onSelectFilterValue = (value: string, value2: string | undefined) => {
        if (!value) return;
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
            filters={Filters}
            onOpenFilters={() => setOpenModal(!openModal)}
            onSelectFilter={onSelectFilterValue}

            apiCall={getDataOfFilters}
            customFilters={CustumFilters}
            customRenders={CustumRenders}
        />
    )
}
