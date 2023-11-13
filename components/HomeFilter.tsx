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

interface Props {
    setOpenModalFilter: Dispatch<SetStateAction<boolean>>;
    showGrid: boolean;

    //Methods
    setShowGrid: any;
    setTemporalFilters: Dispatch<SetStateAction<FiltersInterface>>;
    //handleCloseTag: (filter: any) => void;
    handleCleanAllFilters: () => void
}

const HomeFilter = ({
    //handleCloseTag,
    showGrid,
    setShowGrid,
    setOpenModalFilter,
    setTemporalFilters,
    handleCleanAllFilters,
}: Props) => {

    const { addFilters, removeFilters, filters, removeAllFilters, filtersValues } = useContext(FiltersContext);
    const { user } = useContext(AuthContext);
    const { push, query } = useRouter()

    const [visible, setVisible] = useState(false);

    const handleCloseTag = (filter: string[]) => {

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
    }

    useEffect(() => {
        setTimeout(() => {
            setVisible(true)
        }, 100);
    })

    useEffect(() => {
        const setGrid = () => {
            setShowGrid(showGrid)
        }
        setGrid()
    }, [showGrid, setShowGrid])


    return visible ?
        <>
            {/* DESKTOP VERSION */}
            <div className={`${styles.header} display-flex`}>

                {
                    user?.SwImagenes ?
                        <div className={styles.view}>
                            <ToggleSquareSwitch
                                label='Vista :'
                                name="view"
                                value={showGrid}
                                onChange={(value: boolean) => {
                                    setShowGrid(value)
                                }}
                            />
                        </div>
                        :
                        <div></div>
                }


                <div className={styles.filters}>
                    <div className={styles.filtersTag}>
                        {
                            filtersValues.length > 0 ? <Tag close color='gray' onClose={handleCleanAllFilters}>Limpiar filtros</Tag> : <></>
                        }
                    </div>

                    <div className={styles.filtersTag}>
                        {
                            filtersValues.map((filter: any, Index) => (
                                <Tag color='yellow' key={Index} onClose={() => handleCloseTag(filter)} close cursor>
                                    {filter[1] === "true" ? "En Stock" : filter[1]}
                                </Tag>
                            ))
                        }
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
            </div>
        </>
        :
        <HomeFiltersSkeleton />

}

export default HomeFilter
