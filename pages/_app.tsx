import { AuthProvider, CartProvider } from '@/context'
import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar'
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/Globals.scss';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {

  const {asPath,push, pathname} = useRouter();
  console.log({pathname})
  console.log({asPath})


  useEffect(() => {
    if(asPath === "/") {
      push('/products?page=1&limit=20');
    }
  }, []);

  return (
    <>

      <CartProvider>
        <NextNProgress color="#068FFF" height={4} />
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </CartProvider>
    </>
  )
}
