import { AuthProvider, CartProvider, ClientProvider, FiltersProvider } from '@/context'
import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar'
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/Globals.scss';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter();

  return (
    <>
      {
        router.route !== '/products' &&
        <NextNProgress color="#EDBD42" height={4} />
      }

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
