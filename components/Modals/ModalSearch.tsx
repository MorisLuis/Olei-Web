import React, { useEffect, useRef, useState } from 'react';
import styles from "../../styles/Modal.module.scss";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import { SearchItemCard } from '../Cards/SearchItemCard';
import ClientInterface from '@/interfaces/client';
import { EmptyMessageCard } from '../Cards/EmptyMessageCard';

interface Props {
    visible: boolean;
    onClose: () => void;
    
    // Methods
    onSelectItem: (item: ClientInterface) => void;
    onInputChange: (term: string) => Promise<{ clients: ClientInterface[] }>;
}

export const ModalSearch = ({
    visible,
    onClose,
    onSelectItem,
    onInputChange
}: Props) => {

    const [searchResults, setSearchResults] = useState<ClientInterface[]>([]);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSelectOption = (item: ClientInterface) => {
        onSelectItem(item);
        onClose();
    };

    const highlightSearchTerm = (text: string, term: string) => {
        const regex = new RegExp(`(${term})`, 'gi');
        return text?.replace(regex, '<strong>$1</strong>');
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setInputValue('');
            if (inputRef.current) {
                inputRef.current.blur();
            }
        }
    };

    const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        const term = event.target.value;
        const { clients } = await onInputChange(term); // `products` ahora es `ClientInterface[]`
        setSearchResults(clients);
    };

    useEffect(() => {
        if (visible && inputRef.current) {
            inputRef.current.focus();
        }
    }, [visible]);

    return visible ? (
        <>
            <div className={styles.modalBackgroundSecondary} onClick={onClose}></div>

            <div className={styles.modalSearch}>
                <div className={styles.headerSearch}>
                    <div className={styles.inputSearch}>
                        <input
                            ref={inputRef}
                            className={styles.inputt}
                            type="text"
                            placeholder="Buscar cliente..."
                            onKeyDown={handleKeyDown}
                            onChange={handleInputChange}
                            value={inputValue}
                        />
                        <FontAwesomeIcon style={{ color: "gray" }} icon={faSearch} className={`${styles.iconSearch} icon__small`} />
                        {inputValue !== "" && (
                            <div className="iconClean display-flex allCenter cursor" onClick={() => setInputValue("")}>
                                <FontAwesomeIcon icon={faXmark} className="icon__small" style={{ zIndex: "99999999" }} />
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.resultsSearch}>
                    {inputValue !== "" && searchResults?.length > 0 ? (
                        searchResults.slice(0, 10).map((item, index) => (
                            <SearchItemCard
                                key={index}
                                productName={item?.Nombre}
                                onclick={() => handleSelectOption(item)}
                                highlightSearchTerm={highlightSearchTerm}
                                inputValue={inputValue}
                            />
                        ))
                    ) : searchResults?.length === 0 && inputValue !== "" ? (
                        <EmptyMessageCard
                            title="No hay resultados."
                            subtitle="Verifica haberlo escrito bien."
                        />
                    ) : (
                        <div className={`${styles.messageEmpty} display-flex column allCenter`}>
                            <div className="display-flex column allCenter">
                                <h3>Inicia tu búsqueda.</h3>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    ) : null;
};
