import FiltersInterface from '@/interfaces/filters';
import { createContext } from 'react';

interface ContextProps {
    filtersValues: string[];
    filters: FiltersInterface | Partial<FiltersInterface>;

    //Methods
    addFilters: (filters: FiltersInterface | Partial<FiltersInterface>) => void;
    removeFilters: (filters: any) => void;
    removeAllFilters: () => void;
}

export const FiltersContext = createContext({} as ContextProps );