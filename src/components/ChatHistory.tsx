import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Clock, Code2, Bug, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface ChatItem {
  id: string;
  type: 'generate' | 'debug' | 'suggest';
  title: string;
  timestamp: number;
  prompt: string;
}

export default function ChatHistory() {
  const { currentUser } = useAuth();
  const location = useLocation();
  const [chats, setChats] = useState<ChatItem[]>([]);

  useEffect(() => {
    if (!currentUser) return;

    const chatsRef = collection(db, 'users', currentUser.uid, 'chats');
    const q = query(chatsRef, orderBy('timestamp', 'desc'), limit(10));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chatData: ChatItem[] = [];
      snapshot.forEach((doc) => {
        chatData.push({ id: doc.id, ...doc.data() } as ChatItem);
      });
      setChats(chatData);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'generate':
        return <Code2 className="w-4 h-4" />;
      case 'debug':
        return <Bug className="w-4 h-4" />;
      case 'suggest':
        return <Sparkles className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-64 h-screen border-r border-gray-800/50 bg-gray-950/50 backdrop-blur-xl fixed left-0 top-0 pt-20 overflow-y-auto hidden md:block">
      <div className="p-4">
        <div className="flex items-center gap-2 text-gray-400 mb-4">
          <Clock className="w-4 h-4" />
          <span className="text-sm font-medium">Recent Chats</span>
        </div>
        <div className="space-y-2">
          {chats.map((chat) => (
            <Link
              key={chat.id}
              to={`/${chat.type}/${chat.id}`}
              className={`block p-3 rounded-lg text-sm ${
                location.pathname.includes(chat.id)
                  ? 'bg-blue-500/20 text-blue-400'
                  : 'text-gray-400 hover:bg-gray-800/50'
              } transition-all`}
            >
              <div className="flex items-center gap-2 mb-1">
                {getIcon(chat.type)}
                <span className="font-medium truncate">{chat.title || 'Untitled Chat'}</span>
              </div>
              <p className="text-xs text-gray-500 truncate">
                {chat.prompt}
              </p>
            </Link>
          ))}
          {chats.length === 0 && (
            <div className="text-center text-gray-500 text-sm py-4">
              No chats yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 