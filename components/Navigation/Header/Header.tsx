import React, { useContext, useState } from 'react';
import styles from "./../../../styles/Navigation/Header.module.scss";

import { api } from '@/api/api';
import { useRouter } from 'next/router';
import { ClientContext, FiltersContext } from '@/context';
import { ModalSearch } from '../../Modals/ModalSearch';
import FiltersInterface from '@/interfaces/filters';
import QueryParams from '@/utils/queryParams';
import ClientInterface from '@/interfaces/client';
import { LeftSection } from './LeftSection';
import { RightSection } from './RightSection';

interface Props {
    setOpenModalCart: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenModalMenu?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({
    setOpenModalCart,
    setOpenModalMenu
}: Props) => {

    const { push } = useRouter()
    const { selectClient, setClientChanged } = useContext(ClientContext);
    const { addFilters, filters, filtersValues, removeFilters, removeAllFilters } = useContext(FiltersContext);

    const [modalSearchVisible, setModalSearchVisible] = useState(false);
    const [modalClientsVisible, setModalClientsVisible] = useState(false)

    // Search

    const handleRemoveAllFilters = () => {
        removeAllFilters()
        push("/products")
    }

    const handleCloseTag = (filter: string[]) => {

        removeFilters({
            [filter[0]]: filter[1]
        })

        const queryParams = {
            nombre: filter[0] === "nombre" ? null : filters.nombre,
            marca: filter[0] === "marca" ? null : filters.marca,
            familia: filter[0] === "familia" ? null : filters.familia,
            folio: filter[0] === "folio" ? null : filters.folio,
            enStock: filter[0] === "enStock" ? null : filters.enStock,
        }

        const handleQueryParams = QueryParams();
        let url = handleQueryParams({ queryParams });
        push(url)
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


    // Clients
    const onSelectClient = (product: any) => {
        setClientChanged(true)
        selectClient(product as ClientInterface)
        setTimeout(() => {
            setClientChanged(false)
        }, 300)
    }

    const onInputClientChange = async (term: string) => {
        try {
            const { data: { Clients } } = await api.get(`/api/search/client?term=${term}`);
            return { products: Clients };
        } catch (error) {
            console.log({ error })
            return { products: [] };
        }
    }

    const onClientKeyDown = (inputValue: string) => {
    }


    return (
        <>
            <div className={`${styles.header}  blur`}>
                <div className={`${styles.content} display-flex space-between`}>
                    <LeftSection
                        setModalClientsVisible={setModalClientsVisible}
                    />
                    <RightSection
                        setOpenModalMenu={setOpenModalMenu}
                        setOpenModalCart={setOpenModalCart}
                    />
                </div>
            </div>

            <ModalSearch
                visible={modalSearchVisible}
                onClose={() => setModalSearchVisible(false)}
                onSelectItem={onSelectProduct}
                onInputChange={onInputProductChange}
                onKeyDown={onProductKeyDown}
                handleRemoveAllFilters={handleRemoveAllFilters}
                handleCloseTag={handleCloseTag}
                filtersValues={filtersValues}
            />

            <ModalSearch
                visible={modalClientsVisible}
                onClose={() => setModalClientsVisible(false)}
                onSelectItem={onSelectClient}
                onInputChange={onInputClientChange}
                onKeyDown={onClientKeyDown}
            />
        </>
    )
}

export default Header
