import FiltersInterface from '@/interfaces/filters';
import { createContext } from 'react';

interface ContextProps {
    filtersValues: [keyof FiltersInterface, string][];
    filters: FiltersInterface;

    //Methods
    addFilters: (filters: FiltersInterface | Partial<FiltersInterface>) => void;
    removeFilter: (filter: keyof FiltersInterface) => void;
    removeAllFilters: () => void;
}

export const FiltersContext = createContext({} as ContextProps );