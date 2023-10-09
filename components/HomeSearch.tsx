import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from "../styles/Pages/Products.module.scss";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FiltersContext } from '@/context';
import { useRouter } from 'next/router';
import FiltersInterface from '@/interfaces/filters';
import QueryParams from '@/utils/queryParams';
import { api } from '@/api/api';
import { Tag } from './Ui/Tag';
import { SearchItemCard } from './Cards/SearchItemCard';

const HomeSearch = ({
    setTemporalFilters
}: any) => {

    const { addFilters, removeFilters, filters, removeAllFilters, filtersValues } = useContext(FiltersContext);
    const { push, query } = useRouter()
    const inputRef = useRef<HTMLInputElement>(null);

    const [inputValue, setInputValue] = useState('');
    const [modalSearchVisible, setModalSearchVisible] = useState(false);
    const [searchResults, setSearchResults] = useState([])
    const [searchActive, setSearchActive] = useState(false)


    const onSelectProduct = (producto: any) => {
        const newFilters: Partial<FiltersInterface> = {
            ...filters,
            nombre: producto,
        };
        addFilters(newFilters)

        const queryParams = {
            nombre: producto,
            marca: filters.marca,
            familia: filters.familia,
            folio: filters.folio,
            enStock: filters.enStock,
        };

        setInputValue(producto)
        const handleQueryParams = QueryParams();
        let url = handleQueryParams({ queryParams });
        push(url)
        setModalSearchVisible(false)
        setSearchActive(false)
    }

    const onSearchProduct = async (event: any) => {
        setInputValue(event.target.value);
        const term = event.target.value;

        const queryParams = {
            nombre: term,
            marca: filters.marca,
            familia: filters.familia,
            folio: filters.folio,
            enStock: filters.enStock,
        };

        let url = "/api/search"
        const handleQueryParams = QueryParams();
        let newUrl = handleQueryParams({ queryParams, url });

        try {
            const { data: { products } } = await api.get(`${newUrl}`);
            setSearchResults(products)
        } catch (error) {
            console.log({ error })
        }
    }

    const onProductKeyDown = (event: any) => {
        if (event.key === 'Enter') {

            const newFilters: Partial<FiltersInterface> = {
                ...filters,
                nombre: inputValue,
            };
            addFilters(newFilters)

            const queryParams = {
                nombre: inputValue,
                marca: filters.marca,
                familia: filters.familia,
                folio: filters.folio,
                enStock: filters.enStock,
            };

            const handleQueryParams = QueryParams();
            let url = handleQueryParams({ queryParams });
            push(url)

            setInputValue('');
            if (inputRef.current) {
                inputRef.current.blur();
            }
        }
    }

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

    const handleRemoveAllFilters = () => {
        removeAllFilters()
        push("/products")
    }

    useEffect(() => {
        if(!query.nombre) return;

        const resetInputValue = () => {
            setInputValue(query?.nombre as string)
        }
        resetInputValue()

    }, [query])


    return (
        <>
            <div className={`${styles.search} ${searchActive ? `${styles.active}` : ''} display-flex cursor`}>

                <input
                    ref={inputRef}
                    type="text"
                    className={`${styles.inputSearch} display-flex align cursor`}
                    placeholder='Buscar producto...'
                    onChange={onSearchProduct}
                    value={inputValue}
                    onKeyDown={onProductKeyDown}

                    onClick={() => {
                        setModalSearchVisible(true)
                        setSearchActive(true)
                    }}
                />

                <FontAwesomeIcon icon={faSearch} className={`${styles.iconSearch} icon`} />

                {
                    inputValue !== "" &&
                    <div
                        className="iconClean display-flex allCenter cursor"
                        onClick={() => setInputValue("")}
                    >
                        <FontAwesomeIcon icon={faXmark} className={`icon__small`} style={{ zIndex: "99999999" }} />
                    </div>
                }

                {/* RESULTS CONTAINER */}
                {
                    modalSearchVisible &&
                    <div className={styles.resultsSearch}>
                        {
                            filtersValues && filtersValues?.length > 0 && !(filtersValues.length === 1 && filtersValues[0][0] === 'nombre') && (
                                <div className={`${styles.filtersSearch} display-flex`}>
                                    {filtersValues.map((filter: any, index) => (
                                        filter[0] === 'nombre' ? null : (
                                            <Tag key={index} onClose={() => handleCloseTag?.(filter)} close cursor>
                                                {filter[1] === 'true' ? 'En Stock' : filter[1]}
                                            </Tag>
                                        )
                                    ))}
                                    {filtersValues.some((filter) => filter[0] !== 'nombre') ? (
                                        <Tag close color="gray" onClose={handleRemoveAllFilters}>
                                            Limpiar filtros
                                        </Tag>
                                    ) : null}
                                </div>
                            )
                        }

                        {
                            (inputValue !== "" && searchResults?.length > 0) ? searchResults.slice(0, 10)?.map((producto: any, index: number) =>
                                <SearchItemCard key={index} productName={producto?.Nombre ? producto?.Nombre as string : producto as string} onclick={() => onSelectProduct(producto)} />
                            )
                                :
                                searchResults?.length === 0 && inputValue !== "" ?
                                    <div className={`${styles.messageEmpty} display-flex column allCenter`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='icon  m-right'>
                                            <path d="M18.546 3h-13.069l-5.477 8.986v9.014h24v-9.014l-5.454-8.986zm-11.946 2h10.82l3.642 6h-4.476l-3 3h-3.172l-3-3h-4.471l3.657-6zm15.4 14h-20v-6h4.586l3 3h4.828l3-3h4.586v6z" />
                                        </svg>
                                        <div className={`display-flex column allCenter`}>
                                            <h3>No hay resultados.</h3>
                                            <p>Verifica haberlo escrito bien.</p>
                                        </div>
                                    </div>
                                    :
                                    <div className={`${styles.messageEmpty} display-flex column allCenter`}>
                                        <div className={`display-flex column allCenter`}>
                                            <h3>Inicia tu busqueda.</h3>
                                        </div>
                                    </div>
                        }

                    </div>
                }
            </div>

            {/* BACKGROUND */}
            {
                modalSearchVisible &&
                <div className={styles.backgroundSearch} onClick={() => {
                    setModalSearchVisible(false)
                    setSearchActive(false)
                }}></div>
            }

        </>
    )
}

export default HomeSearch
