import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { MoralisProvider } from 'react-moralis'
import Navigation from './components/Navigation'

const appId = process.env.NEXT_PUBLIC_MORALIS_APP_ID as string
const serverUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER_ID as string

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider
      appId={appId}
      serverUrl={serverUrl}
    >
      <Navigation/>
      <Component {...pageProps} />
    </MoralisProvider>
  )
}

export default MyApp
