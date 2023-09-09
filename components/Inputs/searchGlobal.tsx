import React, { useContext, useRef, useState } from 'react';
import styles from "../../styles/Components/SearchGlobal.module.scss";

import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ModalSearch } from '../Modals/ModalSearch';
import { SearchItemCard } from '../Cards/SearchItemCard';
import FiltersInterface from '@/interfaces/filters';
import { api } from '@/api/api';
import { useRouter } from 'next/router';
import { FiltersContext } from '@/context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export const SearchGlobal = () => {

    const { addFilters, filters } = useContext(FiltersContext);
    const { push } = useRouter()
    const [searchResults, setSearchResults] = useState([])
    const [modalSearchVisible, setModalSearchVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    let timeoutId: any;

    const handleInputFocus = () => {
        clearTimeout(timeoutId);
        setModalSearchVisible(true);
    };

    const handleInputBlur = () => {
        timeoutId = setTimeout(() => {
            setModalSearchVisible(false);
        }, 200);
    };

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {

            const newFilters: Partial<FiltersInterface> = {
                ...filters,
                nombre: inputValue,
            };
            addFilters(newFilters)

            // Construct the base URL with pagination settings.
            let url = `/products`;
            let isFirstQueryParam = true;

            //Add a query parameter to the URL if the value is defined and not empty.
            const addQueryParam = (paramName: string, value: any) => {
                if (value !== null && value !== "" && value !== undefined) {
                    if (isFirstQueryParam) {
                        url += `?${paramName}=${value}`;
                        isFirstQueryParam = false;
                    } else {
                        url += `&${paramName}=${value}`;
                    }
                }
            };

            // Add specific query parameters based on filters.
            addQueryParam("nombre", inputValue);
            addQueryParam("marca", filters?.marca);
            addQueryParam("familia", filters?.familia);
            addQueryParam("folio", filters?.folio);
            addQueryParam("enStock", filters?.enStock);

            push(url);

            setInputValue('');
            setModalSearchVisible(false);
            if (inputRef.current) {
                inputRef.current.blur();
            }
        }
    };

    const handleSelectOption = (producto: string) => {

        const newFilters:  Partial<FiltersInterface> = {
            ...filters,
            nombre: producto,
        };
        addFilters(newFilters)

        // Construct the base URL with pagination settings.
        let url = `/products`;
        let isFirstQueryParam = true;

        //Add a query parameter to the URL if the value is defined and not empty.
        const addQueryParam = (paramName: string, value: any) => {
            if (value !== null && value !== "" && value !== undefined && value !== false) {
                if (isFirstQueryParam) {
                    url += `?${paramName}=${value}`;
                    isFirstQueryParam = false;
                } else {
                    url += `&${paramName}=${value}`;
                }
            }
        };
        // Add specific query parameters based on filters.
        addQueryParam("nombre", producto);
        addQueryParam("marca", filters?.marca);
        addQueryParam("familia", filters?.familia);
        addQueryParam("folio", filters?.folio);
        addQueryParam("enStock", filters?.enStock);

        push(url);

    }

    const handleInputChange = async (event: any) => {
        setInputValue(event.target.value);
        const term = event.target.value

        try {
            const { data: { products } } = await api.get(`/api/search?term=${term}`);
            setSearchResults(products)
        } catch (error) {
            console.log({ error })
        }
    };


    return (
        <>
            <div className={modalSearchVisible ? `${styles.searchGlobal} display-flex ${styles.active}` : `${styles.searchGlobal} display-flex`}>
                <div className='inputClean display-flex'>
                    <input
                        ref={inputRef}
                        className={`${styles.input} input`}
                        type="text"
                        placeholder='Buscar...'
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        onKeyDown={handleKeyDown}
                        onChange={handleInputChange}
                        value={inputValue}
                    />
                    {
                        inputValue !== "" &&
                        <div
                            className="iconClean display-flex allCenter cursor"
                            onClick={() => {
                                setInputValue("")
                            }}
                            style={{ zIndex: "9999999" }}
                        >
                            <FontAwesomeIcon icon={faXmark} className={`icon__small`} style={{ zIndex: "99999999" }} />
                        </div>
                    }
                </div>
            </div>

        </>
    );
};
