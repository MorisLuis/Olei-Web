import { AuthProvider } from '@/context'
import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar'
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/Globals.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress color="#068FFF" height={4} />
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  )
}
