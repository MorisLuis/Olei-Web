import React, { useContext } from 'react';
import styles from "../../styles/Pages/Products.module.scss";

import { FiltersContext } from '@/context';
import { useRouter } from 'next/router';
import { SearchItemCard } from '../Cards/SearchItemCard';
import { Tag } from '../Ui/Tag';
import FiltersInterface from '@/interfaces/filters';
import { handleQuery } from '../Ui/Filter/RenderMarcaFilter';

interface ResultsContainerInterface {
    inputValue: string,
    searchResults: string[],
    modalSearchVisible: boolean,

    setModalSearchVisible: React.Dispatch<React.SetStateAction<boolean>>,
    setSearchActive: React.Dispatch<React.SetStateAction<boolean>>,
}

const ResultsContainer = ({
    setModalSearchVisible,
    setSearchActive,
    inputValue,
    searchResults,
    modalSearchVisible,
}: ResultsContainerInterface) => {

    const { push, query } = useRouter();
    const { removeFilter, removeAllFilters, filtersValues } = useContext(FiltersContext);

    const highlightSearchTerm = (text: string, term: string) => {
        const regex = new RegExp(`(${term})`, 'gi');
        return text?.replace(regex, '<strong>$1</strong>');
    };

    const onSelectProduct = (value: string) => {
        const newQuery = handleQuery({
            query,
            entryLabel: 'Nombre',
            option: {
                label: 'Nombre',
                value: value
            }
        });

        push(newQuery);
        setModalSearchVisible(false)
        setSearchActive(false)
    }

    const handleRemoveAllFilters = () => {
        removeAllFilters()
        push("/products")
    }

    return modalSearchVisible ?
        <div className={styles.resultsSearch}>

            {/* FILTERS */}
            {
                filtersValues && filtersValues?.length > 0 && !(filtersValues.length === 1 && filtersValues[0][0] === 'nombre') && (
                    <div className={`${styles.filtersSearch} display-flex`}>
                        {filtersValues.map((filter: [keyof FiltersInterface, string], index) => (
                            filter[0] === 'nombre' ? null : (
                                <Tag key={index} onClose={() => removeFilter(filter[0])} close cursor>
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

            {/* CONTAINER RESULTS */}
            {
                (searchResults?.length > 0) ? searchResults.slice(0, 10)?.map((producto: string, index: number) =>
                    <SearchItemCard
                        key={index}
                        productName={producto ? producto as string : ""}
                        onclick={onSelectProduct}
                        highlightSearchTerm={highlightSearchTerm}
                        inputValue={inputValue}
                    />
                )
                    :
                    searchResults?.length === 0 && inputValue !== "" ?
                        <div className={`${styles.messageEmpty} display-flex column allCenter`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='icon'>
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
        :
        null
}

export default ResultsContainer
