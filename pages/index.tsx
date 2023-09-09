import React, { useContext } from 'react';
import styles from "../styles/Pages/Home.module.scss";

import { useSpring, animated } from 'react-spring';
import { Layout } from '@/components/Layouts/Layout';
import { SearchHome } from '@/components/Inputs/searchHome';
import { useRouter } from 'next/router';
import { FiltersContext } from '@/context';

const Home = () => {

    const { push } = useRouter()
    const { addFilters } = useContext(FiltersContext);

    const gradientProps = useSpring({
        from: {
            background:
                'linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(237, 237, 237, 1) 47%, rgba(237, 237, 237, 1) 59%, rgba(245, 147, 212, 0.05) 86%, rgba(9, 118, 223, 0.05) 98%)',
        },
        to: async (next) => {
            while (1) {
                await next({
                    background:
                        'linear-gradient(0deg, rgba(245, 147, 212, 0.1) 0%, rgba(245, 147, 212, 0.2) 30%, rgba(245, 147, 212, 0.3) 40%, rgba(245, 147, 212, 0.4) 70%, rgba(245, 147, 212, 0.45) 100%)',
                });
                await next({
                    background:
                        'linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(237, 237, 237, 1) 47%, rgba(237, 237, 237, 1) 59%, rgba(245, 147, 212, 0.05) 86%, rgba(9, 118, 223, 0.05) 100%)',
                });
            }
        },
        config: {
            duration: 6000,
        },
    });

    const handleSearch = (url : string) => {
        push(`/products?nombre=${url}`)
        addFilters({
            nombre: url
        })
    }

    return (
        <>

            <animated.div
                className="gradient-background"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: -1,
                    ...gradientProps,
                }}
            />

            <Layout>
                <div className={`${styles.home} gradient-background display-flex column`}>
                    <div className={styles.content}>
                        <div className={styles.header}>
                            <h1  className={styles.title}>Rosco</h1>
                            <p className={styles.text}>Connect with the worlds best Independents</p>
                        </div>
                        <div className={styles.search}>
                            <SearchHome onclick={(url) => handleSearch(url)}/>
                        </div>
                    </div>

                </div>
            </Layout>

        </>
    );
}

export default Home
