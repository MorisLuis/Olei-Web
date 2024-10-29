import FiltersInterface from '@/interfaces/filters';
import { createContext } from 'react';

interface ContextProps {
    filtersValues: [string, string][];
    filters: FiltersInterface;

    //Methods
    addFilters: (filters: FiltersInterface | Partial<FiltersInterface>) => void;
    removeFilter: (filter: string) => void;
    removeAllFilters: () => void
}

export const FiltersContext = createContext({} as ContextProps );