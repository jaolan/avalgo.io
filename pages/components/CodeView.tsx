import { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark }from './oneDarkTheme';
import axios from 'axios';

import styles from '/styles/CodeView.module.css'
import { fail } from 'assert';


export default function CodeView() {
  const userCode = 'function mul(a, b) {\n  return a * b\n}'
  const testCode = '\n\n// -- Do not write below this line! --\nconst args = process.argv.slice(2)\nconst\n  a = args[0],\n  b = args[1],\n  res = args[2]\nconsole.log(res == mul(a,b))'

  // set states for UI
  const [code, setCode] = useState<string>(userCode + testCode)
  const [pass, setPass] = useState<boolean>(false)

  // submit code to 'backend'
  const submitCode = () => {
    axios
      .post('http://localhost:80/js', {code})
      .then((res) => {
        console.log(res)
        res.data.pass && res.data.pass.includes('true') ? 
          setPass(true) : setPass(false)
      })
  }

  // claim the reward for passing the question
  const claimReward = () => {
    console.log('calling contract and claiming reward...')
  }

  return (
    <div>
      <CodeMirror
      value={code}
      height="200px"
      theme="dark"
      extensions={[javascript({ jsx: true }), oneDark]}
      onChange={(value, viewUpdate) => {
        setCode(value)
        // console.log('value:', code)
      }}
      />
      <button className={styles.submitBtn} onClick={submitCode}>
        Submit Code
      </button>
      <button className={styles.submitBtn} onClick={claimReward} disabled={!pass}>
        Claim Reward 🔺
      </button>
    </div>
  );
}