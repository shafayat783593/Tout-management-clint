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



export const router = createBrowserRouter([
    {
        path: '/',
        Component: HomeLayout,
        children: [
            {
                index: true,
                path: "/",
                Component: Home

            },{
                path:"all-packages",
                loader: () => fetch("http://localhost:3000/appTourPackages"),
                Component:AllPackages




            } ,{
                path:"PackageDetails/:id",
                loader: ({ params }) => fetch(`http://localhost:3000/PackageDetails/${params.id}`),
                element:<PrivateProvider>
                    <PackageDetails/>
                </PrivateProvider>

            },
             {
                path: "/add-pakage",
                element: <PrivateProvider>
                    <AddPackage />
                </PrivateProvider>
                // Component:AddPackage

            },{
                 path:"/manageMyPackages/:email",
                 loader: ({ params }) => fetch(`http://localhost:3000/manageMyPackages/${params.id}`),
                 element:<PrivateProvider>
                     <ManageMyPackages/>


                 </PrivateProvider>
                                },
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
    },
]);