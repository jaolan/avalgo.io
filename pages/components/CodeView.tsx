import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark }from './oneDarkTheme';
import axios from 'axios';

import styles from '/styles/CodeView.module.css'
import homeStyles from '/styles/Home.module.css'
import { useMoralis } from 'react-moralis';
import ConnectWallet from './ConnectWallet.component';
import Payout from './Payout';
import { Button, ButtonGroup }from 'react-bootstrap'
import logo from './logo';
import Bounty from './Bounty';

const CodeView = () => {
  const userCode = 'function mul(a, b) {\n  return a * b\n}'
  const testCode = '\n\n// -- Do not write below this line! --\nconst args = process.argv.slice(2)\nconst\n  a = args[0],\n  b = args[1],\n  res = args[2]\nconsole.log(res == mul(a,b))'

  // set states for UI
  const [questionTitle, setQuestionTitle] = useState<string>('Get the kth largest subarray for the following: [1,2,3,4,5]')
  const [code, setCode] = useState<string>(userCode + testCode)
  const [pass, setPass] = useState<boolean>(false)
  const [showFail, setShowFail] = useState<boolean>(false)
  const [count, setCount] = useState<number>(1)
  const [numQuestions, setNumQuestions] = useState<number>(2)

  const { user } = useMoralis()

  const API_URL = 'http://localhost:80/'

  // submit code to 'backend'
  const submitCode = () => {
    axios
      .post(API_URL + 'js', {code})
      .then((res) => {
        console.log(res)
        // set pass/fail, set/hide fail UI to render
        if(res.data.pass && res.data.pass.includes('true')){
          setPass(true)
          setShowFail(false)
        } else {
          setPass(false)
          setShowFail(true)
        }  
      })
  }

  // GET question w/ particular ID. Set state to that question. Gives access to:
  // 
  // "question1":{
  //   "title":"Create a function to multiply two numbers.",
  //   "template":"function mul(a, b) {\n  return a * b\n}",
  //   "testcase":"\n\n// -- Do not write below this line! --\nconst args = process.argv.slice(2)\nconst\n  a = args[0],\n  b = args[1],\n  res = args[2]\nconsole.log(res == mul(a,b))",
  //   "reward":0.4
  const getQuestion = (question: number) => {
    axios
      .get(API_URL + 'questions/' + question.toString())
      .then((res) => {
        console.log(res.data)
        // Set the CodeView code as question + template + testcase
        setQuestionTitle(res.data.title)
        setCode(
          '// ' + res.data.title + '\n'
          + '// reward: 🔺' + res.data.reward + '\n\n'
          + res.data.template
          + res.data.testcase
        )
      })
      .catch((e) => {
        console.log('Error getting question.', e)
      })
  }

  // claim the reward for passing the question
  const claimReward = () => {
    console.log('calling contract and claiming reward...')
    const reward: number = 40000
    Payout.claimReward(reward)
  }

  return (
    <div>
      <p className={homeStyles.description}>{questionTitle}</p>
      <div className={homeStyles.center}>
        <Bounty/>
      </div>
      <div className={styles.codeView}>
        <CodeMirror
        className={styles.codeViewMobile}
        value={code}
        height="250px"
        width="30rem"
        theme="dark"
        extensions={[javascript({ jsx: true }), oneDark]}
        onChange={(value, viewUpdate) => {
          setCode(value)
          // console.log('value:', code)
        }}
        />
      </div>
      {/* Show/hide pass UI */}
      { pass ? (
        <div className={styles.center}>
          <h1>Your answer is correct, good job!</h1>
          <p>Claim your reward below.</p>
        </div>
      ) 
      : (
        <div/>
      )}
      {/* Show/hide fail UI */}
      { showFail ? (
        <div className={styles.center}>
          <h1>Your answer was incorrect, please try again. </h1>
        </div>
      ) : ( 
        <div/>
      )}
      { user?.authenticated ? (
        <div className={styles.center}>
        <ButtonGroup>
          <Button variant="danger" className={styles.submitBtn} onClick={submitCode}>
            Submit Code
          </Button>
          {/* <p style={{ padding: '1px'}} /> */}
          <Button variant="danger" className={styles.submitBtn} onClick={claimReward} disabled={!pass}>
            Claim AVAX 🔺
          </Button>
        </ButtonGroup>
        <Button variant="danger" className={styles.submitBtn} onClick={() => {
            count < numQuestions ? setCount(count+1) : setCount(count)
            getQuestion(count)
          }}
        >
          Next ➡
        </Button>
      </div>
      ) : (
        <div className={styles.center}>
          <h1> Answer and claim AVAX rewards by connecting your wallet!</h1>
          <ConnectWallet />
        </div>
      )}
    </div>
  );
}

export default CodeView