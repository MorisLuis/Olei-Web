import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import styles from "../../styles/Components/SearchGlobal.module.scss";

import { ModalSearch } from '../Modals/ModalSearch';
import { SearchItemCard } from '../Cards/SearchItemCard';
import FiltersInterface from '@/interfaces/filters';
import { api } from '@/api/api';
import { useRouter } from 'next/router';

interface Props {
    filtersActive?: FiltersInterface,
    setFiltersActive: Dispatch<SetStateAction<FiltersInterface>> | undefined
}

export const SearchGlobal = ({ setFiltersActive, filtersActive }: Props) => {

    const { push, query: { page, limit }, query } = useRouter()
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

            // Construct the base URL with pagination settings.
            let url = `/products?page=${page}&limit=${limit}`;

            //Add a query parameter to the URL if the value is defined and not empty.
            const addQueryParam = (paramName: string, value: any) => {
                if (value !== null && value !== "" && value !== undefined) {
                    url += `&${paramName}=${value}`;
                }
            };

            // Add specific query parameters based on filters.
            addQueryParam("nombre", query.nombre);
            addQueryParam("marca", filtersActive?.marca);
            addQueryParam("familia", filtersActive?.familia);
            addQueryParam("folio", filtersActive?.folio);
            addQueryParam("enStock", filtersActive?.enStock);

            push(url);

            setInputValue('');
            setModalSearchVisible(false);
            if (inputRef.current) {
                inputRef.current.blur();
            }
            setFiltersActive?.((prevState: FiltersInterface) => ({
                ...prevState,
                nombre: inputValue
            }))
        }
    };

    const handleSelectOption = (producto: string) => {
        setFiltersActive?.((prevState: FiltersInterface) => ({
            ...prevState,
            nombre: producto
        }))

        // Construct the base URL with pagination settings.
        let url = `/products?page=${page}&limit=${limit}`;

        //Add a query parameter to the URL if the value is defined and not empty.
        const addQueryParam = (paramName: string, value: any) => {
            if (value !== null && value !== "" && value !== undefined) {
                url += `&${paramName}=${value}`;
            }
        };

        // Add specific query parameters based on filters.
        addQueryParam("nombre", producto);
        addQueryParam("marca", filtersActive?.marca);
        addQueryParam("familia", filtersActive?.familia);
        addQueryParam("folio", filtersActive?.folio);
        addQueryParam("enStock", filtersActive?.enStock);

        push(url);

    }

    const handleInputChange = async (event: any) => {
        setInputValue(event.target.value);
        const term = event.target.value

        console.log({term})

        try {
            const { data: { products } } = await api.get(`/api/search?term=${term}`);
            setSearchResults(products)
        } catch (error) {
            console.log({error})
        }
    };

    return (
        <>
            <div className={`${styles.searchGlobal} display-flex`}>
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
            </div>
            <ModalSearch visible={modalSearchVisible}>
                <div className={styles.messageModal}>
                    <p>Busca un producto por su nombre o codigo</p>
                </div>
                {
                    searchResults.map((producto: string, index: number) =>
                        <SearchItemCard key={index} productName={producto} onclick={() => handleSelectOption(producto)} />
                    )
                }
            </ModalSearch>
        </>
    );
};
