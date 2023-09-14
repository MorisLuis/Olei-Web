import React, { useContext, useRef, useState } from 'react'
import { useRouter } from 'next/router';
import styles from "../../styles/Modal.module.scss";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { SearchItemCard } from '../Cards/SearchItemCard';
import FiltersInterface from '@/interfaces/filters';
import { FiltersContext } from '@/context';
import { api } from '@/api/api';
import QueryParams from '@/utils/queryParams';
import { Tag } from '../Ui/Tag';

interface Props {
    visible: boolean;
    receipt?: boolean;
    onClose: () => void;
}

export const ModalSearch = ({
    visible,
    onClose
}: Props) => {
    const { addFilters, filters, filtersValues, removeFilters, removeAllFilters } = useContext(FiltersContext);
    const { push } = useRouter()
    const [searchResults, setSearchResults] = useState([])
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleKeyDown = (event: any) => {
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
            //setModalSearchVisible(false);
            if (inputRef.current) {
                inputRef.current.blur();
            }
        }
    };

    const handleSelectOption = (producto: string) => {

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

        const handleQueryParams = QueryParams();
        let url = handleQueryParams({ queryParams });
        push(url)
        onClose()

    }

    const handleInputChange = async (event: any) => {
        setInputValue(event.target.value);
        const term = event.target.value

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
    };

    const handleRemoveAllFilters = () => {
        removeAllFilters()
        push("/products")
    }

    const handleCloseTag = (filter: string[]) => {

        removeFilters({
            [filter[0]]: filter[1]
        })

        const queryParams = {
            nombre: filter[0] === "nombre" ? null : filters.nombre,
            marca: filter[0] === "marca" ? null : filters.marca,
            familia: filter[0] === "familia" ? null : filters.familia,
            folio: filter[0] === "folio" ? null : filters.folio,
            enStock: filter[0] === "enStock" ? null : filters.enStock,
        }

        const handleQueryParams = QueryParams();
        let url = handleQueryParams({ queryParams });
        push(url)
    }

    return visible ?
        <>
            <div className={styles.modalBackgroundSecondary} onClick={() => onClose()}></div>

            <div className={styles.modalSearch}>

                <div className={styles.inputSearch}>
                    <input
                        ref={inputRef}
                        className={`${styles.input}`}
                        type="text"
                        placeholder='Buscar...'
                        onKeyDown={handleKeyDown}
                        onChange={handleInputChange}
                        value={inputValue}
                    />
                    <FontAwesomeIcon style={{ color: "gray" }} icon={faSearch} className={`${styles.iconSearch} icon__small`} />
                </div>

                <div className={`${styles.filtersSearch} display-flex`}>
                    {
                        filtersValues.map((filter: any, Index) => (
                            <Tag key={Index} onClose={() => handleCloseTag(filter)} close cursor>
                                {filter[1] === "true" ? "En Stock" : filter[1]}
                            </Tag>
                        ))
                    }
                    {
                        filtersValues.length > 0 ? <Tag close color='gray' onClose={handleRemoveAllFilters}>Limpiar filtros</Tag> : <></>
                    }
                </div>

                <div className={styles.resultsSearch}>
                    {
                        (inputValue !== "" && searchResults.length > 0) ? searchResults.map((producto: string, index: number) =>
                            <SearchItemCard key={index} productName={producto} onclick={() => handleSelectOption(producto)} />
                        )
                            :
                            searchResults.length === 0 && inputValue !== "" ?
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
            </div>
        </>
        : null
}
