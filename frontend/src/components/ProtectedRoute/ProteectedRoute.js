import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  // Redirect to login if the user is not authenticated
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
