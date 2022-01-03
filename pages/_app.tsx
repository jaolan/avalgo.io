import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { MoralisProvider } from 'react-moralis'
import ConnectButton from './components/ConnectButton'
import styles from '../styles/Home.module.css'
import Navbar from './components/Navbar'

const appId = process.env.NEXT_PUBLIC_MORALIS_APP_ID as string
const serverUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER_ID as string

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider
      appId={appId}
      serverUrl={serverUrl}
    >
      <Navbar />
      <Component {...pageProps} />
    </MoralisProvider>
  )
}

export default MyApp
