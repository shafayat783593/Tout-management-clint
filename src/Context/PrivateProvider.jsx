import React from 'react';
import UseAuth from '../Hooks/UseAuth';
import Loading from '../components/Loading/Loading';
import { Navigate, useLocation } from 'react-router';


function PrivateProvider({ children }) {
    const location = useLocation();
    const { user, loading } = UseAuth();

    if (loading) {
        return <Loading />;
    }

    if (user && user?.email) {
        return children;
    }

    return <Navigate to="/auth/login" state={{ from: location.pathname }} replace />;
}

export default PrivateProvider;
