import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { Tag } from './Ui/Tag';
import HomeFiltersSkeleton from './Skeletons/HomeFiltersSkeleton';
import { AuthContext, FiltersContext } from '@/context';
import ToggleSquareSwitch from './Inputs/toggleSquareSwitch';
import HomeSearch from './Search/HomeSearch';
import FilterHome from './Ui/Filter/FilterHome';
import styles from "../styles/Pages/Products.module.scss";

interface Props {
    showGrid: boolean;
    setShowGrid: Dispatch<SetStateAction<boolean>>;
}

const HomeFilter = ({
    showGrid,
    setShowGrid,
}: Props) => {

    const { removeFilter, filtersValues, removeAllFilters } = useContext(FiltersContext);
    const { user } = useContext(AuthContext);
    const [visible, setVisible] = useState(false);
    const setGrid = () => setShowGrid(showGrid)

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
        <div className={styles.header}>

            <div className={styles.header__container}>
                <HomeSearch />

                <div className={styles.rightContent}>

                    <div className={styles.filtersTag}>
                        {tagsRender()}
                        <FilterHome />
                    </div>

                    {
                        user?.SwImagenes &&
                        <ToggleSquareSwitch
                            name="view"
                            value={showGrid}
                            onChange={(value: boolean) => setShowGrid(value)}
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default HomeFilter
