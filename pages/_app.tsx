import { AuthProvider, CartProvider, ClientProvider, FiltersProvider } from '@/context'
import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar'
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/Globals.scss';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <AuthProvider>
        <CartProvider>
          <ClientProvider>
            <FiltersProvider>
              <NextNProgress color="#068FFF" height={4} />
              <Component {...pageProps} />
            </FiltersProvider>
          </ClientProvider>
        </CartProvider>
      </AuthProvider>
    </>
  )
}
