import React, { useRef, useState } from 'react';
import styles from "../../styles/Components/SearchGlobal.module.scss";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { api } from '@/api/api';

interface Props {
    onclick: (arg: string) => void
}

export const SearchHome = ({
    onclick
}: Props) => {

    const [searchResults, setSearchResults] = useState([])
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

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

    const highlightSearchTerm = (text: any, term: any) => {
        const regex = new RegExp(`(${term})`, 'gi');
        return text?.replace(regex, '<strong>$1</strong>');
    };

    const handleSelectProduct = (result: any) => {
        setInputValue(result)
        setSearchResults([])
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
                        value={inputValue}
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
                    onClick={() => onclick(inputValue)}
                >Buscar</button>
            </div>
            <div className={styles.results}>
                {
                    searchResults.map((result: any, index: number) =>
                        <div key={index} className={styles.item}>
                            <li
                                key={index}
                                onClick={() => handleSelectProduct(result)}
                                dangerouslySetInnerHTML={{
                                    __html: highlightSearchTerm(result, inputValue),
                                }}
                            />
                        </div>


                    )
                }
            </div>
        </>
    )
}

