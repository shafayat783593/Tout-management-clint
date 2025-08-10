import React, { use } from 'react'
import { CiMenuBurger } from "react-icons/ci";
import { Link, NavLink, useNavigate } from 'react-router';
// import { CiMenuBurger } from "react-icons/ci";
import logo from "../.././assets/logo.png"
import UseAuth from '../../Hooks/UseAuth';
import { toast } from 'react-toastify';

// import { FaMoon } from "react-icons/fa6";
// import { GoSun } from "react-icons/go";
function Navbar() {
    // const { darkMode, setdarkMode } = use(ThemContext)

    const { user, logOut } = UseAuth()
    console.log(user?.email)
    const navigate = useNavigate()




    const handleLogout = () => {
        logOut()
            .then(() => {
                toast.success("Logged out successfully");
                navigate("/")
            })
            .catch((err) => {
                toast.error("Logout failed");
                console.error(err);
            });
    };




    const navigation = (
        <>
            <NavLink className={({ isActive }) => `${isActive ? "underline text-[#72bbf6]" : ""}  m-2 font-medium text-xl hover:text-[#378acf]`} to="/" >Home</NavLink>
            <NavLink className={({ isActive }) => `${isActive ? "underline text-[#72bbf6]" : ""}  m-2 font-medium text-xl hover:text-[#378acf]`} to="/all-packages">All Packages</NavLink>
            <NavLink className={({ isActive }) => `${isActive ? "underline text-[#72bbf6]" : ""}  m-2 font-medium text-xl hover:text-[#378acf]`} to="/aboutUs">About Us</NavLink>
            {
                user && <NavLink className={({ isActive }) => `${isActive ? "underline text-[#72bbf6]" : ""}  m-2 font-medium text-xl hover:text-[#378acf]`} to="/myBooking">My Bookings</NavLink>
            }
        </>


    );


    const profileDropdown = (
        <>

            <NavLink className={({ isActive }) => `${isActive ? "underline text-[#72bbf6]" : ""} m-2 font-medium text-xl hover:text-[#378acf]`} to="/add-pakage">Add Package</NavLink>
            <NavLink className={({ isActive }) => `${isActive ? "underline text-[#72bbf6]" : ""}  m-2 font-medium text-xl hover:text-[#378acf]`} to="/manageMyPackages">Manage My Packages</NavLink>


        </>



    )


    return (


        <>

            <div className="navbar bg-base-100   shadow-md w-full mx-auto  sticky top-0 z-100 ">
                <div className="  gap-6 ">
                    <div className="dropdown ">

                        <div tabIndex={0} role="button" className="  btn btn-ghost lg:hidden ">
                            <CiMenuBurger className='text-4xl' />
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100   rounded-box z-1 mt-3 w-52 p-2 shadow space-y-12  h-96 ">

                            <div className='flex flex-col gap-15'>
                                {navigation}

                                <div className='block lg:hidden'>




                                    <label className="swap swap-rotate ">
                                        {/* this hidden checkbox controls the state */}
                                        <input type="checkbox" className="theme-controller" value="dark" />

                                        {/* sun icon */}
                                        <svg
                                            className="swap-off h-10 w-10 fill-current"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24">
                                            <path
                                                d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                                        </svg>

                                        {/* moon icon */}
                                        <svg
                                            className="swap-on h-10 w-10 fill-current"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24">
                                            <path
                                                d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                                        </svg>
                                    </label>

                                </div>



                            </div>



                        </ul>


                    </div>


                </div>


                <div className='flex justify-around items-center'>

                    <div className="hover:scale-[1.02] transition-transform duration-200">
                        <Link
                            className="flex items-center justify-center gap-2 group"
                            to="/"
                        >

                            <img
                                className="w-[60px] group-hover:drop-shadow-lg transition-all duration-300"
                                src={logo}
                                alt="BookEase Logo"
                            />


                            <h1 className="hidden md:block text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 group-hover:from-blue-700 group-hover:to-cyan-500 transition-all duration-500 tracking-tight">
                                Booking Management
                            </h1>
                        </Link>
                    </div>

                    <ul className="items-stretch hidden space-x-3 lg:flex ">
                        {navigation}
                    </ul>

                    <div className="items-center flex-shrink-0    lg:flex gap-4">

                        <div className='login-btn flex items-center gap-3'>

                            {user && (
                                <div className="dropdown dropdown-hover lg:ml-0">
                                    <img
                                        className="w-10 lg:w-30 rounded-4xl"
                                        src={user?.photoURL}
                                        alt={user?.displayName}
                                    />

                                    <ul
                                        tabIndex={0}
                                        className="space-y-4 mr-0 dropdown-content menu bg-base-100 rounded-box z-50 w-52 p-2 shadow-smlg:left-auto lg:translate-x-0left-[-50%] -translate-x-1/2 top-full"
                                    >
                                        {user && profileDropdown}

                                        <Link
                                            to="/auth/register"
                                            onClick={handleLogout}
                                            className="cursor-pointer bg-gradient-to-b from-blue-500 to-blue-600 shadow-[0px_4px_32px_0_rgba(99,102,241,.70)] px-6 py-3 rounded-xl border-[1px] border-slate-500 text-white font-medium group"
                                        >
                                            <div className="relative overflow-hidden">
                                                <p className="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                                                    LogOut
                                                </p>
                                                <p className="absolute top-7 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                                                    LogOut
                                                </p>
                                            </div>
                                        </Link>
                                    </ul>
                                </div>
                            )}

                        </div>
                        <div className="flex">
                            {!user && (
                                <div className="flex">
                                    <Link to="/auth/login" className="cursor-pointer bg-gradient-to-b from-blue-500 to-blue-600 shadow-[0px_4px_32px_0_rgba(99,102,241,.70)] px-6 py-3 rounded-xl border-[1px] border-slate-500 text-white font-medium group">
                                        <div className="relative overflow-hidden">
                                            <p className="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">Login</p>
                                            <p className="absolute top-7 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">Login</p>
                                        </div>
                                    </Link>
                                    <Link to="/auth/register" className="cursor-pointer bg-gradient-to-b from-blue-500 to-blue-600 shadow-[0px_4px_32px_0_rgba(99,102,241,.70)] px-6 py-3 rounded-xl border-[1px] border-slate-500 text-white font-medium group">
                                        <div className="relative overflow-hidden">
                                            <p className="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">Register</p>
                                            <p className="absolute top-7 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">Register</p>
                                        </div>
                                    </Link>
                                </div>
                            )}
                        </div>


                        <div className='hidden lg:block'>




                            <label className="swap swap-rotate ">
                                {/* this hidden checkbox controls the state */}
                                <input type="checkbox" className="theme-controller" value="dark" />

                                {/* sun icon */}
                                <svg
                                    className="swap-off h-10 w-10 fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                                </svg>

                                {/* moon icon */}
                                <svg
                                    className="swap-on h-10 w-10 fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                                </svg>
                            </label>

                        </div>


                    </div>

                </div>


            </div>

        </>
    )
}

export default Navbar

