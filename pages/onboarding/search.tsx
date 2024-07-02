import React, { useContext, useState } from 'react';
import styles from "../../styles/Pages/Home.module.scss";

import { SearchOnboarding } from '@/components/Inputs/searchOnboarding';
import { useRouter } from 'next/router';
import { AuthContext, ClientContext, FiltersContext } from '@/context';
import { api } from '@/api/api';
import { LayoutOnboarding } from '@/components/Layouts/LayoutOnboarding';

const OnboardingSearch = () => {

    const { push } = useRouter()
    const { addFilters } = useContext(FiltersContext);
    const { user } = useContext(AuthContext);

    const [searchResults, setSearchResults] = useState<string[]>([])

    const handleSearch = (url: string) => {
        push(`/products?nombre=${url}`)
        addFilters({
            nombre: url
        })
    }

    const handleSearchTerm = async (term: string) => {
        try {
            const { data: { products } } = await api.get(`/api/search?nombre=${term}`);
            setSearchResults(products)
        } catch (error) {
            console.log({ error })
        }
    };

    return (
        <LayoutOnboarding>
            <div className={`${styles.home} gradient-background display-flex column`}>
                <div className={styles.content}>
                <div className={styles.onboardingBox}>
                    <div className={styles.header}>
                        <h1 className={styles.title}>{user?.Nombre ? user?.Nombre : "Olei"}</h1>
                        <p className={styles.text}>Busca el producto que necesites.</p>
                    </div>
                    <div className={styles.search}>
                        <SearchOnboarding
                            onSubmit={(url) => handleSearch(url as string || "" )}
                            searchResults={searchResults}
                            setSearchResults={setSearchResults}
                            handleSearchTerm={handleSearchTerm}
                            label="Buscar"
                        />
                    </div>
                </div>
                </div>
            </div>
        </LayoutOnboarding>
    );
}

export default OnboardingSearch
