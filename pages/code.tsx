import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import codeStyles from '../styles/CodeView.module.css'
import CodeView from '../components/CodeView'
import logo from '../components/logo'
import axios from 'axios'
import React, { useState } from 'react'
import AlertDismissable from '../components/DismissableAlert'

const Code: NextPage = () => {
  const API_URL = 'https://s6wsreqrlb.execute-api.us-east-1.amazonaws.com'
  const [question, setQuestion] = useState<string>('Get the kth largest subarray for the following: [1,2,3,4,5]')
  
 // GET question title w/ particular ID. 
  const getQuestion = (question: number) => {
    const q: string  = question.toString()
    const appId = process.env.NEXT_PUBLIC_APP_ID?.toString()
    const params: string = `qId=${q}&appId=${appId}`
    axios
      .get(API_URL + `/get-question-data?${params}`)
      .then((res) => {
        // console.log(res.data)

        const title = res.data.title
        setQuestion(title)
      })
      .catch((e) => {
        console.log('Error getting question.', e)
      })
  }
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Code | Avalgo</title>
        <meta name="description" content="Avalgo - A free, play-to-earn coding dApp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{logo}</h1>
        <h1 className={styles.title}>Code</h1>
        <div className={codeStyles.main}>
        <AlertDismissable 
        title="AvalgoPass required to claim rewards!" 
        body="Since you don't have one already, claim an AvalgoPass free below (just pay gas):"
        />
        <CodeView />
        </div>
      </main>

      <footer className={styles.footer}>
        <a>
          made w/ ❤️ by olan.eth
        </a>
      </footer>
    </div>
  )
}

export default Code