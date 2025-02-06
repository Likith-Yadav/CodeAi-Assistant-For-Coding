import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Clock, Code2, Bug, Sparkles, X } from 'lucide-react';
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

interface ChatHistoryProps {
  showMobile?: boolean;
  onClose?: () => void;
}

export default function ChatHistory({ showMobile, onClose }: ChatHistoryProps) {
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
    <>
      {/* Desktop sidebar */}
      <div className="w-64 h-screen border-r border-gray-800/50 bg-gray-950/50 backdrop-blur-xl fixed left-0 top-0 pt-20 overflow-y-auto hidden md:block">
        <ChatHistoryContent chats={chats} />
      </div>

      {/* Mobile bottom sheet */}
      {showMobile && (
        <div className="fixed inset-0 bg-black/50 z-50 md:hidden">
          <div className="absolute bottom-0 left-0 right-0 bg-gray-950 border-t border-gray-800 rounded-t-2xl max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-gray-950 p-4 border-b border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-400">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">Recent Chats</span>
              </div>
              <button 
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <ChatHistoryContent chats={chats} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ChatHistoryContent({ chats }: { chats: ChatItem[] }) {
  const location = useLocation();
  
  return (
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
  );
} 