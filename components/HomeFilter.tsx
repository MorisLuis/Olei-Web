import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import styles from "../styles/Pages/Products.module.scss";

import { Tag } from './Ui/Tag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import HomeFiltersSkeleton from './Skeletons/HomeFiltersSkeleton';
import { AuthContext, FiltersContext } from '@/context';
import ToggleSquareSwitch from './Inputs/toggleSquareSwitch';
import HomeSearch from './Search/HomeSearch';
import ButtonSmall from './Buttons/ButtonSmall';

interface Props {
    showGrid: boolean;
    setOpenModalFilter: Dispatch<SetStateAction<boolean>>;
    setShowGrid: Dispatch<SetStateAction<boolean>>;
    setLoadingData: Dispatch<SetStateAction<boolean>>;
}

const HomeFilter = ({
    showGrid,
    setShowGrid,
    setOpenModalFilter,
    setLoadingData,
}: Props) => {

    const { removeFilter, filtersValues, removeAllFilters } = useContext(FiltersContext);
    const { user } = useContext(AuthContext);
    const [visible, setVisible] = useState(false);

    const cleanFiltersRender = () => {
        return filtersValues.length > 0 && <Tag close cursor color='gray' onClose={removeAllFilters}>Limpiar filtros</Tag>
    }

    const tagsRender = () => {
        return (
            filtersValues.map((filter: string[], Index: number) => (
                <Tag color='yellow' key={Index} onClose={() => removeFilter(filter[0])} close cursor>
                    {filter[1] === "true" ? "En Stock" : filter[1]}
                </Tag>
            ))
        )
    };

    const setGrid = () => setShowGrid(showGrid)

    useEffect(() => {
        setTimeout(() => {
            setVisible(true)
        }, 100);
    }, [])

    useEffect(() => {
        setGrid()
    }, [showGrid, setShowGrid])

    if (!visible) return <HomeFiltersSkeleton />

    return (
        <div className={`${styles.header}`}>

            <div className={`${styles.container} display-flex`}>
                <HomeSearch setLoadingData={setLoadingData} />

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
                                    <ButtonSmall
                                        text='Filtros'
                                        onClick={() => setOpenModalFilter(true)}
                                        icon={faSliders}
                                    />
                                </div>
                                :
                                <div className={`${styles.buttonFilter} ${styles.active}`}>
                                    <ButtonSmall
                                        text='Filtros'
                                        onClick={() => setOpenModalFilter(true)}
                                        icon={faSliders}
                                    />
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
    )
}

export default HomeFilter
