import { FC } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export const CodeBlock: FC<CodeBlockProps> = ({ code, language = 'typescript' }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-xl overflow-hidden">
      <button
        onClick={copyToClipboard}
        className="absolute right-4 top-4 p-2 rounded-lg bg-gray-800/80 text-gray-300 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-gray-700"
      >
        {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
      </button>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          borderRadius: '0.75rem',
          padding: '1.5rem',
          backgroundColor: '#1a1b26',
        }}
        className="shadow-xl"
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};