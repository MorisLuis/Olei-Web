import { AuthProvider } from '@/context'
import '../styles/Globals.scss'
import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress color="#EF476F" height={4} />
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  )
}
