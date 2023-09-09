import React, { useContext, useRef, useState } from 'react'
import styles from "../../styles/Modal.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { SearchItemCard } from '../Cards/SearchItemCard';
import FiltersInterface from '@/interfaces/filters';
import { FiltersContext } from '@/context';
import { useRouter } from 'next/router';
import { api } from '@/api/api';

interface Props {
    visible: Boolean;
    receipt?: boolean;
    onClose: () => void;
    children?: any;
    results: any
}

export const ModalSearch = ({
    visible,
    onClose,
    children,
    results,
}: Props) => {
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

        const newFilters: Partial<FiltersInterface> = {
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
        onClose()

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

    return visible ?
        <>
            <div className={styles.modalBackgroundSecondary} onClick={() => onClose()}></div>

            <div className={styles.modalSearch}>
                <div>
                    <input
                        ref={inputRef}
                        className={`${styles.input}`}
                        type="text"
                        placeholder='Buscar...'
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        onKeyDown={handleKeyDown}
                        onChange={handleInputChange}
                        value={inputValue}
                    />
                    <FontAwesomeIcon style={{ color: "gray" }} icon={faSearch} className={`${styles.iconSearch} icon__small`} />
                </div>
                <div>
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
