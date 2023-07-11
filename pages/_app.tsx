import { AuthProvider } from '@/context'
import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar'
import '../styles/globals.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ThemeProvider from '@/context/Theme/ThemeProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress color="#EF476F" height={4} />
      <AuthProvider>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthProvider>
    </>
  )
}
