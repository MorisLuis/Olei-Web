import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { ModalSearch } from '../Modals/ModalSearch';
import { SearchItemCard } from '../Cards/SearchItemCard';
import styles from "../../styles/Components/SearchGlobal.module.scss";
import FiltersInterface from '@/interfaces/filters';

const products = [
    "Producto 1", "Bujias", "Tornillos", "Clavos"
]

interface Props {
    filterActive?: FiltersInterface,
    setFilterActive: Dispatch<SetStateAction<FiltersInterface>>
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

            setInputValue('');
            setModalSearchVisible(false);
            if (inputRef.current) {
                inputRef.current.blur();
            }
            setFilterActive((prevState: FiltersInterface) => ({
                ...prevState,
                name: inputValue
            }))
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
                            setFilterActive((prevState: FiltersInterface) => ({
                                ...prevState,
                                name: producto
                            }))
                        }} />
                    )
                }
            </ModalSearch>
        </>
    );
};
