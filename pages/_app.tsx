import { AuthProvider, CartProvider, ClientProvider, FiltersProvider } from '@/context'
import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar'
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/Globals.scss';

export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <AuthProvider>
        <CartProvider>
          <ClientProvider>
            <FiltersProvider>
              <Component {...pageProps} />
            </FiltersProvider>
          </ClientProvider>
        </CartProvider>
      </AuthProvider>
    </>
  )
}
