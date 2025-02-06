import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Code2, Sparkles, Bug, LogOut, Menu, X, Clock } from 'lucide-react';
import { useState } from 'react';

export default function Navigation() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showMobileChats, setShowMobileChats] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  if (!currentUser) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-blue-600/20 p-2 rounded-lg">
              <Code2 className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
              CodeAI
            </span>
          </Link>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowMobileChats(!showMobileChats)}
              className="md:hidden p-2 text-gray-400 hover:text-white"
            >
              <Clock className="w-6 h-6" />
            </button>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              to="/generate" 
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-800/50 transition-all text-gray-300 hover:text-white"
            >
              <Code2 className="w-5 h-5" />
              <span>Generate</span>
            </Link>
            <Link 
              to="/suggest" 
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-800/50 transition-all text-gray-300 hover:text-white"
            >
              <Sparkles className="w-5 h-5" />
              <span>Suggest</span>
            </Link>
            <Link 
              to="/debug" 
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-800/50 transition-all text-gray-300 hover:text-white"
            >
              <Bug className="w-5 h-5" />
              <span>Debug</span>
            </Link>

            <div className="flex items-center gap-4 pl-4 border-l border-gray-800">
              <div className="flex flex-col items-end">
                <div className="text-sm font-medium text-gray-200">
                  {currentUser.displayName || currentUser.email?.split('@')[0]}
                </div>
                <div className="text-xs text-gray-400">
                  {currentUser.email}
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Mobile menu dropdown */}
          {isOpen && (
            <div className="absolute top-16 left-0 right-0 bg-gray-950/95 border-b border-gray-800/50 p-4 md:hidden">
              <div className="flex flex-col space-y-4">
                <Link 
                  to="/generate" 
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-800/50"
                >
                  <Code2 className="w-5 h-5" />
                  <span>Generate</span>
                </Link>
                <Link 
                  to="/suggest" 
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-800/50"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Suggest</span>
                </Link>
                <Link 
                  to="/debug" 
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-800/50"
                >
                  <Bug className="w-5 h-5" />
                  <span>Debug</span>
                </Link>
                <div className="pt-4 border-t border-gray-800">
                  <div className="flex flex-col items-start gap-2">
                    <div className="text-sm font-medium text-gray-200">
                      {currentUser.displayName || currentUser.email?.split('@')[0]}
                    </div>
                    <div className="text-xs text-gray-400">
                      {currentUser.email}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 text-red-400 hover:text-red-300"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}