import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import codeStyles from '../styles/CodeView.module.css'
import AvaxPrice from './components/AvaxPrice'
import CodeView from './components/CodeView'
import logo from './components/logo'
import Bounty from './components/Bounty'

const code: NextPage = () => {
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Code | Avalgo</title>
        <meta name="description" content="Code" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>{logo}</h1>
        <h1 className={styles.title}>Code</h1>
      </main>
      <p className={styles.description}>Get the kth largest subarray for the following: [1,2,3,4,5]</p>
      <div className={styles.center}>
        <Bounty/>
      </div>
      <div className={codeStyles.main}>
      <CodeView />
      </div>
    </div>
  )
}

export default code