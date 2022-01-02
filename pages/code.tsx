import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import codeStyles from '../styles/CodeView.module.css'
import AvaxPrice from './components/AvaxPrice'
import CodeView from './components/CodeView'
import { useMoralis } from 'react-moralis'

const code: NextPage = () => {
  const { user } = useMoralis()

  return (
    <div className={styles.container}>
      <Head>
        <title>Code | AVAX Name</title>
        <meta name="description" content="Code" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className={styles.title}>Code</h1>
      <p className={styles.description}>Get the kth largest subarray for the following: [1,2,3,4,5]</p>
      <div className={codeStyles.main}>
      <CodeView />
      </div>
      <div className={styles.center}>
        <p>Bounty: 0.04 AVAX</p>
        <AvaxPrice />
      </div>
    </div>


  )
}

export default code