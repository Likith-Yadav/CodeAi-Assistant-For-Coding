import Navigation from './Navigation';

export default function Layout({ children }) {
  return (
    <div>
      <Navigation />
      <main style={{ padding: '0 2rem' }}>
        {children}
      </main>
    </div>
  );
} 