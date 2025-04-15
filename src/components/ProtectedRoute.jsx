import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('partnerToken');

  if (!token) {
    // If not authenticated, redirect to login page
    return <Navigate to="/partner/login" replace />;
  }

  // If authenticated, render the children
  return children;
};

export default ProtectedRoute; 