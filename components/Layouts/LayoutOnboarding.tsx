import React, { ReactNode, useState } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
import ModalCart from '../Modals/ModalCart';
import Footer from '../Navigation/Footer';
import Header from '../Navigation/Header';
import ModalMenu from '../Modals/ModalMenu';
import Image from 'next/image';

interface Props {
    children: ReactNode
}

export const LayoutOnboarding = ({ children }: Props) => {

    const [openModalCart, setOpenModalCart] = useState(false)
    const [openModalMenu, setOpenModalMenu] = useState(false)
    const { pathname } = useRouter()

    return (
        <>
            <Head>
                <title>Olei web</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/circle-solid.svg" />
            </Head>

            {
                pathname !== "/login" &&
                <Header setOpenModalCart={setOpenModalCart} setOpenModalMenu={setOpenModalMenu} />
            }


            <div>
                {children}
            </div>

            {/* <Footer /> */}

            <ModalMenu
                visible={openModalMenu}
                onClose={() => setOpenModalMenu(false)}
            />

            <ModalCart
                visible={openModalCart}
                onClose={() => setOpenModalCart(false)}
            />


            <Toaster />
        </>
    )
}
