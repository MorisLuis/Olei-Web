import React, { useEffect, useState } from 'react';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import ButtonSmall from '../../Buttons/ButtonSmall';
import styles from '../../../styles/Filters.module.scss';
import { FilterType } from '@/interfaces/filters';

export type FilterData = {
    type: FilterType;
    data: FilterType[];
    value?: string;
};

interface FiltersComponentInterface {
    open: boolean;
    filters: FilterType[];
    onOpenFilters: () => void;
    onSelectFilter: (arg1: string, arg2: string | undefined) => void;

    // Optional properties
    customFilters?: readonly string[];
    customRenders?: Array<{ [key: string]: React.ReactNode }>;
    apiCall?: () => Promise<FilterData[]>;
}


export default function FiltersComponent({
    open,
    onOpenFilters,
    apiCall,
    filters,
    customFilters,
    customRenders,
    onSelectFilter
}: FiltersComponentInterface) {

    const [selectedFilterCategory, setSelectedFilterCategory] = useState<string | null>(null); // First menu
    const [filterOptions, setFiltersOptions] = useState<FilterData[]>([]);
    const [filterOptionLocal, setFilterOptionLocal] = useState<string | undefined>()
    const filterOptionSelected = filterOptions.find(filterOption => filterOption.type === selectedFilterCategory);
    const filterOptionLabel = filterOptionSelected?.type as string;


    const handleSelectFilterCategory = (filter: string) => {
        setSelectedFilterCategory(filter);
    };

    const handleBackToFiltersCategories = () => {
        setSelectedFilterCategory(null);
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        const newValue = checked ? value : undefined;
        setFilterOptionLocal(newValue);
        onSelectFilter(filterOptionLabel, newValue);
    };

    // Optional functions.
    const renderCustomFilters = (filter: string) => {
        if (!customRenders) return null;

        const customRender = customRenders.find((render) => render[filter]);
        return customRender ? customRender[filter] : null;
    };

    const onGetDataFromAPI = async () => {
        if (!apiCall) return;

        try {
            const filtersFromAPI = await apiCall();
            setFiltersOptions(filtersFromAPI);
        } catch (error) {
            console.error("Error fetching filter data:", error);
        }
    };

    // First menu
    const renderMenuFilters = () => {
        return (
            <div className={styles.filterList}>
                <h4>Filtros Disponibles</h4>
                {filters.map((option, index) => (
                    <div
                        key={index}
                        className={styles.filterItem}
                        onClick={() => handleSelectFilterCategory(option)}
                    >
                        {option}
                    </div>
                ))}
            </div>
        )
    };

    const renderFilterSelectedOptions = () => {
        if (!selectedFilterCategory) return;
        return (
            <div className={styles.filterDetails}>
                <button onClick={handleBackToFiltersCategories} className={styles.backButton}>
                    Volver a filtros
                </button>
                <h3>{selectedFilterCategory}</h3>

                {
                    customFilters?.includes(selectedFilterCategory) ? (
                        renderCustomFilters(selectedFilterCategory)
                    ) : (
                        filterOptionSelected?.data.map((item, index) => (
                            <div key={index}>
                                <label>
                                    <input
                                        type="checkbox"
                                        id={filterOptionSelected.type}
                                        value={item}
                                        checked={filterOptionLocal === item}
                                        className={styles.filterItemDetail}
                                        onChange={handleCheckboxChange}
                                    />
                                    {item}
                                </label>
                            </div>
                        ))
                    )}
            </div>
        )
    }

    useEffect(() => {
        if (open) onGetDataFromAPI();
    }, [apiCall, open]);

    useEffect(() => {
        setFilterOptionLocal(filterOptionSelected?.value)
    }, [filterOptionSelected])

    return (
        <div className={styles.filters}>

            <ButtonSmall
                text='Filtros'
                onClick={onOpenFilters}
                icon={faSliders}
                color='white'
            />

            {open && (
                <div className={styles.modalFilter}>
                    {
                        !selectedFilterCategory ? (
                            renderMenuFilters()
                        ) : (
                            renderFilterSelectedOptions()
                        )}
                </div>
            )}
        </div>
    );
}