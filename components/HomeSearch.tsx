import React, { useContext, useState } from 'react';
import styles from "../styles/Pages/Products.module.scss";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ModalSearch } from './Modals/ModalSearch';
import { FiltersContext } from '@/context';
import { useRouter } from 'next/router';
import FiltersInterface from '@/interfaces/filters';
import QueryParams from '@/utils/queryParams';
import { api } from '@/api/api';

const HomeSearch = ({
    setTemporalFilters
}: any) => {

    const [modalSearchVisible, setModalSearchVisible] = useState(false);
    const { addFilters, removeFilters, filters, removeAllFilters, filtersValues } = useContext(FiltersContext);
    const { push } = useRouter()

    const handleRemoveAllFilters = () => {
        removeAllFilters()
        push("/products")
    }

    const onSelectProduct = (producto: any) => {
        const newFilters: Partial<FiltersInterface> = {
            ...filters,
            nombre: producto,
        };
        addFilters(newFilters)

        const queryParams = {
            nombre: producto,
            marca: filters.marca,
            familia: filters.familia,
            folio: filters.folio,
            enStock: filters.enStock,
        };

        const handleQueryParams = QueryParams();
        let url = handleQueryParams({ queryParams });
        push(url)
    }

    const onInputProductChange = async (term: string) => {

        const queryParams = {
            nombre: term,
            marca: filters.marca,
            familia: filters.familia,
            folio: filters.folio,
            enStock: filters.enStock,
        };

        let url = "/api/search"
        const handleQueryParams = QueryParams();
        let newUrl = handleQueryParams({ queryParams, url });

        try {
            const { data: { products } } = await api.get(`${newUrl}`);
            return { products };
        } catch (error) {
            console.log({ error })
            return { products: [] };
        }
    }

    const onProductKeyDown = (inputValue: string) => {
        const newFilters: Partial<FiltersInterface> = {
            ...filters,
            nombre: inputValue,
        };
        addFilters(newFilters)

        const queryParams = {
            nombre: inputValue,
            marca: filters.marca,
            familia: filters.familia,
            folio: filters.folio,
            enStock: filters.enStock,
        };

        const handleQueryParams = QueryParams();
        let url = handleQueryParams({ queryParams });
        push(url)
    }

    const handleCloseTag = (filter: string[]) => {

        removeFilters({
            [filter[0]]: filter[1]
        })

        setTemporalFilters((prevState: FiltersInterface) => ({
            ...prevState,
            [filter[0]]: filter[1] === "true" ? false : undefined
        }))

        const queryParams = {
            nombre: filter[0] === "nombre" ? undefined : filters.nombre,
            marca: filter[0] === "marca" ? null : filters.marca,
            familia: filter[0] === "familia" ? null : filters.familia,
            folio: filter[0] === "folio" ? null : filters.folio,
            enStock: filter[0] === "enStock" ? false : filters.enStock,
        }

        const handleQueryParams = QueryParams();
        let url = handleQueryParams({ queryParams });
        push(url)
    }

    return (
        <>
            <div className={`${styles.search} display-flex cursor`} >
                <button
                    className='button search display-flex align cursor'
                    onClick={() => setModalSearchVisible(true)}
                >
                    <FontAwesomeIcon icon={faSearch} className={`icon`} />
                    {filters?.nombre ? <p className={`${styles.nameFilter} display-flex allCenter`}>{filters?.nombre}</p> : <p>Buscar</p>}
                </button>
            </div>

            <ModalSearch
                visible={modalSearchVisible}
                onClose={() => setModalSearchVisible(false)}

                // Methods
                handleCloseTag={handleCloseTag}
                onSelectItem={onSelectProduct}
                onInputChange={onInputProductChange}
                onKeyDown={onProductKeyDown}
                handleRemoveAllFilters={handleRemoveAllFilters}
                filtersValues={filtersValues}
            />
        </>
    )
}

export default HomeSearch
