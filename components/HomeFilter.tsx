import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import styles from "../styles/Pages/Products.module.scss";

import { Tag } from './Ui/Tag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import HomeFiltersSkeleton from './Skeletons/HomeFiltersSkeleton';
import { FiltersContext } from '@/context';
import ToggleSquareSwitch from './Inputs/toggleSquareSwitch';

interface Props {
    setOpenModalFilter: Dispatch<SetStateAction<boolean>>;
    showGrid: boolean;

    //Methods
    setShowGrid: any;
    handleCloseTag: (filter: any) => void;
    handleCleanAllFilters: () => void
}

const HomeFilter = ({
    handleCloseTag,
    showGrid,
    setShowGrid,
    setOpenModalFilter,
    handleCleanAllFilters,
}: Props) => {

    const { filtersValues, filters } = useContext(FiltersContext);

    const [visible, setVisible] = useState(false)

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
    }, [setShowGrid])


    return visible ? (
        <>
            {/* DESKTOP VERSION */}

            <div className={`${styles.header} display-flex`}>

                <div className={styles.view}>
                    <ToggleSquareSwitch
                        label='Vista :'
                        name="view"
                        value={showGrid}
                        onChange={(value : boolean) => {
                            console.log({value})
                            setShowGrid(value)
                        }}
                    />
                </div>

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

            {/* MOBIL VERSION */}
            {/* Search / Visible just in mobil version */}
            <div className={styles.filtersMobil}>

                {
                    filtersValues.length < 0 ?
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
                                <p className={`display-flex allCenter`}>{filtersValues.length}</p>
                            </div>
                        </div>
                }
            </div>
            {
                filters?.nombre && <h2 className={styles.nameFilterMobil}>{filters?.nombre}</h2>
            }
        </>
    )
        :
        <HomeFiltersSkeleton />

}

export default HomeFilter
