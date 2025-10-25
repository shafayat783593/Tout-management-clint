import React, { useState } from 'react';
import { Menu, Bell, User, LogOut } from 'lucide-react';
import UseAuth from '../../Hooks/UseAuth';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';


function Header({ setSidebarOpen }) {
    const { user, logout } = UseAuth();
    const [showDropdown, setShowDropdown] = useState(false);



   const navigate = useNavigate()

    const handleLogout = () => {
        logout()
            .then(() => {
                toast.success("Logged out successfully");
                navigate("/")
            })
            .catch((err) => {
                toast.error("Logout failed");
                console.error(err);
            });
    };


    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="flex items-center justify-between h-16 px-4">
                <div className="flex items-center">
                    <button
                        className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                    <div className="ml-4 md:ml-0">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Welcome back, {user?.name}
                        </h2>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <button className="p-2 rounded-full hover:bg-gray-100 relative">
                        <Bell className="h-6 w-6 text-gray-600" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    <div className="relative">
                        <button
                            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
                            onClick={() => setShowDropdown(!showDropdown)}
                        >
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                <User className="h-5 w-5 text-white" />
                            </div>
                            <span className="hidden md:block text-sm font-medium text-gray-700">
                                {user?.name}
                            </span>
                        </button>

                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                                <button
                                    onClick={() => handleLogout()}
                                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    <LogOut className="mr-3 h-4 w-4" />
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;