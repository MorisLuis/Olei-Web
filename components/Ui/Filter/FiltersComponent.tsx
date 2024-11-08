import React, { useEffect, useState } from 'react';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import ButtonSmall from '../../Buttons/ButtonSmall';
import styles from '../../../styles/Filters.module.scss';

interface FiltersComponentInterface {
    open: boolean;
    onClick: () => void;
    filters: string[];
    customFilters?: readonly string[];
    custumRenders?: Array<{ [key: string]: React.ReactNode }>;
    apiCall?: () => Promise<{ [key: string]: string[] }>;
    onSelectFilter: (arg1: string, arg2: string) => void;
}

export default function FiltersComponent({
    open,
    onClick,
    apiCall,
    filters,
    customFilters,
    custumRenders,
    onSelectFilter
}: FiltersComponentInterface) {
    const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
    const [options, setOptions] = useState<{ [key: string]: string[] }>({});

    const handleSelectFilter = (filter: string) => {
        setSelectedFilter(filter);
    };

    const handleBackToFilters = () => {
        setSelectedFilter(null);
    };

    const onGetDataFromAPI = async () => {
        if (!apiCall) return;

        try {
            const result = await apiCall();
            setOptions(result);
        } catch (error) {
            console.error("Error fetching filter data:", error);
        }
    };

    const renderCustomFilter = (filter: string) => {
        const customRender = custumRenders?.find(render => render[filter]);
        return customRender ? customRender[filter] : null;
    };

    useEffect(() => {
        if (open) onGetDataFromAPI();
    }, [apiCall, open]);

    return (
        <div className={styles.filters}>
            <div className={styles.buttonFilter}>
                <ButtonSmall
                    text='Filtros'
                    onClick={onClick}
                    icon={faSliders}
                />
            </div>

            {open && (
                <div className={styles.modalFilter}>
                    {!selectedFilter ? (
                        <div className={styles.filterList}>
                            <h4>Filtros Disponibles</h4>
                            {filters.map((filter, index) => (
                                <div
                                    key={index}
                                    className={styles.filterItem}
                                    onClick={() => handleSelectFilter(filter)}
                                >
                                    {filter}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={styles.filterDetails}>
                            <button onClick={handleBackToFilters} className={styles.backButton}>
                                Volver a filtros
                            </button>
                            <h3>{selectedFilter}</h3>

                            {customFilters?.includes(selectedFilter) ? (
                                renderCustomFilter(selectedFilter)
                            ) : (
                                options[selectedFilter]?.map((item, index) => (
                                    <div key={index}>
                                        <label>
                                            <input type="checkbox" id="cbox1" value="first_checkbox" className={styles.filterItemDetail} onChange={() => onSelectFilter(selectedFilter, item)}/>
                                            {item}
                                        </label>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}