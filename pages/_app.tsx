import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { MoralisProvider } from 'react-moralis'
import ConnectButton from './components/ConnectButton'
import styles from '../styles/Home.module.css'

const appId = process.env.NEXT_PUBLIC_MORALIS_APP_ID as string
const serverUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER_ID as string

function MyApp({ Component, pageProps }: AppProps) {
  return (

    <MoralisProvider
      appId={appId}
      serverUrl={serverUrl}
    >
      <div className={styles.connectBtn}>
        <ConnectButton />
      </div>
      <Component {...pageProps} />
    </MoralisProvider>
  )
}

export default MyApp
