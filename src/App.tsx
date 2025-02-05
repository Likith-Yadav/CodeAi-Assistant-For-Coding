import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute.tsx';
import Login from './components/Login.tsx';
import Signup from './components/Signup.tsx';
import LandingPage from './pages/LandingPage';
import CodeGenerator from './pages/CodeGenerator';
import Debugger from './pages/Debugger';
import { useAuth } from './contexts/AuthContext';
import AuthLayout from './components/AuthLayout';
import Suggestions from './pages/Suggestions';
import ChatView from './components/ChatView';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />

        {/* Protected routes */}
        <Route path="/generate" element={
          <PrivateRoute>
            <AuthLayout>
              <CodeGenerator />
            </AuthLayout>
          </PrivateRoute>
        } />
        <Route path="/suggest" element={
          <PrivateRoute>
            <AuthLayout>
              <Suggestions />
            </AuthLayout>
          </PrivateRoute>
        } />
        <Route path="/debug" element={
          <PrivateRoute>
            <AuthLayout>
              <Debugger />
            </AuthLayout>
          </PrivateRoute>
        } />

        {/* Add these new routes */}
        <Route path="/generate/:id" element={
          <PrivateRoute>
            <AuthLayout>
              <ChatView />
            </AuthLayout>
          </PrivateRoute>
        } />
        <Route path="/debug/:id" element={
          <PrivateRoute>
            <AuthLayout>
              <ChatView />
            </AuthLayout>
          </PrivateRoute>
        } />
        <Route path="/suggest/:id" element={
          <PrivateRoute>
            <AuthLayout>
              <ChatView />
            </AuthLayout>
          </PrivateRoute>
        } />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  );
}

interface PublicRouteProps {
  children: React.ReactNode;
}

function PublicRoute({ children }: PublicRouteProps) {
  const { currentUser } = useAuth();
  
  if (currentUser) {
    return <Navigate to="/generate" />;
  }
  
  return <>{children}</>;
}

export default App;