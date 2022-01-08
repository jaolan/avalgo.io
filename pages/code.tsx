import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import codeStyles from '../styles/CodeView.module.css'
import AvaxPrice from './components/AvaxPrice'
import CodeView from './components/CodeView'
import logo from './components/logo'
import Bounty from './components/Bounty'
import axios from 'axios'
import { useState } from 'react'

const code: NextPage = () => {
  const API_URL = 'http://localhost:80/'
  const [question, setQuestion] = useState<string>('Get the kth largest subarray for the following: [1,2,3,4,5]')
  
 // GET question title w/ particular ID. 
  const getQuestion = (question: number) => {
    axios
      .get(API_URL + 'questions/' + question.toString())
      .then((res) => {
        console.log(res.data)
        // Set the CodeView code as question + template + testcase
        setQuestion(res.data.title
        )
      })
      .catch((e) => {
        console.log('Error getting question.', e)
      })
  }
  
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
      <div className={codeStyles.main}>
      <CodeView />
      </div>
    </div>
  )
}

export default code