import FiltersInterface from "@/interfaces/filters"
import { FilterState } from "./FiltersProvider"


type FiltersActionType =
    { type: '[Filters] - LoadFilters from cookies | storage', payload: FiltersInterface | Partial<FiltersInterface> } |
    { type: '[Filters] - Update filters', payload: FiltersInterface | Partial<FiltersInterface> } |
    { type: '[Filters] - Remove filter', payload: Partial<FiltersInterface> | Partial<FiltersInterface>} |
    { type: '[Filters] - Update filtersValues', payload: string[] } |
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
                filters: { ...action.payload }
            }

        case '[Filters] - Remove filter':
            const updatedState: FiltersInterface | Partial<FiltersInterface>= {
                ...state.filters,
                ...action.payload,
            };

            if (action.payload.marca) {
                updatedState.marca = null;
            } else if (action.payload.familia) {
                updatedState.familia = null
            } else if (action.payload.folio) {
                updatedState.folio = null
            } else if (action.payload.nombre) {
                updatedState.nombre = null
            } else {
                updatedState.enStock = false
            }

            return { ...state, filters: updatedState };


        case '[Filters] - Update filtersValues':
            return {
                ...state,
                filtersValues: [...action.payload]
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