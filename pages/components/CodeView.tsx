import { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark }from './oneDarkTheme';

import styles from '/styles/CodeView.module.css'


export default function CodeView() {
  // set states for UI
  const [code, setCode] = useState('console.log(\'hello world!\');')

  // submit code to 'backend'
  const submitCode = () => {
    console.log(code)
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