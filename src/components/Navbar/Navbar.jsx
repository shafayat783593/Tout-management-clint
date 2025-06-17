import React, { use } from 'react'
import { CiMenuBurger } from "react-icons/ci";
import { Link, NavLink } from 'react-router';
// import { CiMenuBurger } from "react-icons/ci";
import logo from "../.././assets/logo.png"
import UseAuth from '../../Hooks/UseAuth';

// import { FaMoon } from "react-icons/fa6";
// import { GoSun } from "react-icons/go";
function Navbar() {
    // const { darkMode, setdarkMode } = use(ThemContext)

    const { user, logOut } = UseAuth()
  



    const handleLogout = () => {
        logOut().then(() => {

        }).catch((error) => {

        });
    }



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

            <div className="navbar bg-base-100   shadow-sm w-full mx-auto  ">
                <div className="  gap-6 ">
                    <div className="dropdown ">

                        <div tabIndex={0} role="button" className=" text-black btn btn-ghost lg:hidden ">
                            <CiMenuBurger className='text-4xl' />
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow space-y-12  h-96 ">

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


                    <div className=' '>
                        <Link className='flex  text-center items-center justify-center' to="/">
                            <img className='w-[60px]  ' src={logo} alt="Logo" />
                            <h1 className='text-xl hidden md:block'>Booking Management </h1>
                        </Link>
                    </div>

                    <ul className="items-stretch hidden space-x-3 lg:flex ">
                        {navigation}
                    </ul>

                    <div className="items-center flex-shrink-0    lg:flex gap-4">

                        <div className='login-btn flex items-center gap-3'>


                            {user && (
                                <div className="dropdown dropdown-hover mr-30 lg:ml-0">
                                    <img
                                        tabIndex={0}
                                        className='w-18 lg:w-24 rounded-full'
                                        src={user?.photoURL || "https://img.icons8.com/?size=96&id=80976&format=png"}
                                        alt="User Profile"
                                    />                                    <ul tabIndex={0} className=" space-y-4 dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                        {
                                            user && profileDropdown
                                        }

                                        <Link to="/auth/register" onClick={handleLogout} className="cursor-pointer bg-gradient-to-b from-indigo-500 to-indigo-600 shadow-[0px_4px_32px_0_rgba(99,102,241,.70)] px-6 py-3 rounded-xl border-[1px] border-slate-500 text-white font-medium group">
                                            <div className="relative overflow-hidden">
                                                <p className="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">LogOut</p>
                                                <p className="absolute top-7 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">LogOut</p>
                                            </div>
                                        </Link>
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className="flex">
                            {!user && (
                                <div className="flex">
                                    <Link to="/auth/login" className="cursor-pointer bg-gradient-to-b from-indigo-500 to-indigo-600 shadow-[0px_4px_32px_0_rgba(99,102,241,.70)] px-6 py-3 rounded-xl border-[1px] border-slate-500 text-white font-medium group">
                                        <div className="relative overflow-hidden">
                                            <p className="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">Login</p>
                                            <p className="absolute top-7 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">Login</p>
                                        </div>
                                    </Link>
                                    <Link to="/auth/register" className="cursor-pointer bg-gradient-to-b from-indigo-500 to-indigo-600 shadow-[0px_4px_32px_0_rgba(99,102,241,.70)] px-6 py-3 rounded-xl border-[1px] border-slate-500 text-white font-medium group">
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

