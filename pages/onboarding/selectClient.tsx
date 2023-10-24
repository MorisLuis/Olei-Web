import React, { useContext, useState } from 'react';
import styles from "../../styles/Pages/Home.module.scss";

import { LayoutOnboarding } from '@/components/Layouts/LayoutOnboarding';
import { SearchOnboarding } from '@/components/Inputs/searchOnboarding';
import { useRouter } from 'next/router';
import { api } from '@/api/api';
import ClientInterface from '@/interfaces/client';
import { ClientContext } from '@/context';

const OnboardingSearch = () => {

    const { push } = useRouter()
    const [searchResults, setSearchResults] = useState<ClientInterface[]>([]);
    const { selectClient } = useContext(ClientContext);

    const handleSearchTerm = async (term: string) => {
        try {
            const { data: { Clients } } = await api.get(`/api/search/client?term=${term}`);
            setSearchResults(Clients)
        } catch (error) {
            console.log({ error })
        }
    };

    const handleContinue = (client : ClientInterface) => {
        selectClient(client as ClientInterface)
        push(`/products`)
    }

    return (
        <LayoutOnboarding>
            <div className={`${styles.home} gradient-background display-flex column`}>
                <div className={styles.content}>
                    <div className={styles.onboardingBox}>
                        <div className={styles.header}>
                            <h1 className={styles.title}>Selecciona el cliente</h1>
                            <p className={styles.text}>Este sera el cliente al que le crearas la orden, podras modificarlo despues.</p>
                        </div>

                        <div className={styles.search}>
                            <SearchOnboarding
                                onSubmit={(client) => handleContinue(client as ClientInterface)}
                                searchResults={searchResults}
                                setSearchResults={setSearchResults}
                                handleSearchTerm={handleSearchTerm}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.lineYellow}></div>

        </LayoutOnboarding>
    );
}

export default OnboardingSearch
