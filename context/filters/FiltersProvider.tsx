import FiltersInterface from "@/interfaces/filters";
import Cookies from "js-cookie";
import { useEffect, useReducer } from "react";
import { FiltersContext } from "./FiltersContext";
import { filtersReducer } from "./filtersReducer";
import useErrorHandler from "@/hooks/useErrorHandler";

export interface FilterState {
    filtersValues: [string, string][],
    filters: FiltersInterface;
}


export const FILTERS_INITIAL_STATE: FilterState = {
    filters: {
        nombre: undefined,
        marca: undefined,
        familia: undefined,
        folio: undefined,
        enStock: false
    },
    filtersValues: []
}

export const FiltersProvider = ({ children }: { children: JSX.Element }) => {

    const [state, dispatch] = useReducer(filtersReducer, FILTERS_INITIAL_STATE);
    const { handleError } = useErrorHandler();

    useEffect(() => {

        const savedFiltersString = Cookies.get('activeFilters');

        // Check if savedFiltersString is not undefined.
        // To avoid set cookies more than once and as undefined.
        if (savedFiltersString !== "undefined") {
            // If savedFiltersString is empty or falsy, no action is needed.
            if (!savedFiltersString) return;
            // Parse the saved filters string into a JavaScript object.
            const parsedFilters = JSON.parse(savedFiltersString);
            // Compare the parsed filters with the current filter state.
            const areFiltersEqual =
                parsedFilters.nombre === FILTERS_INITIAL_STATE.filters.nombre &&
                parsedFilters.marca === FILTERS_INITIAL_STATE.filters.marca &&
                parsedFilters.familia === FILTERS_INITIAL_STATE.filters.familia &&
                parsedFilters.folio === FILTERS_INITIAL_STATE.filters.folio &&
                parsedFilters.enStock === FILTERS_INITIAL_STATE.filters.enStock;

            // If the parsed filters are equal to the current filter state, no action is needed.
            if (areFiltersEqual) return;
        }

        try {
            const cookieFilters = Cookies.get('activeFilters') ? JSON.parse(Cookies.get('activeFilters')!) : []
            dispatch({ type: '[Filters] - LoadFilters from cookies | storage', payload: cookieFilters });
        } catch (error) {
            dispatch({ type: '[Filters] - LoadFilters from cookies | storage', payload: FILTERS_INITIAL_STATE.filters });
            handleError(error);
        }
    }, []);

    useEffect(() => {
        UpdatefiltersValues()
    }, [state.filters]);

    useEffect(() => {
        Cookies.set('activeFilters', JSON.stringify(state.filters));
    }, [state]);

    const UpdatefiltersValues = () => {
        const filtersArray: [string, string][] = Object.entries(state.filters)
            .filter(([_, value]) => value !== undefined && value !== false)
            .map(([key, value]) => [key, value as string]);

        dispatch({ type: '[Filters] - Update filtersValues', payload: filtersArray })
    };

    const addFilters = (Filters: FiltersInterface) => {
        dispatch({ type: '[Filters] - Update filters', payload: Filters });
    };

    const removeFilter = (filter: string) => {
        dispatch({ type: '[Filters] - Remove filter', payload: filter })
    };

    const removeAllFilters = () => {
        dispatch({ type: '[Filters] - Remove all filters', payload: FILTERS_INITIAL_STATE.filters })
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