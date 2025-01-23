import React, { Dispatch, SetStateAction, useCallback, useContext, useEffect, useState } from 'react';
import { Tag } from './Ui/Tag';
import HomeFiltersSkeleton from './Skeletons/HomeFiltersSkeleton';
import { AuthContext, FiltersContext } from '@/context';
import ToggleSquareSwitch from './Inputs/toggleSquareSwitch';
import HomeSearch from './Search/HomeSearch';
import FilterHome from './Ui/Filter/FilterHome';
import { handleQuery } from './Ui/Filter/RenderMarcaFilter';
import { useRouter } from 'next/router';
import FiltersInterface, { FiltersLabelType, validFiltersLabel } from '@/interfaces/filters';
import styles from "../styles/Pages/Products.module.scss";

interface Props {
    showGrid: boolean;
    setShowGrid: Dispatch<SetStateAction<boolean>>;
}

const HomeHeader = ({
    showGrid,
    setShowGrid,
}: Props) => {

    const { removeFilter, filtersValues, removeAllFilters, filters} = useContext(FiltersContext);
    const { query, push } = useRouter()
    const { user } = useContext(AuthContext);
    const [visible, setVisible] = useState(false);
    const setGrid = useCallback(() => setShowGrid(showGrid), [setShowGrid, showGrid])

    const cleanFiltersRender = () => {
        return filtersValues.length > 0 && <Tag close cursor color='gray' onClose={removeAllFilters}>Limpiar filtros</Tag>
    }

    const handleDeleteFilter = (filter: [keyof FiltersInterface, string]) => {
        let result = filter[0].charAt(0).toUpperCase() + filter[0].slice(1);

        const isValidFilterLabel = (value: string): value is FiltersLabelType => {
            return validFiltersLabel.includes(value as FiltersLabelType);
        };

        if (!isValidFilterLabel(result)) return;

        const newQuery = handleQuery({
            query,
            option: null,
            entryLabel: result
        });

        push(newQuery)
        removeFilter(filter[0])
    }

    const tagsRender = () => {
        return (
            filtersValues.map((filter: [keyof FiltersInterface, string], Index: number) => (
                <Tag color='yellow' key={Index} onClose={() => handleDeleteFilter(filter)} close cursor>
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
    }, [showGrid, setShowGrid, setGrid])



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

export default HomeHeader
