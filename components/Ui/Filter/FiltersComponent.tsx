import React, { useState } from 'react';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../../../styles/Filters.module.scss';
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import ButtonSmall from '@/components/Buttons/ButtonSmall';

export type FilterSectionType = { value: string; label: string; icon?: IconDefinition };

export type FilterObject = {
    filter: string;
    value: string | number;
    label: string
};

export type FilterData = {
    type: string;
    data: FilterObject[];
    value?: string | number;
};


interface FiltersComponentInterface {
    open: boolean;
    filterSections: FilterSectionType[]; // This are the main filters.
    onOpenFilters: () => void;
    customRenders: Array<{ [key: string]: React.ReactNode }>;
}


export default function FiltersComponent({
    open,
    onOpenFilters,
    filterSections,
    customRenders,
}: FiltersComponentInterface) {

    const [subFilterSelected, setSubFilterSelected] = useState<FilterSectionType | null>(); // First menu

    const handleSelectFilterCategory = (filter: FilterSectionType) => {
        setSubFilterSelected(filter);
    };

    const handleBackToFiltersCategories = () => {
        setSubFilterSelected(null);
    };

    // Optional functions.
    const renderCustomFilters = (filter: FilterSectionType) => {
        if (!customRenders) return null;

        const customRender = customRenders.find((render) => render[filter.value]);
        return customRender ? customRender[filter.value] : null;
    };

    // First menu
    const renderMainMenuFilters = () => {
        return (
            <div className={styles.filterList}>
                {
                    filterSections.map((option, index) => (
                        <div
                            key={index}
                            className={styles.filterItem}
                            onClick={() => handleSelectFilterCategory(option)}
                        >
                            {option.icon && <FontAwesomeIcon icon={option.icon} className={styles.filterItem__icon} />}
                            <p>{option.label}</p>
                        </div>
                    ))
                }
            </div>
        )
    };

    // Second menu
    const renderSubFiltersMenu = () => {
        if (!subFilterSelected) return;
        return (
            <div className={styles.filterOptions}>

                {/* BACK */}
                <div className={styles.filterOptions__Header} onClick={handleBackToFiltersCategories}>
                    <button className={styles.backButton}>
                        <FontAwesomeIcon icon={faArrowLeft} className={`icon display-flex align`} />
                    </button>
                    <p>{subFilterSelected.label}</p>
                </div>

                {/*  FILTERS OF SECTION */}
                {renderCustomFilters(subFilterSelected)}
            </div>
        )
    }

    return (
        <div className={styles.filters}>

            <ButtonSmall
                text='Filtros'
                onClick={onOpenFilters}
                icon={faSliders}
                color='white'
                extraStyles={{ zIndex: open ? 9999 : 9 }}
            />

            {open && (
                <div className={styles.modalFilter}>
                    {
                        !subFilterSelected ? (
                            renderMainMenuFilters()
                        ) : (
                            renderSubFiltersMenu()
                        )}
                </div>
            )}
        </div>
    );
}