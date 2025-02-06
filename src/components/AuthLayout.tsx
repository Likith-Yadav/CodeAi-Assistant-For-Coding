import React, { useState } from 'react';
import Navigation from './Navigation';
import ChatHistory from './ChatHistory';

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  const [showMobileChats, setShowMobileChats] = useState(false);

  return (
    <div className="min-h-screen gradient-bg text-white">
      <Navigation 
        showMobileChats={showMobileChats}
        setShowMobileChats={setShowMobileChats}
      />
      <div className="hidden md:block">
        <ChatHistory />
      </div>
      {/* Mobile chat history */}
      <ChatHistory 
        showMobile={showMobileChats} 
        onClose={() => setShowMobileChats(false)} 
      />
      <main className={`pt-24 pb-16 px-4 md:ml-64 transition-all duration-300`}>
        <div className="container mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
