import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const userId = localStorage.getItem('userId');
    const loginTime = localStorage.getItem('loginTime');
    const sessionExpiry = localStorage.getItem('sessionExpiry');

    const now = new Date().getTime();
    const expired = loginTime && sessionExpiry && (now - loginTime > parseInt(sessionExpiry));

    if(!userId || expired) {
        localStorage.clear();
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;