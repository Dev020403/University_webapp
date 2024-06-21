import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
    const { token, role } = useSelector(state => state.auth);
    const isAuthenticated = !!token;

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/" />; // Or some unauthorized page
    }

    return <Outlet />;
};

export default ProtectedRoute;
