import FiltersInterface from '@/interfaces/filters';
import { createContext } from 'react';

interface ContextProps {
    filtersValues: string[];
    filters: FiltersInterface;

    //Methods
    addFilters: (filters: FiltersInterface) => void;
    removeFilters: (filters: any) => void;
    removeAllFilters: () => void;
}

export const FiltersContext = createContext({} as ContextProps );