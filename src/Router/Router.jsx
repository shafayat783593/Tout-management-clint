import { createBrowserRouter, } from "react-router";
import HomeLayout from "../Layout/HomeLayout";
import Home from "../components/Home/Home";
import AuthLayout from "../Layout/AuthLayout";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import PrivateProvider from "../Context/PrivateProvider";
import AddPackage from "../Pages/AddPackage/AddPackage";
import AllPackages from "../Pages/AllPackages/AllPackages";
import PackageDetails from "../Pages/PackageDetails/PackageDetails";
import ManageMyPackages from "../Pages/ManageMyPackage/ManageMyPackages";
import UpdateMyPosted from "../Pages/UpdateMyPosted/UpdateMyPosted";
import Loading from "../components/Loading/Loading";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import MyBooking from "../Pages/MyBooking/MyBooking";



export const router = createBrowserRouter([
    {
        path: '/',
        Component: HomeLayout,
        children: [
            {
                index: true,
                path: "/",
                loader: () => fetch("http://localhost:3000/appTourPackages"),
                HydrateFallback: Loading,
                Component: Home,



            }, {
                path: "all-packages",
                // loader: () => fetch("http://localhost:3000/appTourPackages"),
                HydrateFallback: Loading,
                Component: AllPackages

            }, {
                path: "PackageDetails/:id",
                loader: ({ params }) => fetch(`http://localhost:3000/PackageDetails/${params.id}`),
                HydrateFallback: Loading,
                element: <PrivateProvider>
                    <PackageDetails />
                </PrivateProvider>

            },
            {
                path: "/add-pakage",
                element: <PrivateProvider>
                    <AddPackage />
                </PrivateProvider>
                // Component:AddPackage

            }, {
                path: "manageMyPackages",

                element: <PrivateProvider>
                    <ManageMyPackages />
                </PrivateProvider>
            },
            {
                path: "/updateMyPosted/:id",
                loader: ({ params }) => fetch(`http://localhost:3000/updateMyPosted/${params.id}`),
                HydrateFallback: Loading,

                element: <PrivateProvider>
                    <UpdateMyPosted />
                </PrivateProvider>
            },
            {
                path: "/myBooking",
                element: <PrivateProvider>
                    <MyBooking />
                </PrivateProvider>

            }
        ]
    },
    {
        path: "/auth",
        Component: AuthLayout,
        children: ([
            {
                path: "/auth/login",
                Component: Login
            },
            {
                path: "/auth/register",
                Component: Register
            }
        ])
    }, {
        path: "/*",
        Component: ErrorPage
    }
]);