import { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark }from './oneDarkTheme';
import axios from 'axios';

import styles from '/styles/CodeView.module.css'


export default function CodeView() {
  const userCode = 'function mul(a, b) {\n  return a * b\n}'
  const testCode = '\n\n// -- Do not write below this line! --\nconst args = process.argv.slice(2)\nconst\n  a = args[0],\n  b = args[1],\n  res = args[2]\nif(res != mul(a, b)) {\n  throw \'Test case failed\'\n}'

  // set states for UI
  const [code, setCode] = useState(
    userCode + testCode
  )

  // submit code to 'backend'
  const submitCode = () => {
    axios
      .post('http://localhost:80/js', {code})
      .then((res) => console.log(res))
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
      <button className={styles.submitBtn} onClick={submitCode}>
        Run Tests
      </button>
    </div>
  );
}