import { createContext, useContext, ReactNode } from 'react';
import { useAuth as useClerkAuth, useUser, SignIn, SignUp } from '@clerk/clerk-react';

interface AuthContextType {
  currentUser: any;
  signup: () => void;
  login: () => void;
  logout: () => Promise<void>;
  signInWithGoogle: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { isLoaded, signOut } = useClerkAuth();
  const { user } = useUser();

  const signup = () => {
    // Clerk handles signup UI
    return <SignUp />;
  };

  const login = () => {
    // Clerk handles login UI
    return <SignIn />;
  };

  const logout = async () => {
    await signOut();
  };

  const signInWithGoogle = () => {
    // Clerk handles OAuth
    return <SignIn />;
  };

  const value = {
    currentUser: user,
    signup,
    login,
    logout,
    signInWithGoogle
  };

  return (
    <AuthContext.Provider value={value}>
      {isLoaded && children}
    </AuthContext.Provider>
  );
} 