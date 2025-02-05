import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
  const { currentUser } = useAuth();

  return (
    <div>
      <h1>Profile</h1>
      <p>Email: {currentUser?.email}</p>
      {/* Add more profile information here */}
    </div>
  );
} 