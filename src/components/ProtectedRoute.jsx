import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const auth = JSON.parse(localStorage.getItem('dietbalancer_auth') || 'null');
  
  // If not logged in, redirect to login page
  if (!auth) {
    return <Navigate to="/login" replace />;
  }
  
  // If logged in, show the page
  return children;
}
