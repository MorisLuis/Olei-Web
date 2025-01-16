import React, { useContext, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import ResultsContainer from './ResultsContainer';
import useErrorHandler from '@/hooks/useErrorHandler';
import styles from "../../styles/Pages/Products.module.scss";
import { searchProducts } from '@/services/product';
import { FiltersContext } from '@/context';

const HomeSearch = () => {

    const { handleError } = useErrorHandler();
    const { query } = useRouter();
    const { filters } = useContext(FiltersContext);
    const inputRef = useRef<HTMLInputElement>(null);

    const [inputValue, setInputValue] = useState('');
    const [modalSearchVisible, setModalSearchVisible] = useState(false);
    const [searchResults, setSearchResults] = useState<string[]>([]);
    const [searchActive, setSearchActive] = useState(false);

    const onSearchProduct = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        const term = event.target.value === '' ? " " : event.target.value;

        try {
            const products = await searchProducts({term, filters});
            if (products.error) return handleError(products.error);
            setSearchResults(products)
        } catch (error) {
            handleError(error);
        }
    }

    const onProductKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            
        }
    }

    // Reset the value of the input if a query 'nombre' exist.
    useEffect(() => {
        if (!query.nombre) return;

        const resetInputValue = () => {
            setInputValue(query?.nombre as string)
        };

        resetInputValue()

    }, [query]);

    return (
        <div className={`${styles.search} ${searchActive ? `${styles.active}` : ''}`}>

            <input
                ref={inputRef}
                type="text"
                className={styles.inputSearch}
                placeholder='Buscar producto...'
                value={inputValue}
                onChange={onSearchProduct}
                onKeyDown={onProductKeyDown}
                onClick={() => {
                    setModalSearchVisible(true)
                    setSearchActive(true)
                }}
            />

            <FontAwesomeIcon icon={faSearch} className={`${styles.iconSearch} icon`} />

            {/* {
                inputValue !== "" &&
                <div className="iconClean display-flex allCenter cursor" onClick={() => setInputValue("")}>
                    <FontAwesomeIcon icon={faXmark} className={`icon__small`} style={{ zIndex: "99999999" }} />
                </div>
            } */}

            {/* RESULTS CONTAINER */}
            <ResultsContainer
                inputValue={inputValue}
                searchResults={searchResults}
                modalSearchVisible={modalSearchVisible}

                setModalSearchVisible={setModalSearchVisible}
                setSearchActive={setSearchActive}
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
