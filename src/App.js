import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';
import Login from './components/Login';
import Signup from './components/Signup';
import LandingPage from './pages/LandingPage.tsx';
import CodeGenerator from './pages/CodeGenerator';
import Debugger from './pages/Debugger';
import { useAuth } from './contexts/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />

          {/* Protected routes */}
          <Route path="/generate" element={
            <PrivateRoute>
              <Layout>
                <CodeGenerator />
              </Layout>
            </PrivateRoute>
          } />
          <Route path="/debug" element={
            <PrivateRoute>
              <Layout>
                <Debugger />
              </Layout>
            </PrivateRoute>
          } />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

// PublicRoute component to prevent authenticated users from accessing public pages
function PublicRoute({ children }) {
  const { currentUser } = useAuth();
  
  if (currentUser) {
    return <Navigate to="/generate" />;
  }
  
  return children;
}

export default App; 