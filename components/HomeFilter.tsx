import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styles from "../styles/Pages/Home.module.scss";

import FiltersInterface from '@/interfaces/filters';
import Cookies from 'js-cookie';
import { Tag } from './Ui/Tag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { SearchGlobal } from './Inputs/searchGlobal';
import { useRouter } from 'next/router';
import HomeFiltersSkeleton from './Skeletons/HomeFiltersSkeleton';

interface Props {
    filterState: FiltersInterface,
    filtersActive: FiltersInterface,
    setFiltersActive: Dispatch<SetStateAction<FiltersInterface>>,
    setOpenModalFilter: Dispatch<SetStateAction<boolean>>

    //Methods
    handleCloseTag: (filter: any) => void,
}

const HomeFilter = ({
    filterState,
    setFiltersActive,
    filtersActive,
    handleCloseTag,
    setOpenModalFilter
}: Props) => {

    const { pathname } = useRouter()
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setVisible(true)
        }, 100);
    })

    // Retrieve the saved filters string from cookies.
    useEffect(() => {
        const savedFiltersString = Cookies.get('activeFilters');

        // Check if savedFiltersString is not undefined.
        // To avoid set cookies more than once and as undefined.
        if (savedFiltersString !== "undefined") {
            // If savedFiltersString is empty or falsy, no action is needed.
            if (!savedFiltersString) return;
            // Parse the saved filters string into a JavaScript object.
            const parsedFilters = JSON.parse(savedFiltersString);
            // Compare the parsed filters with the current filter state.
            const areFiltersEqual =
                parsedFilters.nombre === filterState.nombre &&
                parsedFilters.marca === filterState.marca &&
                parsedFilters.familia === filterState.familia &&
                parsedFilters.folio === filterState.folio &&
                parsedFilters.enStock === filterState.enStock;

            // If the parsed filters are equal to the current filter state, no action is needed.
            if (areFiltersEqual) return;

            const savedFilters: FiltersInterface = JSON.parse(savedFiltersString);
            setFiltersActive(savedFilters);
        }
    }, []);

    // Set filters to cookies, everytime filtersActive changed.
    useEffect(() => {
        Cookies.set('activeFilters', JSON.stringify(filtersActive));
    }, [filtersActive]);

    // Convert filtersActive in array of strings.
    const filterMapped = Object.entries(filtersActive)
        .filter((filter) => filter[1] !== null && filter[1] !== false)
        .map((filter) => filter[1] === true ? [filter[0], "En Stock"] : filter)

    return visible ? (
        <>
            {/* DESKTOP VERSION */}
            {
                filtersActive?.nombre && <h1 className={styles.nameFilter}>{filtersActive?.nombre}</h1>
            }

            <div className={`${styles.filters} display-flex`}>
                {
                    filterMapped.length < 0 ?
                        <div className={styles.buttonFilter}>
                            <button className={`button-small white display-flex align`} onClick={() => setOpenModalFilter(true)}>
                                <p>Filtros</p>
                                <FontAwesomeIcon icon={faSliders} className={`icon__small`} />
                            </button>
                        </div>
                        :
                        <div className={styles.buttonFilter}>
                            <button className={`button-small white display-flex align`} onClick={() => setOpenModalFilter(true)}>
                                <p>Filtros</p>
                                <FontAwesomeIcon icon={faSliders} className={`icon__small`} />
                            </button>
                            <div className={`${styles.filtersCount}`}>
                                <p className={`display-flex allCenter`}>{filterMapped.length}</p>
                            </div>
                        </div>
                }

                <div className={styles.filtersTag}>
                    {
                        filterMapped.map((filter: any, Index) => (
                            <Tag key={Index} onClose={() => handleCloseTag(filter)} close cursor>
                                {filter[1]}
                            </Tag>
                        ))
                    }
                </div>
                <div className={styles.filtersTag}>
                    {
                        filterMapped.length > 0 ? <Tag close color='gray' onClose={() => setFiltersActive(filterState)}>Limpiar filtros</Tag> : <></>
                    }
                </div>
            </div>


            {/* MOBIL VERSION */}
            {/* Search / Visible just in mobil version */}
            <div className={styles.filtersMobil}>
                {
                    pathname === "/cart" || /^\/profile\//.test(pathname) || pathname === "/profile" ?
                        <></> :
                        <div className={styles.search}>
                            <SearchGlobal filtersActive={filtersActive} setFiltersActive={setFiltersActive} />
                        </div>
                }

                {
                    filterMapped.length < 0 ?
                        <div className={styles.buttonFilter}>
                            <button className={`button-small white display-flex align`} onClick={() => setOpenModalFilter(true)}>
                                <FontAwesomeIcon icon={faSliders} className={`icon__small`} />
                            </button>
                        </div>
                        :
                        <div className={styles.buttonFilter}>
                            <button className={`button-small white display-flex align`} onClick={() => setOpenModalFilter(true)}>
                                <FontAwesomeIcon icon={faSliders} className={`icon__small`} />
                            </button>
                            <div className={`${styles.filtersCount}`}>
                                <p className={`display-flex allCenter`}>{filterMapped.length}</p>
                            </div>
                        </div>
                }
            </div>
            {
                filtersActive?.nombre && <h2 className={styles.nameFilterMobil}>{filtersActive?.nombre}</h2>
            }
        </>

    )
    :
    <HomeFiltersSkeleton/>

}

export default HomeFilter