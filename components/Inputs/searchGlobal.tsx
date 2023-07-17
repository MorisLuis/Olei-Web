import React, { useRef, useState } from 'react';
import { ModalSearch } from '../Modals/ModalSearch';
import { SearchItemCard } from '../Cards/SearchItemCard';
import styles from "../../styles/Components/SearchGlobal.module.scss";

const products = [
    "Producto 1", "Bujias", "Tornillos", "Clavos"
]

interface Props {
    setFilterActive?: any,
    filterActive?: any
}

export const SearchGlobal = ({ setFilterActive, filterActive }: Props) => {
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
            setFilterActive([...filterActive, inputValue])
            setInputValue('');
            setModalSearchVisible(false);
            if (inputRef.current) {
                inputRef.current.blur();
            }
        }
    };

    const handleInputChange = (event: any) => {
        setInputValue(event.target.value);
    };

    return (
        <>
            <div className={`${styles.searchGlobal} display-flex`}>
                <input
                    ref={inputRef}

                    className={`${styles.input} input`}
                    type="text"
                    placeholder='Buscar...'
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onKeyDown={handleKeyDown}
                    onChange={handleInputChange}
                    value={inputValue}
                />
            </div>
            <ModalSearch visible={modalSearchVisible}>
                <div className={styles.messageModal}>
                    <p>Busca un producto por su nombre o codigo</p>
                </div>
                {
                    products.map((producto: string, index: number) =>
                        <SearchItemCard key={index} productName={producto} onclick={(value: string) => {
                            console.log({ value })
                            setFilterActive([...filterActive, value])
                        }} />
                    )
                }
            </ModalSearch>
        </>
    );
};
