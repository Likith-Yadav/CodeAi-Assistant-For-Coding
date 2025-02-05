import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, Mail, Lock, ArrowLeft, Chrome } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/');
    } catch (error) {
      setError('Failed to login');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setLoading(true);
      await signInWithGoogle();
      navigate('/');
    } catch (error) {
      setError('Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg text-white flex items-center justify-center p-4">
      <div className={`w-full max-w-md p-8 rounded-2xl bg-gray-950/70 backdrop-blur-xl border border-gray-800/50 relative shadow-2xl shadow-blue-500/5`}>
        <Link 
          to="/" 
          className="absolute left-8 top-8 p-2 text-gray-400 hover:text-white transition-colors hover:bg-white/10 rounded-xl"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>

        <div className="mb-8 text-center pt-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/20 mb-6">
            <LogIn className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-gray-400 mt-2">Sign in to continue to your workspace</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/20 text-red-300 border border-red-500/20">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-400 mb-2 text-sm">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-12 py-3 bg-gray-950/70 border border-gray-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all placeholder:text-gray-600"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-400 mb-2 text-sm">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-12 py-3 bg-gray-950/70 border border-gray-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all placeholder:text-gray-600"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-blue-600 rounded-xl font-semibold text-lg shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 disabled:hover:bg-blue-600"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-900/50 text-gray-400">Or continue with</span>
          </div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="mt-6 w-full py-4 px-4 bg-white/10 hover:bg-white/20 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
        >
          <Chrome className="w-5 h-5" />
          Sign in with Google
        </button>

        <p className="mt-8 text-center text-gray-400">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-400 hover:text-blue-300 transition-colors">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
} 