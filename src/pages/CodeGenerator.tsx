import React, { useState } from 'react';
import { Code2, Sparkles } from 'lucide-react';
import { generateCode } from '../lib/gemini';
import { CodeBlock } from '../components/CodeBlock';
import ReactMarkdown from 'react-markdown';
import { saveChat } from '../lib/firebase';
import { useAuth } from '@clerk/clerk-react';

export default function CodeGenerator() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [codeType, setCodeType] = useState<'complete' | 'specific'>('specific');
  const { userId } = useAuth();

  const getEnhancedPrompt = (userPrompt: string, type: 'complete' | 'specific') => {
    if (type === 'complete') {
      return `
Please provide a complete implementation exactly matching the requested technologies for: ${userPrompt}

Important Rules:
- DO NOT change or suggest different technologies than what was requested
- DO NOT add frameworks unless specifically asked
- Provide ONLY the requested implementation

Required Output Format:
1. File Structure:
   List all required files with their paths

2. Complete Code:
   Provide the FULL code for each file:

   filename: index.html
   \`\`\`html
   // Complete HTML code here
   \`\`\`

   filename: styles.css
   \`\`\`css
   // Complete CSS code here
   \`\`\`

   filename: script.js
   \`\`\`javascript
   // Complete JavaScript code here
   \`\`\`

3. Setup Instructions:
   - Simple steps to run the project
   - Any browser requirements
   - How to open/use the application

Note: Stick EXACTLY to the technologies mentioned in the prompt without suggesting alternatives.
`;
    }

    return `
Please provide the complete implementation for: ${userPrompt}

Include:
1. Implementation Details:
   - Full code implementation of the requested feature
   - All necessary functions and components
   - Any required imports or dependencies

2. Integration Guide:
   - Where to place the code
   - How to integrate with existing codebase
   - Any required configuration

3. Usage Example:
   - Example of how to use the implemented code
   - Sample usage scenarios
   - Any props or parameters needed

4. Additional Context:
   - Important considerations
   - Best practices for this implementation
   - Any potential edge cases to handle

Please provide the complete working code with proper explanations.
`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    try {
      setLoading(true);
      setError('');
      
      const enhancedPrompt = getEnhancedPrompt(prompt, codeType);
      const result = await generateCode(enhancedPrompt);
      setResponse(result);
      
      // Save to chat history
      if (userId) {
        await saveChat(userId, {
          type: 'generate',
          title: prompt.slice(0, 50) + (prompt.length > 50 ? '...' : ''),
          prompt,
          response: result,
        });
      }
    } catch (err) {
      setError('Failed to generate code. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto text-center">
      <div className="mb-12">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-blue-600/20 rounded-2xl">
            <Code2 className="w-12 h-12 text-blue-400" />
          </div>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent mb-4">
          AI Code Generator
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Transform your ideas into code. Describe what you want to build, and get a complete implementation guide with setup instructions and code.
        </p>
      </div>

      <div className="space-y-6">
        <div className="p-6 rounded-2xl bg-gray-950/50 backdrop-blur-xl border border-gray-800/50 shadow-2xl shadow-blue-500/5">
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setCodeType('specific')}
              className={`px-4 py-2 rounded-xl ${
                codeType === 'specific' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-800/50 text-gray-400'
              }`}
            >
              Specific Code
            </button>
            <button
              onClick={() => setCodeType('complete')}
              className={`px-4 py-2 rounded-xl ${
                codeType === 'complete' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-800/50 text-gray-400'
              }`}
            >
              Complete Project
            </button>
          </div>
          <div className="relative w-full">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full h-32 md:h-48 bg-gray-950/70 border border-gray-800/50 rounded-2xl p-4 md:p-6 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all placeholder:text-gray-600 text-base md:text-lg"
              placeholder={codeType === 'complete' 
                ? "Example: Create a full-stack todo list application using React and Node.js"
                : "Example: Add a dark mode toggle feature to a React component"
              }
            />
            <button 
              onClick={handleSubmit}
              disabled={loading}
              className="absolute right-2 md:right-4 bottom-2 md:bottom-4 px-4 md:px-6 py-2 md:py-3 bg-blue-600 rounded-xl font-semibold text-base md:text-lg shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Sparkles className="w-5 h-5 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Code2 className="w-5 h-5" />
                  <span>Generate Code</span>
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
          <div className={`p-6 rounded-2xl bg-gray-950/50 backdrop-blur-xl border border-gray-800/50 shadow-2xl shadow-blue-500/5 text-left`}>
            <div className="prose prose-invert max-w-none prose-pre:my-0 prose-p:my-3 prose-headings:my-4">
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