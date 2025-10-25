import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import UseUserRole from "../Hooks/UserRoll";
import Loading from "../components/Loading/Loading";

const AdminPrivateRoutes = () => {
    const { role, roleLoading } = UseUserRole();

    if (roleLoading) {
        return <Loading />; // role loade
    }

    if (role === "admin") {
        return <Outlet />; // nested routes render হবে
    }

    // non-admin হলে redirect হবে
    return <Navigate to="/" replace />;
};

export default AdminPrivateRoutes;
