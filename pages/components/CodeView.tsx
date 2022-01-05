import { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark }from './oneDarkTheme';
import axios from 'axios';

import styles from '/styles/CodeView.module.css'
import { useMoralis } from 'react-moralis';
import ConnectWallet from './ConnectWallet.component';
import Payout from './Payout';
import { Button, ButtonGroup }from 'react-bootstrap'

export default function CodeView() {
  const userCode = 'function mul(a, b) {\n  return a * b\n}'
  const testCode = '\n\n// -- Do not write below this line! --\nconst args = process.argv.slice(2)\nconst\n  a = args[0],\n  b = args[1],\n  res = args[2]\nconsole.log(res == mul(a,b))'

  // set states for UI
  const [code, setCode] = useState<string>(userCode + testCode)
  const [pass, setPass] = useState<boolean>(false)
  const [showFail, setShowFail] = useState<boolean>(false)
  const { user } = useMoralis()

  // submit code to 'backend'
  const submitCode = () => {
    axios
      .post('http://localhost:80/js', {code})
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

  // claim the reward for passing the question
  const claimReward = () => {
    console.log('calling contract and claiming reward...')
    const reward: number = 40000
    Payout.claimReward(reward)
  }

  return (
    <div>
      <div className={styles.codeView}>
        <CodeMirror
        className={styles.codeViewMobile}
        value={code}
        height="200px"
        width="22rem"
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