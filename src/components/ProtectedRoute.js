import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element }) => {
    // Assuming you have user information in your Redux store
    const user = useSelector((state) => state.user);

    // Check if user is authenticated
    const isAuthenticated = user && user.token;

    return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
