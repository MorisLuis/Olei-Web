import FiltersInterface from "@/interfaces/filters"
import { FilterState } from "./FiltersProvider"


type FiltersActionType =
    { type: '[Filters] - LoadFilters from cookies | storage', payload: FiltersInterface | Partial<FiltersInterface> } |
    { type: '[Filters] - Update filters', payload: FiltersInterface | Partial<FiltersInterface> } |
    { type: '[Filters] - Update filtersValues', payload: [string, string][] } |
    { type: '[Filters] - Remove filter', payload: string } |
    { type: '[Filters] - Remove all filters', payload: FiltersInterface | Partial<FiltersInterface> }



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
            }

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
                    [action.payload]: action.payload === "enStock" ? false : undefined
                }
            }

        case '[Filters] - Remove all filters':
            return {
                ...state,
                filters: { ...action.payload }
            }

        default:
            return state;
    }
}