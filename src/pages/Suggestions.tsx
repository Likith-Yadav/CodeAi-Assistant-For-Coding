import React, { useState } from 'react';
import { Send, Sparkles, Lightbulb } from 'lucide-react';
import { generateCode } from '../lib/gemini';
import ReactMarkdown from 'react-markdown';
import { saveChat } from '../lib/firebase';
import { useAuth } from '@clerk/clerk-react';
import { CodeBlock } from '../components/CodeBlock';

export default function Suggestions() {
  const [idea, setIdea] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { userId } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) return;

    try {
      setLoading(true);
      setError('');
      const prompt = `Please provide a comprehensive analysis and suggestions for implementing the following idea:

${idea}

Please structure your response in the following format:

1. Project Overview
   - Brief summary of the idea
   - Key objectives and goals
   - Target users/audience

2. Technical Architecture
   - Recommended technology stack with justification
   - System architecture overview
   - Key components and their interactions

3. Implementation Strategy
   - Core features breakdown
   - Development phases
   - Estimated timeline
   - Required resources

4. Technical Considerations
   - Scalability considerations
   - Security requirements
   - Performance optimization
   - Potential technical challenges

5. Best Practices & Standards
   - Coding standards to follow
   - Architecture patterns to implement
   - Testing strategy
   - Documentation requirements

6. Additional Recommendations
   - Future enhancement possibilities
   - Maintenance considerations
   - Monitoring and analytics
   - Deployment strategy

Please provide specific examples and code snippets where relevant to illustrate key concepts.`;

      const result = await generateCode(prompt);
      setSuggestions(result);
      
      if (userId) {
        await saveChat(userId, {
          type: 'suggest',
          title: idea.slice(0, 50) + (idea.length > 50 ? '...' : ''),
          prompt: idea,
          response: result,
        });
      }
    } catch (err) {
      setError('Failed to generate suggestions. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-0">
      <div className="mb-8 md:mb-12 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-yellow-500/20 mb-4 md:mb-6">
          <Lightbulb className="w-6 h-6 md:w-8 md:h-8 text-yellow-400" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4 bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
          Professional Code Suggestions
        </h2>
        <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
          Share your project idea or technical challenge, and receive comprehensive, professional suggestions for implementation.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mb-8 md:mb-12">
        <div className="relative">
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Describe your project idea or technical challenge in detail..."
            className="w-full h-40 md:h-48 p-4 md:p-6 rounded-xl md:rounded-2xl bg-gray-800/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:outline-none resize-none border border-gray-700 text-sm md:text-base"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 md:right-4 bottom-2 md:bottom-4 px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl bg-yellow-500 hover:bg-yellow-400 transition-colors text-gray-900 font-semibold text-sm md:text-base flex items-center gap-2"
          >
            {loading ? (
              <>
                <Sparkles className="w-5 h-5 animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Get Professional Insights</span>
              </>
            )}
          </button>
        </div>
      </form>

      {error && (
        <div className="mb-8 p-6 rounded-xl bg-red-500/20 text-red-300 border border-red-500/20">
          <p className="flex items-center">
            <span className="mr-2">⚠️</span>
            {error}
          </p>
        </div>
      )}

      {suggestions && (
        <div className="space-y-6">
          <div className="prose prose-invert max-w-none bg-gray-800/30 p-8 rounded-2xl border border-gray-700">
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
              {suggestions}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}