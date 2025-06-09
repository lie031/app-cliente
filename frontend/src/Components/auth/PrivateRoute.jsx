import React from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../../Services/AuthService';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = authService.isAuthenticated();
    
    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute; 