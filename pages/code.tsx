import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import CodeView from './components/CodeView'

const code: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Code | AVAX Name</title>
        <meta name="description" content="Code" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className={styles.title}>Code</h1>
      <p className={styles.description}>Get the kth largest subarray for the following: [1,2,3,4,5]</p>
      <div className="absolute top-20 bottom-40 left-10 right-10">
      <CodeView />
      </div>
      <p>Bounty: 0.04 AVAX</p>
    </div>


  )
}

export default code