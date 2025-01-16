import FiltersInterface from "@/interfaces/filters"
import { FILTERS_INITIAL_STATE, FilterState } from "./FiltersProvider"

type FiltersActionType =
    { type: '[Filters] - LoadFilters from cookies | storage', payload: FiltersInterface } |
    { type: '[Filters] - Update filters', payload: FiltersInterface | Partial<FiltersInterface> } |
    { type: '[Filters] - Update filtersValues', payload: [keyof FiltersInterface, string][] } |
    { type: '[Filters] - Remove filter', payload: keyof FiltersInterface } |
    { type: '[Filters] - Remove all filters' }


export const filtersReducer = (state: FilterState, action: FiltersActionType): FilterState => {

    switch (action.type) {

        case '[Filters] - LoadFilters from cookies | storage':
            return {
                ...state,
                filters: { ...action.payload }
            }

        case '[Filters] - Update filters':
            return {
                ...state,
                filters: { ...state.filters, ...action.payload }
            };

        case '[Filters] - Update filtersValues':
            return {
                ...state,
                filtersValues: [...action.payload]
            }

        case '[Filters] - Remove filter':
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [action.payload]: action.payload === "enStock" ? false : ''
                }
            }

        case '[Filters] - Remove all filters':
            return {
                ...state,
                filters: FILTERS_INITIAL_STATE.filters
            }

        default:
            return state;
    }
}