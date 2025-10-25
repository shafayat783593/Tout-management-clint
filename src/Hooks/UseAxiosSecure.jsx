import axios from "axios";
import UseAuth from "./UseAuth";
import { useEffect } from "react";

const axiosInstance = axios.create({
    baseURL: "https://tour-management-server-ashen.vercel.app",
    // baseURL: "https://tour-management-server-ashen.vercel.app"
});

function UseAxiosSecure() {
    const { logOut, user } = UseAuth();

    useEffect(() => {
        const requestInterceptor = axiosInstance.interceptors.request.use(
            async (config) => {
                if (user) {
                    // get fresh Firebase ID token
                    const idToken = await user.getIdToken();
                    config.headers.Authorization = `Bearer ${idToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseInterceptor = axiosInstance.interceptors.response.use(
            (response) => response,
            (error) => {
                const status = error.response?.status;
                if (status === 401 || status === 403) {
                    logOut().catch((err) => console.log(err));
                }
                return Promise.reject(error);
            }
        );

        // Cleanup interceptors on unmount or re-run
        return () => {
            axiosInstance.interceptors.request.eject(requestInterceptor);
            axiosInstance.interceptors.response.eject(responseInterceptor);
        };
    }, [user, logOut]);

    return axiosInstance;
}

export default UseAxiosSecure;
