import { useEffect, useState } from "react";
import UseAuth from "./UseAuth";
import UseAxiosSecure from "./UseAxiosSecure";

const UseUserRole = () => {
    const [role, setRole] = useState(null);
    const [roleLoading, setRoleLoading] = useState(true);
    const { user } = UseAuth();
    const axiosSecure = UseAxiosSecure();
console.log("roll",role)
    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/api/users/role/${user.email}`)
                .then(res => {
                    setRole(res.data.role);
                    setRoleLoading(false);
                })
                .catch(err => {
                    console.error("Failed to fetch role:", err);
                    setRoleLoading(false);
                });
        }
    }, [user]);

    return { role, roleLoading };
};

export default UseUserRole;
