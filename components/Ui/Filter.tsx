import React, { Dispatch, useEffect, useState } from 'react';
import styles from "../../styles/UI.module.scss";

interface Props {
    visible: boolean;
    filterActive: any;
    setFilterActive: Dispatch<any>;
}

const Filter = ({ 
    visible,
    filterActive,
    setFilterActive
}: Props) => {

    const filters = [
        {
            filter: "Existencia",
            key: "1",
            options: [
                {
                    name: "Todos",
                    value: "Todos",
                    key: "1"
                },
                {
                    name: "Con Stock",
                    value: "Con Stock",
                    key: "2"
                }
            ]
        },
        {
            filter: "Otro",
            key: "2",
            options: [
                {
                    name: "Otros todos",
                    value: "Otros todos",
                    key: "1"
                },
                {
                    name: "otros stock",
                    value: "otros stock",
                    key: "2"
                }
            ]
        }
    ];

    const [titleActive, setTitleActive] = useState("Existencia");

    const activeFilterOptions = filters
        .filter(filter => titleActive.includes(filter.filter))
        .flatMap(filter => filter.options);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('activeFilters', JSON.stringify(filterActive));
        }
    }, [filterActive]);

    const handleFilterClick = (filter: string) => {
        if (filterActive.includes(filter)) {
            setFilterActive(filterActive.filter((item: any) => item !== filter));
        } else {
            setFilterActive([...filterActive, filter]);
        }
    };

    return visible ? (
        <div className={`${styles.filter} display-flex`}>
            <div className={styles.titles}>
                {filters.map(filter => (
                    <p
                        className={
                            titleActive === filter.filter
                                ? `${styles.titleOption} ${styles.active} cursor`
                                : `${styles.titleOption} cursor`
                        }
                        key={filter.key}
                        onClick={() => setTitleActive(filter.filter)}
                    >
                        {filter.filter}
                    </p>
                ))}
            </div>
            <div className={`${styles.options} display-flex column`}>
                {activeFilterOptions.map(option => (
                    <label htmlFor={option.name || "checkbox"} key={option.key} className="display-flex align">
                        <input
                            type="checkbox"
                            value={option.value}
                            onClick={() => handleFilterClick(option.name)}
                            checked={filterActive.includes(option.name)}
                        />
                        <p>{option.name}</p>
                    </label>
                ))}
            </div>
        </div>
    ) : null;
};

export default Filter;
