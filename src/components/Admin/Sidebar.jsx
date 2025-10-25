import React from 'react';
import { NavLink } from 'react-router'; // ✅ Correct import
import {
    LayoutDashboard,
    MapPin,
    Calendar,
    Users,
    BarChart3,
    Settings,
    X,
    HomeIcon,
    BookAIcon,
    Package,
    UserPen,
    BookCheck,
    
} from 'lucide-react';

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Tours', href: '/dashboard/tours', icon: MapPin },
    { name: 'ManageMyPackages', href: '/dashboard/ManageMyPackages', icon: Package },
    { name: 'Customers', href: '/dashboard/UserManagement', icon: Users },
    { name: 'BookingManagemet', href: '/dashboard/BookingManagement', icon: BookCheck  },
    { name: 'Profile', href: '/dashboard/profileUpdate', icon: UserPen },
    { name: 'Home', href: '/', icon: HomeIcon },
];

function Sidebar({ open, setOpen }) {
    return (
        <>
            {/* Mobile sidebar backdrop */}
            {open && (
                <div
                    className="fixed inset-0 flex z-40 md:hidden"
                    onClick={() => setOpen(false)}
                >
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                </div>
            )}

            {/* Sidebar */}
            <div
                className={`${open ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0 md:relative
  fixed md:flex flex-col z-50 bg-white w-64 h-full 
  transform transition duration-300 ease-in-out`}
            >
                <div className="flex items-center justify-between h-16 px-4  text-white">
                    <h1 className=" text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 group-hover:from-blue-700 group-hover:to-cyan-500 transition-all duration-500 tracking-tight">
                        Booking Management
                    </h1>
                    <button className="md:hidden" onClick={() => setOpen(false)}>
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-2">
                    {navigation.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.href}
                            className={({ isActive }) =>
                                `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${isActive
                                    ? 'text-blue-500 font-bold bg-base-300 rounded-md'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`
                            }
                            onClick={() => setOpen(false)}
                        >
                            <item.icon className="mr-3 h-5 w-5" />
                            {item.name}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </>
    );
}

export default Sidebar;
