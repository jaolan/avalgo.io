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

      <CodeView />
    </div>


  )
}

export default code