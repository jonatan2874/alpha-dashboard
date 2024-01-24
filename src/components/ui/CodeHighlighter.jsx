import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CodeHighlighter = ({ code, language }) => <SyntaxHighlighter language={language} style={atomOneDark}>
    {code}
</SyntaxHighlighter>

export default CodeHighlighter;