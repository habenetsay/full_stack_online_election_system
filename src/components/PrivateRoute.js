import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, allowedRoles }) => {
    const isAuthenticated = useSelector((state) => state.isAuthenticated);
    const userRole = useSelector((state) => state.userRole);
    const location = useLocation();

    if (!isAuthenticated) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!allowedRoles.includes(userRole)) {
        // Redirect if the user's role doesn't match the allowed roles
        return <Navigate to="/unauthorized" replace />;
    }

    // Render children if authenticated and role is authorized
    return children;
};

export default PrivateRoute;
