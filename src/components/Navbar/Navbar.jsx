import React, { use } from 'react'

import { Link, NavLink } from 'react-router';
// import { CiMenuBurger } from "react-icons/ci";
// import logo from "../.././assets/logo.png"
import { AuthContext } from '../../Context/AuthContext';
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
            <NavLink className={({ isActive }) => `${isActive ? "underline text-[#72bbf6]" : "text-black"} dark:text-white m-2 font-medium text-xl hover:text-[#378acf]`} to="/">Home</NavLink>
            <NavLink className={({ isActive }) => `${isActive ? "underline text-[#72bbf6]" : "text-black"} dark:text-white m-2 font-medium text-xl hover:text-[#378acf]`} to="/addtask">All Packages</NavLink>
            <NavLink className={({ isActive }) => `${isActive ? "underline text-[#72bbf6]" : "text-black"} dark:text-white m-2 font-medium text-xl hover:text-[#378acf]`} to="/browseetask">About Us</NavLink>
            {
                user && <NavLink className={({ isActive }) => `${isActive ? "underline text-[#72bbf6]" : "text-black"} dark:text-white m-2 font-medium text-xl hover:text-[#378acf]`} to="/mypostedtask">My Bookings</NavLink>
            }
        </>


    );
    const profileDropdown = (
        <>

            <NavLink className={({ isActive }) => `${isActive ? "underline text-[#72bbf6]" : "text-black"} dark:text-white m-2 font-medium text-xl hover:text-[#378acf]`} to="/mypostedtask">Add Package</NavLink>
            <NavLink className={({ isActive }) => `${isActive ? "underline text-[#72bbf6]" : "text-black"} dark:text-white m-2 font-medium text-xl hover:text-[#378acf]`} to="/mypostedtask">Manage My Packages</NavLink>


        </>
    )
    return (


        <>

            <div className="navbar bg-base-100 dark:bg-gray-900 dark:text-white shadow-sm w-full mx-auto  ">
                <div className="  gap-6 ">
                    <div className="dropdown ">

                        <div tabIndex={0} role="button" className=" text-blue-400 btn btn-ghost lg:hidden ">
                            {/* <CiMenuBurger className='text-2xl' /> */}
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow space-y-12   dark:bg-gray-700">
                            {navigation}


                        </ul>
                    </div>
                 

                </div>


                <div className='flex justify-around'>


                    <div>
                        <Link className=' flex text-center items-center ' to="/">
                            <img className='w-[70px]' src="" alt="Logo" />
                            <h1 className='text-xl hidden md:block'>Freelance Task</h1>
                        </Link>
                    </div>

                    <ul className="items-stretch hidden space-x-3 lg:flex ">
                        {navigation}
                    </ul>

                    <div className="items-center flex-shrink-0    lg:flex gap-4">

                        <div className='login-btn flex items-center gap-3'>


                            {user && (
                                <div className="dropdown dropdown-hover ml-2">
                                    <img tabIndex={0} className='w-20 rounded-full' src={user?.photoURL || "https://img.icons8.com/?size=96&id=80976&format=png"} alt="" />
                                    <ul tabIndex={0} className="dark:bg-gray-800 space-y-4 dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
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



                        {/* <div className='text-2xl cursor-pointer ml-4 hidden md:block' onClick={() => setdarkMode(!darkMode)}>
                        {
                            darkMode ? <span> <GoSun /></span> : <span> <FaMoon /></span>
                        }

                    </div> */}


                    </div>

                </div>


            </div>

        </>
    )
}

export default Navbar
