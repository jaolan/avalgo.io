import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import ConnectWallet from './components/ConnectWallet.component'
import CodeView from './components/CodeView';
import AvaxPrice from './components/AvaxPrice';

const Home: NextPage = () => {

  return (
    <div className={styles.container}>
      <Head>
        <title>Code | Avalgo</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className={styles.main}>
        <h1 className={styles.title}>
          Avalgo
        </h1>

        <p className={styles.description}>
          Solve algorithms, earn AVAX rewards 🔺
        </p>

        <p className={styles.center}>
          Avalgo is a play-to-earn coding platform where anyone can get paid to learn to code. Connect your wallet to start earning and learning.
        </p>

        <CodeView />
        <AvaxPrice />
      </main>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  )
}

export default Home
