import React, { Dispatch, useRef, useState } from 'react';
import styles from "../../styles/Components/SearchGlobal.module.scss";

import ClientInterface from '@/interfaces/client';
import { capitalizarTexto } from '@/utils/textCapitalize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faArrowRightLong } from '@fortawesome/free-solid-svg-icons';

interface Props {
    searchResults: any;
    setSearchResults: Dispatch<React.SetStateAction<any>>;
    label?: string;

    // Methods
    onSubmit: (arg?: string | ClientInterface) => void;
    handleSearchTerm: (term: string) => Promise<void>
}

export const SearchOnboarding = ({
    onSubmit,
    searchResults,
    setSearchResults,
    label,
    handleSearchTerm,
}: Props) => {

    const [inputValue, setInputValue] = useState<string | ClientInterface | undefined>("");
    const inputRef = useRef<HTMLInputElement>(null);

    const highlightSearchTerm = (text: string, term: string) => {
        const regex = new RegExp(`(${term})`, 'gi');
        return text?.replace(regex, '<strong>$1</strong>');
    };

    const handleSelectProduct = (result: any) => {
        setInputValue(result)
        setSearchResults([])
    }

    const handleInputChange = (e: any) => {
        let term = e.target.value;
        setInputValue(term)
        handleSearchTerm(term)
    }

    const searchDefault: boolean = inputValue === "" || inputValue === null

    return (
        <>
            <div className={`${styles.searchHome} display-flex`}>
                <div className={`${styles.inputHome} display-flex`}>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder='Buscar...'
                        onChange={handleInputChange}
                        value={typeof inputValue === "string" ? inputValue : inputValue?.Nombre}
                    />
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
                <button
                    className={!searchDefault ? "button" : "button disabled"}
                    disabled={searchDefault}
                    onClick={() => onSubmit(inputValue)}
                >
                    {
                        label ? label :
                            <FontAwesomeIcon icon={faArrowRightLong} className={`icon`} style={{ zIndex: "99999999" }} />
                    }
                </button>
            </div>
            <div className={styles.results}>
                {
                    searchResults.slice(0, 8).map((result: any, index: number) =>
                        <div key={index} className={styles.item} onClick={() => handleSelectProduct(result)}>
                            <li
                                key={index}
                                dangerouslySetInnerHTML={{
                                    __html: highlightSearchTerm(capitalizarTexto(result?.Nombre) as string || capitalizarTexto(result) as string, typeof inputValue === "string" ? inputValue : inputValue?.Nombre || ""),
                                }}
                            />
                        </div>
                    )
                }
            </div>
        </>
    )
}

