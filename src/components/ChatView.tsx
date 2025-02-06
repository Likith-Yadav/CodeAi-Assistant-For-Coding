import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { CodeBlock } from './CodeBlock';
import ReactMarkdown from 'react-markdown';
import { Code2, Bug, Sparkles } from 'lucide-react';
import { useAuth } from '@clerk/clerk-react';

export default function ChatView() {
  const { id, type } = useParams();
  const { userId } = useAuth();
  const [chat, setChat] = useState<any>(null);

  useEffect(() => {
    const fetchChat = async () => {
      if (!id || !userId) return;
      const docRef = doc(db, 'users', userId, 'chats', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setChat({ id: docSnap.id, ...docSnap.data() });
      }
    };
    fetchChat();
  }, [id, userId]);

  const getIcon = () => {
    switch (type) {
      case 'generate':
        return <Code2 className="w-8 h-8 text-blue-400" />;
      case 'debug':
        return <Bug className="w-8 h-8 text-green-400" />;
      case 'suggest':
        return <Sparkles className="w-8 h-8 text-yellow-400" />;
      default:
        return null;
    }
  };

  if (!chat) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:px-8">
      <div className="space-y-6">
        {/* User's prompt */}
        <div className="p-6 rounded-2xl bg-gray-950/50 backdrop-blur-xl border border-gray-800/50 shadow-2xl">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 p-2 bg-gray-800 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-gray-400 text-sm mb-2">You</div>
              <p className="text-gray-200 text-base whitespace-pre-wrap break-words">{chat.prompt}</p>
            </div>
          </div>
        </div>

        {/* AI's response */}
        <div className="p-6 rounded-2xl bg-gray-950/50 backdrop-blur-xl border border-gray-800/50 shadow-2xl">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 p-2 bg-blue-600/20 rounded-lg">
              {getIcon()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-gray-400 text-sm mb-2">Assistant</div>
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
                  {chat.response}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 