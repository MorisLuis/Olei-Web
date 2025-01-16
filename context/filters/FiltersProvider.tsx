import FiltersInterface from "@/interfaces/filters";
import { useEffect, useReducer, useRef } from "react";
import { FiltersContext } from "./FiltersContext";
import { filtersReducer } from "./filtersReducer";
import useErrorHandler from "@/hooks/useErrorHandler";
import { useRouter } from "next/router";

export interface FilterState {
    filtersValues: [keyof FiltersInterface, string][],
    filters: FiltersInterface;
}


export const FILTERS_INITIAL_STATE: FilterState = {
    filters: {
        nombre: '',
        marca: '',
        familia: '',
        folio: '',
        enStock: false
    },
    filtersValues: []
}

export const FiltersProvider = ({ children }: { children: JSX.Element }) => {

    const [state, dispatch] = useReducer(filtersReducer, FILTERS_INITIAL_STATE);
    const { handleError } = useErrorHandler();
    const { query } = useRouter();

    const filtersReady = useRef(false);

    useEffect(() => {
        const filtersQuery: FiltersInterface = {
            nombre: query.Nombre ? String(query.Nombre) : '',
            familia: query.Familia ? String(query.Familia) : '',
            marca: query.Marca ? String(query.Marca) : '',
            folio: query.Folio ? String(query.Folio) : '',
            enStock: query.enStock === 'true' || false
        };

        // Verificar si hay cambios reales en los filtros
        const hasChanges = Object.entries(filtersQuery).some(
            ([key, value]) => state.filters[key as keyof FiltersInterface] !== value
        );

        if (hasChanges) {
            filtersReady.current = true; // Marca que los filtros han cambiado
            dispatch({ type: '[Filters] - Update filters', payload: filtersQuery });
        }
    }, [query]);

    useEffect(() => {
        if (filtersReady.current) {
            handleUpdateFiltersValues();
        }
    }, [state.filters]);

    const handleUpdateFiltersValues = ( ) => {
        // Filtrar y transformar los filtros válidos
        const filtersArray: [keyof FiltersInterface, string][] = Object.entries(state.filters)
            .filter(([_, value]) => value !== undefined && value !== false && value !== "")
            .map(([key, value]) => [key as keyof FiltersInterface, String(value)]);

        dispatch({ type: '[Filters] - Update filtersValues', payload: filtersArray });
        filtersReady.current = false; // Resetea el flag después de sincronizar
    }
    

    const addFilters = (Filters: FiltersInterface | Partial<FiltersInterface>) => {
        dispatch({ type: '[Filters] - Update filters', payload: Filters });
    };

    const removeFilter = (filter: keyof FiltersInterface) => {
        filtersReady.current = true;
        dispatch({ type: '[Filters] - Remove filter', payload: filter })
    };

    const removeAllFilters = () => {
        dispatch({ type: '[Filters] - Remove all filters' })
    };

    return (
        <FiltersContext.Provider value={{
            ...state,

            // Methods
            addFilters,
            removeFilter,
            removeAllFilters
        }}>
            {children}
        </FiltersContext.Provider>
    )
}