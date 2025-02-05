import React, { useState } from 'react';
import { Bug, Sparkles } from 'lucide-react';
import { generateCode } from '../lib/gemini';
import { CodeBlock } from '../components/CodeBlock';
import ReactMarkdown from 'react-markdown';
import { saveChat } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';

export default function Debugger() {
  const [code, setCode] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    try {
      setLoading(true);
      setError('');
      const result = await generateCode(`Debug this code and explain the issues: ${code}`);
      setResponse(result);
      
      // Save to chat history
      if (currentUser) {
        await saveChat(currentUser.uid, {
          type: 'debug',
          title: code.slice(0, 50) + (code.length > 50 ? '...' : ''),
          prompt: code,
          response: result,
        });
      }
    } catch (err) {
      setError('Failed to debug code. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto text-center">
      <div className="mb-12">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-green-600/20 rounded-2xl">
            <Bug className="w-12 h-12 text-green-400" />
          </div>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-green-200 bg-clip-text text-transparent mb-4">
          AI Code Debugger
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Let AI help you identify and fix bugs in your code. Paste your code below, and get detailed explanations 
          of issues along with suggested fixes. Perfect for troubleshooting and learning from mistakes.
        </p>
      </div>

      <div className="space-y-6">
        <div className="p-6 rounded-2xl bg-gray-950/50 backdrop-blur-xl border border-gray-800/50 shadow-2xl shadow-green-500/5">
          <div className="relative w-full">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-48 bg-gray-950/70 border border-gray-800/50 rounded-2xl p-6 text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all placeholder:text-gray-600 text-lg font-mono"
              placeholder="Paste your code here to debug..."
            />
            <button 
              onClick={handleSubmit}
              disabled={loading}
              className="absolute right-4 bottom-4 px-6 py-3 bg-green-600 rounded-xl font-semibold text-lg shadow-lg shadow-green-600/20 hover:bg-green-500 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Sparkles className="w-5 h-5 animate-spin" />
                  <span>Debugging...</span>
                </>
              ) : (
                <>
                  <Bug className="w-5 h-5" />
                  <span>Debug Code</span>
                </>
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-500/20 text-red-300 border border-red-500/20">
            {error}
          </div>
        )}

        {response && (
          <div className={`p-6 rounded-2xl bg-gray-950/50 backdrop-blur-xl border border-gray-800/50 shadow-2xl shadow-green-500/5 text-left`}>
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown
                components={{
                  code: ({ node, inline, className, children, ...props }: any) => {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline ? (
                      <CodeBlock
                        code={String(children).replace(/\n$/, '')}
                        language={match ? match[1] : undefined}
                      />
                    ) : (
                      <code className="bg-gray-800/50 px-2 py-1 rounded-md" {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {response}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}