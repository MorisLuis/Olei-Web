import React, { useRef, useState } from 'react'
import styles from "../../styles/Modal.module.scss";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faXmark, } from '@fortawesome/free-solid-svg-icons';
import { SearchItemCard } from '../Cards/SearchItemCard';
import { Tag } from '../Ui/Tag';


interface Props {
    visible: boolean;
    receipt?: boolean;
    onClose: () => void;

    // Methods
    handleRemoveAllFilters?: () => void;
    handleCloseTag?: (filter: string[]) => void;
    onSelectItem: (producto: any) => void;
    onInputChange: (term: string) => Promise<{ products: any }>;
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

                <div className={styles.headerSearch}>
                    <div className={styles.inputSearch}>
                        <input
                            ref={inputRef}
                            className={styles.inputt}
                            type="text"
                            placeholder='Buscar...'
                            onKeyDown={handleKeyDown}
                            onChange={handleInputChange}
                            value={inputValue}
                        />
                        <FontAwesomeIcon style={{ color: "gray" }} icon={faSearch} className={`${styles.iconSearch} icon__small`} />
                        {
                            inputValue !== "" &&
                            <div
                                className="iconClean display-flex allCenter cursor"
                                onClick={() => setInputValue("")}
                            >
                                <FontAwesomeIcon icon={faXmark} className={`icon__small`} style={{ zIndex: "99999999" }} />
                            </div>
                        }
                    </div>
                    {
                        filtersValues && filtersValues?.length > 0 && (
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
                </div>


                <div className={styles.resultsSearch}>
                    {
                        (inputValue !== "" && searchResults?.length > 0) ? searchResults.slice(0, 10)?.map((producto: any, index: number) =>
                            <SearchItemCard
                                key={index}
                                productName={producto?.Nombre ? producto?.Nombre as string : producto as string}
                                onclick={() => handleSelectOption(producto)}
                                highlightSearchTerm={highlightSearchTerm}
                                inputValue={inputValue}
                            />
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
