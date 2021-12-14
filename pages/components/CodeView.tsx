import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

// Custom theme needs to be declared and imported for CodeMirror.
import { oneDark }from './oneDarkTheme';

const code = 'console.log(\'hello world!\');'

export default function CodeView() {
  return (
    <CodeMirror
    value={code}
    height="200px"
    theme="dark"
    extensions={[javascript({ jsx: true }), oneDark]}
    onChange={(value, viewUpdate) => {
      console.log('value:', value);
    }}
    />
  );
}