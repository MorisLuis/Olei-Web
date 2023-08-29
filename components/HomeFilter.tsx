import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import styles from "../styles/Pages/Home.module.scss";

import FiltersInterface from '@/interfaces/filters';
import Cookies from 'js-cookie';
import { Tag } from './Ui/Tag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { SearchGlobal } from './Inputs/searchGlobal';
import { useRouter } from 'next/router';
import HomeFiltersSkeleton from './Skeletons/HomeFiltersSkeleton';
import { FiltersContext } from '@/context';

interface Props {
    filterState: FiltersInterface,
    setOpenModalFilter: Dispatch<SetStateAction<boolean>>

    //Methods
    handleCloseTag: (filter: any) => void,
}

const HomeFilter = ({
    filterState,
    handleCloseTag,
    setOpenModalFilter
}: Props) => {

    const { filtersValues, filters, removeAllFilters } = useContext(FiltersContext);

    const { pathname, push } = useRouter()
    const [visible, setVisible] = useState(false)

    const handleRemoveAllFilters = () => {
        removeAllFilters()
        push("/products")
    }

    useEffect(() => {
        setTimeout(() => {
            setVisible(true)
        }, 100);
    })


    return visible ? (
        <>
            {/* DESKTOP VERSION */}
            {
                filters?.nombre && <h1 className={styles.nameFilter}>{filters?.nombre}</h1>
            }

            <div className={`${styles.filters} display-flex`}>
                {
                    filtersValues.length < 0 ?
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
                                <p className={`display-flex allCenter`}>{filtersValues.length}</p>
                            </div>
                        </div>
                }

                <div className={styles.filtersTag}>
                    {
                        filtersValues.map((filter: any, Index) => (
                            <Tag key={Index} onClose={() => handleCloseTag(filter)} close cursor>
                                {filter[1] === "true" ? "En Stock" : filter[1]}
                            </Tag>
                        ))
                    }
                </div>
                <div className={styles.filtersTag}>
                    {
                        filtersValues.length > 0 ? <Tag close color='gray' onClose={handleRemoveAllFilters}>Limpiar filtros</Tag> : <></>
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
                            <SearchGlobal/>
                        </div>
                }

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
