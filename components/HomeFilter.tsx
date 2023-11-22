import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import styles from "../styles/Pages/Products.module.scss";

import { Tag } from './Ui/Tag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import HomeFiltersSkeleton from './Skeletons/HomeFiltersSkeleton';
import { AuthContext, FiltersContext } from '@/context';
import ToggleSquareSwitch from './Inputs/toggleSquareSwitch';
import FiltersInterface from '@/interfaces/filters';
import QueryParams from '@/utils/queryParams';
import { useRouter } from 'next/router';
import HomeSearch from './Search/HomeSearch';

interface Props {
    showGrid: boolean;
    setOpenModalFilter: Dispatch<SetStateAction<boolean>>;
    setShowGrid: Dispatch<SetStateAction<boolean>>;
    setLoadingData: Dispatch<SetStateAction<boolean>>,
    setTemporalFilters: Dispatch<SetStateAction<FiltersInterface>>;
    handleCleanAllFilters: () => void
}

const HomeFilter = ({
    showGrid,
    setShowGrid,
    setOpenModalFilter,
    setTemporalFilters,
    setLoadingData,
    handleCleanAllFilters,
}: Props) => {

    const { removeFilters, filters, filtersValues } = useContext(FiltersContext);
    const { user } = useContext(AuthContext);
    const { push } = useRouter();
    const [visible, setVisible] = useState(false);

    const handleCloseTag = (filter: string[]) => {
        setLoadingData(false)
        removeFilters({
            [filter[0]]: filter[1]
        })

        setTemporalFilters((prevState: FiltersInterface) => ({
            ...prevState,
            [filter[0]]: filter[1] === "true" ? false : undefined
        }))

        const queryParams = {
            nombre: filter[0] === "nombre" ? undefined : filters.nombre,
            marca: filter[0] === "marca" ? null : filters.marca,
            familia: filter[0] === "familia" ? null : filters.familia,
            folio: filter[0] === "folio" ? null : filters.folio,
            enStock: filter[0] === "enStock" ? false : filters.enStock,
        }

        const handleQueryParams = QueryParams();
        let url = handleQueryParams({ queryParams });
        push(url)
        setLoadingData(true)
    }


    // Renders
    const cleanFiltersRender = () => {
        return filtersValues.length > 0 ? <Tag close color='gray' onClose={handleCleanAllFilters}>Limpiar filtros</Tag> : <></>
    }

    const tagsRender = () => {
        return (
            filtersValues.map((filter: any, Index) => (
                <Tag color='yellow' key={Index} onClose={() => handleCloseTag(filter)} close cursor>
                    {filter[1] === "true" ? "En Stock" : filter[1]}
                </Tag>
            ))
        )
    }


    useEffect(() => {
        setTimeout(() => {
            setVisible(true)
        }, 100);
    }, [])

    useEffect(() => {
        const setGrid = () => {
            setShowGrid(showGrid)
        }
        setGrid()
    }, [showGrid, setShowGrid])



    return visible ?
        <>
            {/* DESKTOP VERSION */}
            <div className={`${styles.header}`}>

                <p className={styles.company}>{user?.Company}</p>

                <div className={`${styles.container} display-flex`}>

                    <HomeSearch
                        setTemporalFilters={setTemporalFilters}
                        setLoadingData={setLoadingData}
                    />

                    <div className={`${styles.rightContent} display-flex`}>

                        <div className={styles.filters}>
                            <div className={styles.filtersTag}>
                                {cleanFiltersRender()}
                            </div>

                            <div className={styles.filtersTag}>
                                {tagsRender()}
                            </div>

                            {
                                filtersValues.length <= 0 ?
                                    <div className={styles.buttonFilter}>
                                        <button className={`button-small white display-flex align`} onClick={() => setOpenModalFilter(true)}>
                                            <p>Filtros</p>
                                            <FontAwesomeIcon icon={faSliders} className={`icon__small`} />
                                        </button>
                                    </div>
                                    :
                                    <div className={`${styles.buttonFilter} ${styles.active}`}>
                                        <button className={`button-small white display-flex align`} onClick={() => setOpenModalFilter(true)}>
                                            <p>Filtros</p>
                                            <FontAwesomeIcon icon={faSliders} className={`icon__small`} />
                                        </button>
                                        <div className={`${styles.filtersCount}`}>
                                            <p className={`display-flex allCenter`}>{filtersValues.length}</p>
                                        </div>
                                    </div>
                            }
                        </div>

                        {
                            user?.SwImagenes ?
                                <div className={styles.view}>
                                    <ToggleSquareSwitch
                                        label=''
                                        name="view"
                                        value={showGrid}
                                        onChange={(value: boolean) => {
                                            setShowGrid(value)
                                        }}
                                    />
                                </div>
                                :
                                null
                        }
                    </div>
                </div>
            </div>
        </>
        :
        <HomeFiltersSkeleton />

}

export default HomeFilter
