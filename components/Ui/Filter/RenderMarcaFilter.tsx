import React, { useContext, useEffect, useState } from 'react'
import { searchFamilia, searchMarcas } from '@/services/search';
import SelectReact, { OptionType } from '@/components/Inputs/select';
import { useRouter } from 'next/router';
import { FiltersContext } from '@/context';
import { ParsedUrlQuery } from 'querystring';
import { FiltersLabelType } from '@/interfaces/filters';
import Input from '@/components/Inputs/inputs';

interface handleQueryInterface {
    query: ParsedUrlQuery,
    entryLabel: FiltersLabelType,
    option: OptionType | null
};

export const handleQuery = ({ query, entryLabel, option }: handleQueryInterface): string => {
    // Función auxiliar para filtrar el query string
    const removeEntryFromQuery = (queryString: string, entryLabel: string): string => {
        return queryString
            .split('&')
            .filter((item) => !item.startsWith(entryLabel))
            .join('&');
    };

    // Convertir el query en una string sanitizada
    const sanitizedQuery: Record<string, string> = Object.fromEntries(
        Object.entries(query).map(([key, value]) => [
            key,
            Array.isArray(value) ? value.join(',') : value || '',
        ])
    );

    const queryString = new URLSearchParams(sanitizedQuery).toString();

    if (option === null || option.value === "null" || option.value === null) {
        const queryWithoutEntry = removeEntryFromQuery(queryString, entryLabel);
        return queryWithoutEntry ? `/products?${queryWithoutEntry}` : `/products`;
    }

    if (!queryString || sanitizedQuery[entryLabel]) {
        return `/products?${entryLabel}=${option.value}`;
    }

    return `/products?${queryString}&${entryLabel}=${option.value}`;
};

function RenderMarcaFilter() {

    const { filters } = useContext(FiltersContext);
    const [marcas, setMarcas] = useState<{ Nombre: string }[]>();
    const { push, query } = useRouter();

    const handleSearchMarcas = async (value: string) => {
        const dataMarcas = await searchMarcas(value);
        setMarcas(dataMarcas.marcas)
    };

    const handleChange = (option: OptionType) => {
        push(handleQuery({ query, entryLabel: 'Marca', option: option }))
    };

    useEffect(() => {
        handleSearchMarcas('')
    }, []);

    if (!marcas) {
        return (
            <div>
                <p>Cargando marcas...</p>
            </div>
        )
    };

    const optionsMarcas: OptionType[] = marcas?.map((item) => ({
        label: item.Nombre as string,
        value: item.Nombre
    }));

    return (
        <SelectReact
            options={optionsMarcas}
            name="Marcas"
            onChange={(option) =>
                handleChange(option)
            }
            value={
                optionsMarcas.find((item) => item.value === filters.marca) ??
                null
            }
            label="Selecciona el tipo de marcas"
        />
    )
};

function RenderCodigoFilter() {

    const { filters, addFilters } = useContext(FiltersContext);

    return (
        <Input
            label='Folio'
            name='folio'
            onChange={(value: string) => addFilters({ folio: value })}
            value={filters.folio as string}
        />
    )
};

function RenderFamiliaFilter() {

    const { filters } = useContext(FiltersContext);
    const [familias, setFamilias] = useState<{ Nombre: string }[]>();
    const { push, query } = useRouter();

    const handleSearchFamilia = async (value: string) => {
        const dataFamilia = await searchFamilia(value);
        setFamilias(dataFamilia.familias)
    };

    const handleChange = (option: OptionType) => {
        push(handleQuery({ query, entryLabel: 'Familia', option: option }))
    };

    useEffect(() => {
        handleSearchFamilia('')
    }, []);

    if (!familias) {
        return (
            <div>
                <p>Cargando clientes...</p>
            </div>
        )
    };

    const optionsFamilias: OptionType[] = familias?.map((item) => ({
        label: item.Nombre as string,
        value: item.Nombre
    }));

    return (
        <SelectReact
            options={optionsFamilias}
            name="Familias"
            onChange={(option) =>
                handleChange(option)
            }
            value={
                optionsFamilias.find((item) => item.value === filters.familia) ??
                null
            }
            label="Selecciona el tipo de familia"
        />
    )
}

export const CustumRender = () => {

    const CustumFilters = ['Marca', 'Codigo', "Familia"] as const;

    type CustomRenderKey = typeof CustumFilters[number];  // 'Date'
    type CustomRenderType = {
        [key in CustomRenderKey]?: React.ReactNode;
    };

    const CustumRenders: CustomRenderType[] = [
        {
            Marca: (
                <RenderMarcaFilter />
            )
        },
        {
            Codigo: (
                <RenderCodigoFilter />
            )
        },
        {
            Familia: (
                <RenderFamiliaFilter />
            )
        }
    ];

    return {
        CustumRenders
    };
};
