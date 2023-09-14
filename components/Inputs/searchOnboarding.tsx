import React, { Dispatch, useRef, useState } from 'react';
import styles from "../../styles/Components/SearchGlobal.module.scss";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { api } from '@/api/api';
import ClientInterface from '@/interfaces/client';

interface Props {
    searchResults: any;
    setSearchResults: Dispatch<React.SetStateAction<ClientInterface[] | any[]>>;
    
    // Methods
    onSubmit: (arg?: string | ClientInterface) => void;
    handleSearchTerm: (term: string) => Promise<void>
}

export const SearchOnboarding = ({
    onSubmit,
    searchResults,
    setSearchResults,
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
                        value={typeof inputValue  === "string" ? inputValue : inputValue?.Nombre}
                    />
                    {/* {
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
                    } */}
                </div>
                <button
                    style={{ width: "20%", marginLeft: "1em" }}
                    className={!searchDefault ? "button" : "button disabled"}
                    disabled={searchDefault}
                    onClick={() => onSubmit(inputValue)}
                >Buscar</button>
            </div>
            <div className={styles.results}>
                {
                    searchResults.map((result: any, index: number) =>
                        <div key={index} className={styles.item}>
                            <li
                                key={index}
                                onClick={() =>  handleSelectProduct(result)}
                                dangerouslySetInnerHTML={{
                                    __html: highlightSearchTerm(result?.Nombre as string || result as string, typeof inputValue  === "string" ? inputValue : inputValue?.Nombre || ""),
                                }}
                            />
                        </div>
                    )
                }
            </div>
        </>
    )
}

