import React, { useState } from 'react';
import Navigation from './Navigation.tsx';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  // Add state management for showMobileChats
  const [showMobileChats, setShowMobileChats] = useState(false);

  return (
    <div>
      {/* Pass the required props to the Navigation component */}
      <Navigation 
        showMobileChats={showMobileChats} 
        setShowMobileChats={setShowMobileChats} 
      />
      <main style={{ padding: '0 2rem' }}>
        {children}
      </main>
    </div>
  );
}
