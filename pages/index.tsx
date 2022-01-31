import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import CodeView from '../components/CodeView';
import logo from '../components/logo'

const Home: NextPage = () => {
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Avalgo</title>
        <meta name="description" content="Avalgo - A free, play-to-earn coding dApp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className={styles.main}>
        <h1 className={styles.title}>
          {logo}
        </h1>
        <h1 className={styles.title}>
          Avalgo
        </h1>

        <p className={styles.description}>
          Solve algorithms, earn AVAX rewards 🔺
        </p>

        <p className={styles.center}>
          Avalgo is a play-to-earn coding platform where anyone can get paid to learn to code. Connect your wallet to start earning and learning.
        </p>

        <h1 className={styles.description}>
          How does it work?
        </h1>
        <div className={styles.centeredContainer}>
        <p className={styles.centeredContainerMobile}>
          With Avalgo, you connect your Avalanche wallet to play. 
          Once you connect, you can answer coding and algorithm quesitons to aim for rewards.
          Answering questions correctly will earn you a bounty - the harder the question, the larger the bounty!
          All rewards are paid in the native currency, AVAX.
        </p>
        </div>

        <CodeView />
      </main>

      <footer className={styles.footer}>
        <a>
          made w/ ❤️ by olan.eth
        </a>
      </footer>
    </div>
  )
}

export default Home
