import React, { useContext, useRef, useState } from 'react'
import styles from "../../styles/Modal.module.scss";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { SearchItemCard } from '../Cards/SearchItemCard';
import { FiltersContext } from '@/context';
import { Tag } from '../Ui/Tag';

interface Props {
    visible: boolean;
    receipt?: boolean;
    onClose: () => void;

    // Methods
    handleRemoveAllFilters?: () => void;
    handleCloseTag?: (filter: string[]) => void;
    onSelectItem: (producto: any) => void;
    onInputChange: (term: string) => Promise<{products : any}>;
    onKeyDown: (inputValue: string) => void;
    filtersValues?: string[]
}

export const ModalSearch = ({
    visible,
    onClose,
    handleRemoveAllFilters,
    onSelectItem,
    onInputChange,
    handleCloseTag,
    onKeyDown,
    filtersValues
}: Props) => {
    const [searchResults, setSearchResults] = useState([])
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const highlightSearchTerm = (text: string, term: string) => {
        const regex = new RegExp(`(${term})`, 'gi');
        return text?.replace(regex, '<strong>$1</strong>');
    };

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {

            onKeyDown(inputValue)

            setInputValue('');
            if (inputRef.current) {
                inputRef.current.blur();
            }
        }
    };

    const handleSelectOption = (producto: string) => {

        onSelectItem(producto)
        onClose()

    }

    const handleInputChange = async (event: any) => {
        setInputValue(event.target.value);
        const term = event.target.value

        const { products } = await onInputChange(term)

        setSearchResults(products)
    };


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

                {
                    filtersValues &&
                    <div className={`${styles.filtersSearch} display-flex`}>
                        {
                            filtersValues.map((filter: any, Index) => (
                                <Tag key={Index} onClose={() => handleCloseTag?.(filter)} close cursor>
                                    {filter[1] === "true" ? "En Stock" : filter[1]}
                                </Tag>
                            ))
                        }
                        {
                            filtersValues.length > 0 ? <Tag close color='gray' onClose={handleRemoveAllFilters}>Limpiar filtros</Tag> : <></>
                        }
                    </div>
                }

                <div className={styles.resultsSearch}>
                    {
                        (inputValue !== "" && searchResults?.length > 0) ? searchResults?.map((producto: any, index: number) =>
                            <SearchItemCard key={index} productName={producto?.Nombre ? producto?.Nombre as string : producto as string} onclick={() => handleSelectOption(producto)} />
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
            </div>
        </>
        : null
}
