import React from 'react';
import Navigation from './Navigation.tsx';




interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Navigation />
      <main style={{ padding: '0 2rem' }}>
        {children}
      </main>
    </div>
  );
}