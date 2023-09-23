import Filter from "@/components/Ui/Filter";
import FiltersInterface from "@/interfaces/filters";
import { stat } from "fs";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useReducer, useState } from "react";
import { FiltersContext } from "./FiltersContext";
import { filtersReducer } from "./filtersReducer";

export interface FilterState {
    filtersValues: string[],
    filters: FiltersInterface | Partial<FiltersInterface>
}


const FILTERS_INITIAL_STATE: FilterState = {
    filters: {
        nombre: undefined,
        marca: undefined,
        familia: undefined,
        folio: undefined,
        enStock: false,
    },
    filtersValues: []
}

export const FiltersProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(filtersReducer, FILTERS_INITIAL_STATE);

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
        }
    }, []);

    useEffect(() => {
        const filterArray = [];
        const filtersItems = state.filters as any;
        console.log({filters: state.filters})
        for (const prop in filtersItems) {
            if (filtersItems[prop] !== null && filtersItems[prop] !== false && filtersItems[prop] !== undefined) {
                filterArray.push([prop, filtersItems[prop].toString()]);
            }
        }

        dispatch({ type: '[Filters] - Update filtersValues', payload: filterArray as string[] | [] })

    }, [state.filters]);


    useEffect(() => {
        Cookies.set('activeFilters', JSON.stringify(state.filters));
    }, [state]);

    const addFilters = (Filters: FiltersInterface | Partial<FiltersInterface>) => {
        console.log({Filters})
        dispatch({ type: '[Filters] - Update filters', payload: Filters });
    }

    const removeFilters = (partialFilter: Partial<FiltersInterface>) => {
        dispatch({ type: '[Filters] - Remove filter', payload: partialFilter })
    }

    const removeAllFilters = () => {
        dispatch({ type: '[Filters] - Remove all filters', payload: FILTERS_INITIAL_STATE.filters })
    }

    return (
        <FiltersContext.Provider value={{
            ...state,

            // Methods
            addFilters,
            removeFilters,
            removeAllFilters
        }}>
            {children}
        </FiltersContext.Provider>
    )
}