import React, { useEffect, useState } from 'react';
import styles from "../../styles/Pages/Home.module.scss";

import { LayoutOnboarding } from '@/components/Layouts/LayoutOnboarding';
import { SearchOnboarding } from '@/components/Inputs/searchOnboarding';
import ClientInterface from '@/interfaces/client';
import PageTransition from '@/components/PageTranstion';
import { getClients } from '@/services/clients';

const OnboardingSearch = () => {

    const [searchResults, setSearchResults] = useState<ClientInterface[]>([]);
    const [isEntering, setIsEntering] = useState(true);

    const handleSearchTerm = async (term: string) => {
        try {
            const Clients = await getClients(term);
            setSearchResults(Clients)
        } catch (error) {
            console.log({ error })
        }
    };

    useEffect(() => {
        setIsEntering(false);
    }, []);

    return (
        <PageTransition key="login-transition" isEntering={isEntering === false}>
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
                                    searchResults={searchResults}
                                    setSearchResults={setSearchResults}
                                    handleSearchTerm={handleSearchTerm}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutOnboarding>
        </PageTransition>

    );
}

export default OnboardingSearch
