import { Navigate } from 'react-router-dom';
import { useAuth as useClerkAuth } from '@clerk/clerk-react';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { userId, isLoaded } = useClerkAuth();

  if (!isLoaded) {
    return null;
  }

  if (!userId) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
} 