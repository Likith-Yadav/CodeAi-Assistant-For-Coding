import React, { useState } from 'react';
import { Send, Sparkles, Lightbulb } from 'lucide-react';
import { generateCode } from '../lib/gemini';
import ReactMarkdown from 'react-markdown';
import { saveChat } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';

function Suggestions() {
  const [idea, setIdea] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) return;

    try {
      setLoading(true);
      setError('');
      const prompt = `I have a coding idea and I need suggestions for implementation. Here's my idea: ${idea}\n\nPlease provide:\n1. Technical approach suggestions\n2. Potential challenges and solutions\n3. Best practices to consider\n4. Technology stack recommendations`;
      const result = await generateCode(prompt);
      setSuggestions(result);
      
      // Save to chat history with original idea as prompt
      if (currentUser) {
        await saveChat(currentUser.uid, {
          type: 'suggest',
          title: idea.slice(0, 50) + (idea.length > 50 ? '...' : ''),
          prompt: idea, // Save the original idea instead of the formatted prompt
          response: result,
        });
      }
    } catch (err) {
      setError('Failed to get suggestions. Please try again.');
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
          Get Code Suggestions
        </h2>
        <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
          Share your coding idea, and I'll provide implementation suggestions.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mb-8 md:mb-12">
        <div className="relative">
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Describe your coding idea..."
            className="w-full h-32 md:h-40 p-4 md:p-6 rounded-xl md:rounded-2xl bg-gray-800/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:outline-none resize-none border border-gray-700 text-sm md:text-base"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 md:right-4 bottom-2 md:bottom-4 px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl bg-yellow-500 text-sm md:text-base"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 animate-spin" />
                <span>Analyzing...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Send className="w-5 h-5" />
                <span>Get Suggestions</span>
              </div>
            )}
          </button>
        </div>
      </form>

      {error && (
        <div className="mb-8 p-6 rounded-xl bg-red-500/20 text-red-300 border border-red-500/20 animate-fade-in">
          <p className="flex items-center">
            <span className="mr-2">⚠️</span>
            {error}
          </p>
        </div>
      )}

      {suggestions && (
        <div className="space-y-6 animate-fade-in">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <Sparkles className="w-6 h-6 mr-2 text-yellow-400" />
            Suggestions
          </h2>
          <div className="prose prose-invert max-w-none bg-gray-800/30 p-8 rounded-2xl border border-gray-700">
            <ReactMarkdown>{suggestions}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}

export default Suggestions;