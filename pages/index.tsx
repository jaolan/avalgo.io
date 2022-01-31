import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '/styles/Home.module.css'
import logo from '../components/logo'
import MintButton from '../components/MintButton';
import { Button } from "react-bootstrap"
import { useRouter } from 'next/router';
import TestnetAlert from '../components/TestnetAlert';
import { useMoralis } from "react-moralis"

const Home: NextPage = () => {

  // Next router to push Code
  const router = useRouter()
  const { chainId } = useMoralis()
  const correctChain = chainId == '0xa869'
  const redirectUser = () => {
    router.push('/code')
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Avalgo</title>
        <meta name="description" content="Avalgo - A free, play-to-earn coding dApp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      { !correctChain 
        ? <div className={styles.testnet}>
            <TestnetAlert 
            title="Avalgo is on the Fuji Testnet!"
            body="Ensure your network is the Avalanche Fuji Testnet before connecting your wallet."
            />  
          </div> 
        : <div/>
      }
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
          Avalgo is a play-to-earn coding platform where anyone can get paid to learn to code.
        </p>

        <h1 className={styles.description}>
          How does it work?
        </h1>
        <div className={styles.centeredContainer}>
        <p className={styles.centeredContainerMobile}>
          To play and claim Avalgo rewards, you need an AvalgoPass NFT. 
          These are currently free to mint (pay gas), claim one below!
          <p/>
            <MintButton/>
          <p/>
        </p>
        <p className={styles.description3}>
          Once you connect your wallet, you can answer coding and algorithm quesitons to aim for rewards!
          Answering questions correctly will earn you a bounty - the harder the question, the larger the bounty!
          All rewards are paid in the native currency, AVAX.
        </p>
        </div>
        <h1 className={styles.description2}>
          Are you ready?
        </h1>
        <Button variant="danger" onClick = {redirectUser}> Let's Play! 
        </Button>
        {/* <CodeView /> */}
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
