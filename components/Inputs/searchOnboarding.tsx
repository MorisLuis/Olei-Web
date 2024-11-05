import React, { Dispatch, useContext, useRef, useState } from 'react';
import ClientInterface from '@/interfaces/client';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import { ClientContext } from '@/context';
import { SearchItemCard } from '../Cards/SearchItemCard';
import { useRouter } from 'next/router';
import Button from '../Buttons/Button';
import Input from './inputs';
import styles from "../../styles/Components/SearchGlobal.module.scss";

interface Props {
    searchResults: ClientInterface[];
    setSearchResults: Dispatch<React.SetStateAction<ClientInterface[]>>;
    label?: string;

    // Métodos
    handleSearchTerm: (term: string) => Promise<void>;
}

export const SearchOnboarding = ({
    searchResults,
    setSearchResults,
    label,
    handleSearchTerm,
}: Props) => {

    const [inputValue, setInputValue] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);
    const { selectClient } = useContext(ClientContext);
    const router = useRouter()
    const isSearchDisabled = inputValue.trim() === "";

    // Función para resaltar el término de búsqueda
    const highlightSearchTerm = (text: string, term: string) => {
        const regex = new RegExp(`(${term})`, 'gi');
        return text?.replace(regex, '<strong>$1</strong>');
    };

    // Seleccionar un cliente
    const handleSelectProduct = (result: ClientInterface) => {
        selectClient(result);
        setInputValue(result.Nombre);
        setSearchResults([]);
    };

    // Manejar cambio en el input
    const handleInputChange = (e: string) => {
        const term = e;
        setInputValue(term);
        handleSearchTerm(term);
    };

    const clearInput = () => {
        setInputValue("");
        setSearchResults([])
        inputRef.current?.focus();
    };

    return (
        <div className={styles.SearchOnboarding}>
            <div className={styles.searchHome}>
                <Input
                    label=""
                    onChange={(value: string) => handleInputChange(value)}
                    value={inputValue}
                    name='Buscar'
                    extraStyles={{ width: "80%" }}
                    clearInput={clearInput}
                />
                <Button
                    text={label ?? ""}
                    onClick={() => router.push(`/products`)}
                    disabled={isSearchDisabled}
                    icon={faArrowRightLong}
                    extraStyles={{ width: "20%" }}
                />
            </div>

            <div className={styles.results}>
                {searchResults?.slice(0, 8).map((result: ClientInterface) => (
                    <SearchItemCard
                        key={result.Nombre}
                        productName={result.Nombre}
                        onclick={() => handleSelectProduct(result)}
                        highlightSearchTerm={highlightSearchTerm}
                        inputValue={inputValue}
                    />
                ))}
            </div>
        </div>
    );
};


                {/*  <div className={styles.inputHome}>

                    {inputValue !== "" && (
                        <div
                            className="iconClean display-flex allCenter cursor"
                            onClick={clearInput}
                        >
                            <FontAwesomeIcon icon={faXmark} className="icon__small" style={{ zIndex: "99999999" }} />
                        </div>
                    )}
                </div> */}