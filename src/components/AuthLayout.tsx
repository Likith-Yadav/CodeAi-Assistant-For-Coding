import React from 'react';
import Navigation from './Navigation';
import ChatHistory from './ChatHistory';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen gradient-bg text-white">
      <Navigation />
      <ChatHistory />
      <main className="pt-24 pb-16 px-4 ml-64">
        <div className="container mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
} 