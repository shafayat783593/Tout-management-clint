import { createBrowserRouter, } from "react-router";
import Home from "../components/Home/Home";

import AuthLayout from "../Layout/AuthLayout";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import PrivateProvider from "../Context/PrivateProvider";
import AddPackage from "../Pages/AddPackage/AddPackage";
import AllPackages from "../Pages/AllPackages/AllPackages";
import PackageDetails from "../Pages/PackageDetails/PackageDetails";
import UpdateMyPosted from "../Pages/UpdateMyPosted/UpdateMyPosted";
import Loading from "../components/Loading/Loading";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import MyBooking from "../Pages/MyBooking/MyBooking";
import AboutUs from "../Pages/About Us/AboutUs";
import ForgetPassword from "../components/Forget-password/FOrgetPassword";
import DashboardLayout from "../Deshbord/DeshbordLayout";
import DeshbourdHomepage from "../Deshbord/DeshbrdHomePage";
import Tours from "../components/Admin/Components/Tour";
import ManageAllPackages from "../components/Admin/Components/ManageAllPackages";
import UserManagement from "../components/Admin/Components/UserManagement";
import BookingManagement from "../components/Admin/Components/BookingManagement";
import TourPaymentPage from "../components/Payment/PaymnetProvider";
import AdminPrivateRoutes from "../Route/AdminPrivateRouter";
import AdminDashboard from "../Deshbord/DeshbrdHomePage";
import { HomeLayout } from "../Layout/HomeLayout";
import UserProfile from "../components/Admin/Components/UserManagement/UserProfile";



export const router = createBrowserRouter([
    {
        path: '/',
        Component: HomeLayout,
        children: [
            {
                index: true,
                path: "/",
                    HydrateFallback: Loading,
                Component: Home,



            }, {
                path: "all-packages",
                    HydrateFallback: Loading,
                Component: AllPackages

            }, {
                path: "PackageDetails/:id",
                loader: ({ params }) => fetch(`https://tour-management-server-ashen.vercel.app/PackageDetails/${params.id}`),
                HydrateFallback: Loading,
                element: <PrivateProvider>
                    <PackageDetails />
                </PrivateProvider>

            }, {
                path: "aboutUs",
                Component: AboutUs

            },
            {
                path: "/add-pakage",
                element: <PrivateProvider>
                    <AddPackage />
                </PrivateProvider>
                // Component:AddPackage

            },
            {
                path: "forgetpasswore",
                Component: ForgetPassword
            },
            //  {
            //     path: "manageMyPackages",

            //     element: <PrivateProvider>
            //         <ManageMyPackages />
            //     </PrivateProvider>
            // },
            {
                path: "/updateMyPosted/:id",
                loader: ({ params }) => fetch(`
https://tour-management-server-ashen.vercel.app/updateMyPosted/${params.id}`),
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

            }, {
                path: "/payment/:id",
                Component: TourPaymentPage

            }, {
                path: "/profileUpdate",
                Component: UserProfile

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
    },

    {
        path: "/dashboard",
        Component: DashboardLayout,
        children: (
            [
                {
                    index: true,
                    Component: DeshbourdHomepage
                },
                {
                    path: "tours",
                    element: (
                        <AdminPrivateRoutes>
                            <Tours />
                        </AdminPrivateRoutes>
                    )
                },
                {
                    path: "ManageMyPackages",
                    element: (
                        <AdminPrivateRoutes>
                            <ManageAllPackages />
                        </AdminPrivateRoutes>
                    )
                },
                {
                    path: "UserManagement",
                    element: (
                        <AdminPrivateRoutes>
                            <UserManagement />
                        </AdminPrivateRoutes>
                    )
                },
                {
                    path: "BookingManagement",
                    element: (
                        <AdminPrivateRoutes>
                            <BookingManagement />
                        </AdminPrivateRoutes>
                    )
                }, {

                    path: "profileUpdate",
                    element: (
                        <AdminPrivateRoutes>
                            <  UserProfile />
                        </AdminPrivateRoutes>
                    )



                }



            ]
        )
    }
]);
