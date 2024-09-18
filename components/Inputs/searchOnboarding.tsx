import React, { Dispatch, useContext, useRef, useState } from 'react';
import styles from "../../styles/Components/SearchGlobal.module.scss";

import ClientInterface from '@/interfaces/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import { ClientContext } from '@/context';
import { SearchItemCard } from '../Cards/SearchItemCard';
import { useRouter } from 'next/router';

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

    // Función para resaltar el término de búsqueda
    const highlightSearchTerm = (text: string, term: string) => {
        const regex = new RegExp(`(${term})`, 'gi');
        return text?.replace(regex, '<strong>$1</strong>');
    };

    // Seleccionar un cliente
    const handleSelectProduct = (result: ClientInterface) => {
        selectClient(result);
        setInputValue(result.Nombre);
        setSearchResults([]); // Limpiar resultados de búsqueda
    };

    // Manejar cambio en el input
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setInputValue(term); // Actualizar el valor del input
        handleSearchTerm(term); // Realizar búsqueda
    };

    const clearInput = () => {
        setInputValue("");
        inputRef.current?.focus();
    };

    const isSearchDisabled = inputValue.trim() === "";

    return (
        <>
            <div className={`${styles.searchHome} display-flex`}>
                <div className={`${styles.inputHome} display-flex`}>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Buscar..."
                        onChange={handleInputChange}
                        value={inputValue}
                    />
                    {inputValue !== "" && (
                        <div
                            className="iconClean display-flex allCenter cursor"
                            onClick={clearInput}
                        >
                            <FontAwesomeIcon icon={faXmark} className="icon__small" style={{ zIndex: "99999999" }} />
                        </div>
                    )}
                </div>
                <button
                    className={!isSearchDisabled ? "button" : "button disabled"}
                    disabled={isSearchDisabled}
                    onClick={() => router.push(`/products`)}
                >
                    {label ? label : <FontAwesomeIcon icon={faArrowRightLong} className="icon" style={{ zIndex: "99999999" }} />}
                </button>
            </div>

            <div className={styles.results}>
                {searchResults?.slice(0, 8).map((result: ClientInterface) => (
                    <SearchItemCard
                        key={result.Nombre} // Usar el ID como key para evitar advertencias
                        productName={result.Nombre}
                        onclick={() => handleSelectProduct(result)}
                        highlightSearchTerm={highlightSearchTerm}
                        inputValue={inputValue}
                    />
                ))}
            </div>
        </>
    );
};
