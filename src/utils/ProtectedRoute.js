import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
    const state  = useSelector(state => state);
    const role = state.auth.role || state.adminAuth.role;
    const token = state.auth.token || state.adminAuth.token; 
    const isAuthenticated = !!token;

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
