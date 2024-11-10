import React, { ReactNode, useContext, useState } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
import Footer from '../Navigation/Footer';
import Header from '../Navigation/Header/Header';
import Image from 'next/image';
import { AuthContext } from '@/context';
import ModalCart from '../Modals/ModalsComponents/ModalCart';
import ModalMenu from '../Modals/ModalsComponents/ModalMenu';
import styles from '../../styles/Layouts.module.scss'

interface Props {
    children: ReactNode
}

export const Layout = ({ children }: Props) => {

    const [openModalCart, setOpenModalCart] = useState(false)
    const [openModalMenu, setOpenModalMenu] = useState(false)
    const { pathname } = useRouter()
    const { user } = useContext(AuthContext);


    const getBanner = () => {
        const database = user?.Baseweb
        const databaseSplit = database?.split('_')
        const newPath = databaseSplit?.[1]?.toLowerCase().trim();
        const banner = newPath ? `https://oleistorage.blob.core.windows.net/${newPath}/BANNER.png` : '/bannerOlei2.png';
        return banner;
    }

    return (
        <>
            <Head>
                <title>Olei web</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/circle-solid.svg" />
            </Head>

            <Header setOpenModalCart={setOpenModalCart} setOpenModalMenu={setOpenModalMenu} />

            <div className={styles.Layout}>
                {
                    pathname === '/products' &&
                    <div className={styles.banner}>
                        <Image
                            fill
                            alt="Banner"
                            src={getBanner()}
                            priority
                            quality={100}
                        />
                    </div>
                }

                <div>
                    {children}
                </div>
            </div>


            {
                pathname !== "/cart" &&
                <Footer />
            }

            <ModalCart
                visible={openModalCart}
                onClose={() => setOpenModalCart(false)}
            />

            <ModalMenu
                visible={openModalMenu}
                onClose={() => setOpenModalMenu(false)}
            />

            <Toaster />
        </>
    )
}
