import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ( {children, requiredRole }) => {
    const { user } = useSelector((state) => state.usuariosReducer);

    if (!user || user.role<requiredRole) {
      return <Navigate to="/login" replace />;
    }
  
    return children;
}

export default ProtectedRoute
