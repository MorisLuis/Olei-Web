import React, { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from 'react';
import styles from "../../styles/Pages/Products.module.scss";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FiltersContext } from '@/context';
import { useRouter } from 'next/router';
import FiltersInterface from '@/interfaces/filters';
import QueryParams from '@/utils/queryParams';
import ResultsContainer from './ResultsContainer';
import { searchProducts } from '@/services/search';
import useErrorHandler from '@/hooks/useErrorHandler';

interface HomeSearchInterface {
    setTemporalFilters: Dispatch<SetStateAction<FiltersInterface>>,
    setLoadingData: Dispatch<SetStateAction<boolean>>
}

const HomeSearch = ({
    setTemporalFilters,
    setLoadingData
}: HomeSearchInterface) => {

    const { addFilters, filters } = useContext(FiltersContext);
    const { handleError } = useErrorHandler()
    const { push, query } = useRouter();

    const inputRef = useRef<HTMLInputElement>(null);

    const [inputValue, setInputValue] = useState('');
    const [modalSearchVisible, setModalSearchVisible] = useState(false);
    const [searchResults, setSearchResults] = useState<string[]>([]);
    const [searchActive, setSearchActive] = useState(false);

    const onSearchProduct = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        const term = event.target.value === '' ? " " :  event.target.value ;
        try {
            const products = await searchProducts(term, query);
            if (products.error) {
                handleError(products.error);
                return;
            }
            setSearchResults(products)
        } catch (error) {
            handleError(error);
        }
    }

    const onProductKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
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

    // Reset the value of the input if a query 'nombre' exist.
    useEffect(() => {
        if (!query.nombre) return;

        const resetInputValue = () => {
            setInputValue(query?.nombre as string)
        }
        resetInputValue()

    }, [query]);

    return (
        <div className={`${styles.search} ${searchActive ? `${styles.active}` : ''} display-flex cursor`}>

            <input
                ref={inputRef}
                type="text"
                className={`${styles.inputSearch} display-flex align cursor`}
                placeholder='Buscar producto...'
                value={inputValue}
                onChange={onSearchProduct}
                onKeyDown={onProductKeyDown}
                onClick={() => {
                    setModalSearchVisible(true)
                    //onSearchProduct(e as React.ChangeEvent<HTMLInputElement>);
                    setSearchActive(true)
                }}
            />

            <FontAwesomeIcon icon={faSearch} className={`${styles.iconSearch} icon`} />

            {
                inputValue !== "" &&
                <div className="iconClean display-flex allCenter cursor"
                    onClick={() => setInputValue("")}
                >
                    <FontAwesomeIcon icon={faXmark} className={`icon__small`} style={{ zIndex: "99999999" }} />
                </div>
            }

            {/* RESULTS CONTAINER */}
            <ResultsContainer
                inputValue={inputValue}
                searchResults={searchResults}
                modalSearchVisible={modalSearchVisible}
                
                setInputValue={setInputValue}
                setModalSearchVisible={setModalSearchVisible}
                setSearchActive={setSearchActive}
                setTemporalFilters={setTemporalFilters}
                setLoadingData={setLoadingData}
            />

            {/* BACKGROUND */}
            {
                modalSearchVisible &&
                <div className={styles.backgroundSearch} onClick={() => {
                    setModalSearchVisible(false)
                    setSearchActive(false)
                }}></div>
            }

        </div>
    )
}

export default HomeSearch
