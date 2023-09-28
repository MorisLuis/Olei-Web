import React, { useContext, useState } from 'react';
import styles from "./../../styles/Navigation/Header.module.scss";

import { api } from '@/api/api';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { AuthContext, CartContext, ClientContext, FiltersContext } from '@/context';
import { ModalSearch } from '../Modals/ModalSearch';
import FiltersInterface from '@/interfaces/filters';
import QueryParams from '@/utils/queryParams';
import ClientInterface from '@/interfaces/client';

interface Props {
    setOpenModalCart: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenModalMenu?: React.Dispatch<React.SetStateAction<boolean>>
}

const Header = ({
    setOpenModalCart,
    setOpenModalMenu
}: Props) => {

    const { replace, push, pathname } = useRouter()
    const { numberOfItems } = useContext(CartContext);
    const { client, selectClient, setClientChanged } = useContext(ClientContext);
    const { user } = useContext(AuthContext);
    const { addFilters, filters, filtersValues, removeFilters, removeAllFilters } = useContext(FiltersContext);

    const [profileOpen, setProfileOpen] = useState(false)
    const [modalSearchVisible, setModalSearchVisible] = useState(false);
    const [modalClientsVisible, setModalClientsVisible] = useState(false)

    const onLogOut = async () => {
        try {
            await api.post('/api/auth/logout');
            Cookies.remove("token")
            replace("/login")
        } catch (error) {
            console.log({ error })
        }
    }

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
            <div className={`${styles.header} blur`}>
                {
                    pathname === "/onboarding/selectClient" ?
                        <></>
                        :
                        <div className={`${styles.content} display-flex space-between`}>
                            <div className={`${styles.left} display-flex align`}>
                                <div className={`${styles.logo} cursor`} onClick={() => push("/products")}>
                                    {user?.Nombre ? user?.Nombre : "Olei"}
                                </div>

                                {
                                    (user?.TipoUsuario == "2" && client?.Id_Almacen) &&
                                    <div className={`${styles.client} display-flex align cursor`} onClick={() => setModalClientsVisible(true)}>
                                        <span>/</span>
                                        <div className={`${styles.circular} display-flex allCenter`}>{client.Nombre.slice(0, 1)}</div>
                                        <p className={`${styles.name} display-flex align`}>{client.Nombre}</p>
                                        <p className={styles.description}>Cliente</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 icon" style={{ marginLeft: "1em" }}>
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                                        </svg>
                                    </div>
                                }
                            </div>


                            <div className={`${styles.right} display-flex`}>
                                {/* {
                                    pathname === "/cart" || /^\/profile\//.test(pathname) || pathname === "/profile" || pathname === "/onboarding/search" ?
                                        <></> :
                                        <div className={`${styles.search} display-flex allCenter cursor`} onClick={() => setModalSearchVisible(true)} >
                                            <button className='display-flex align cursor'>
                                                <FontAwesomeIcon icon={faSearch} className={`icon`} />
                                                <p>Buscar</p>
                                            </button>
                                        </div>
                                } */}
                                <div className={`${styles.orders} display-flex align cursor`} onClick={() => push("/profile/request")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-6 h-6 icon">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                    </svg>
                                    <p>Pedidos</p>
                                </div>

                                <div className={`${styles.item} ${styles.profile} display-flex allCenter`} >
                                    <div className={`${styles.icon} display-flex allCenter`} onClick={() => setOpenModalMenu?.(true)}>
                                        <p>M</p>
                                    </div>

                                    {
                                        profileOpen &&
                                        <div className={styles.profileBox}>
                                            <div className={styles.link} onClick={() => push("/profile")}>Perfil</div>

                                            <div
                                                className={`${styles.link} ${styles.logout}`}
                                                onClick={onLogOut}
                                            >
                                                Cerrar Sesión
                                            </div>
                                        </div>
                                    }
                                </div>

                                {
                                    pathname === "/cart" ?
                                        <></>
                                        :
                                        <div className={`${styles.item}  ${styles.cart}  display-flex allCenter`} onClick={() => setOpenModalCart(true)}>
                                            <div className={`${styles.circle} display-flex allCenter`}>
                                                <p>{numberOfItems}</p>
                                            </div>
                                            <svg className="w-6 h-6 icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                            </svg>
                                        </div>
                                }
                            </div>
                        </div>
                }

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
