import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    FiSearch,
    FiUsers,
    FiShield,
    FiNavigation,
    FiCalendar,
    FiEye,
    FiTrash2,
    FiMail,
    FiUser,
    FiClock,
    FiBook,
    FiCheckCircle,
    FiXCircle,
    FiClock as FiPending
} from 'react-icons/fi';
import Loading from '../../Loading/Loading';

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('all');
    const [sortBy, setSortBy] = useState('newest');

    useEffect(() => {
        fetchAllUsersWithStats();
    }, []);

    const fetchAllUsersWithStats = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://tour-management-server-ashen.vercel.app/api/bookings/admin/users-with-stats');

            if (response.ok) {
                const result = await response.json();
                setUsers(result.users || []);
                toast.success(`🎉 Loaded ${result.users?.length || 0} users`);
            } else {
                throw new Error('Failed to fetch users');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error('❌ Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    const updateUserRole = async (userId, newRole, userName) => {
        try {
            const response = await fetch(`https://tour-management-server-ashen.vercel.app/api/bookings/admin/users/${userId}/role`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ role: newRole })
            });

            if (response.ok) {
                const result = await response.json();
                toast.success(`🎉 ${userName} is now ${newRole}`);

                setUsers(prevUsers =>
                    prevUsers.map(user =>
                        user._id === userId ? { ...user, role: newRole } : user
                    )
                );
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update user role');
            }
        } catch (error) {
            console.error('Error updating user role:', error);
            toast.error(error.message);
        }
    };

    const deleteUser = async (userId, userEmail, userName) => {
        if (!window.confirm(`Are you sure you want to delete ${userName} (${userEmail})? This action cannot be undone.`)) {
            return;
        }

        try {
            const response = await fetch(`https://tour-management-server-ashen.vercel.app/api/bookings/admin/users/${userId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                const result = await response.json();
                toast.success(`🗑️ ${userName} deleted successfully`);
                setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error(error.message);
        }
    };

    const viewUserBookings = (userEmail, userName) => {
        toast.info(`📊 Opening bookings for ${userName}`);
        window.open(`/user-bookings/${userEmail}`, '_blank');
    };

    // Filter and sort users
    const filteredUsers = users
        .filter(user => {
            const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesRole = selectedRole === 'all' || user.role === selectedRole;
            return matchesSearch && matchesRole;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return new Date(b.createdAt) - new Date(a.createdAt);
                case 'oldest':
                    return new Date(a.createdAt) - new Date(b.createdAt);
                case 'bookings-high':
                    return b.bookingCount - a.bookingCount;
                case 'bookings-low':
                    return a.bookingCount - b.bookingCount;
                case 'name':
                    return a.name?.localeCompare(b.name);
                default:
                    return 0;
            }
        });

    const getRoleIcon = (role) => {
        switch (role) {
            case 'admin': return <FiShield className="text-purple-500" />;
            case 'guide': return <FiNavigation className="text-green-500" />;
            default: return <FiUser className="text-blue-500" />;
        }
    };

    const getRoleBadge = (role) => {
        const roleStyles = {
            admin: 'bg-gradient-to-r from-purple-500 to-purple-600 text-white',
            user: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white',
            guide: 'bg-gradient-to-r from-green-500 to-green-600 text-white'
        };

        return (
            <div className={`flex items-center space-x-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-bold ${roleStyles[role] || 'bg-gray-500 text-white'}`}>
                {getRoleIcon(role)}
                <span className="hidden sm:inline">{role?.charAt(0).toUpperCase() + role?.slice(1)}</span>
                <span className="sm:hidden">{role?.charAt(0).toUpperCase()}</span>
            </div>
        );
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'confirmed': return <FiCheckCircle className="text-green-500 text-sm" />;
            case 'pending': return <FiPending className="text-yellow-500 text-sm" />;
            case 'cancelled': return <FiXCircle className="text-red-500 text-sm" />;
            default: return <FiClock className="text-gray-500 text-sm" />;
        }
    };

    const UserCard = ({ user, index }) => (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group"
        >
            {/* Header with gradient based on role */}
            <div className={`h-2 ${user.role === 'admin' ? 'bg-gradient-to-r from-purple-500 to-purple-600' :
                user.role === 'guide' ? 'bg-gradient-to-r from-green-500 to-green-600' :
                    'bg-gradient-to-r from-blue-500 to-blue-600'
                }`}></div>

            <div className="p-4 sm:p-6">
                {/* User Info */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-3">
                    <div className="flex items-center space-x-3">
                        <div className={`p-2 sm:p-3 rounded-2xl ${user.role === 'admin' ? 'bg-purple-100' :
                            user.role === 'guide' ? 'bg-green-100' : 'bg-blue-100'
                            }`}>
                            {getRoleIcon(user.role)}
                        </div>
                        <div className="min-w-0 flex-1">
                            <h3 className="font-bold text-gray-900 text-base sm:text-lg truncate">{user.name || 'Unknown User'}</h3>
                            <div className="flex items-center space-x-2 text-gray-600 text-xs sm:text-sm mt-1">
                                <FiMail className="text-gray-400 flex-shrink-0" />
                                <span className="truncate">{user.email}</span>
                            </div>
                        </div>
                    </div>
                    {getRoleBadge(user.role)}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
                    <div className="bg-gray-50 rounded-xl p-2 sm:p-3">
                        <div className="flex items-center space-x-2">
                            <FiCalendar className="text-blue-500 text-sm" />
                            <span className="text-xs sm:text-sm font-medium text-gray-700">Bookings</span>
                        </div>
                        <div className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{user.bookingCount}</div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-2 sm:p-3">
                        <div className="flex items-center space-x-2">
                            <FiClock className="text-green-500 text-sm" />
                            <span className="text-xs sm:text-sm font-medium text-gray-700">Joined</span>
                        </div>
                        <div className="text-sm font-bold text-gray-900 mt-1">
                            {new Date(user.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                </div>

                {/* Recent Bookings */}
                <div className="mb-4">
                    <h4 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 flex items-center space-x-2">
                        <FiBook className="text-gray-500" />
                        <span>Recent Bookings</span>
                    </h4>
                    <div className="space-y-2">
                        {user.recentBookings && user.recentBookings.length > 0 ? (
                            user.recentBookings.slice(0, 2).map((booking, idx) => (
                                <div key={idx} className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                                            {booking.tourName}
                                        </p>
                                        <p className="text-xs text-gray-500 truncate">
                                            {booking.destination}
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-1 ml-2">
                                        {getStatusIcon(booking.status)}
                                        <span className={`text-xs font-medium px-2 py-1 rounded-full hidden sm:inline ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                            {booking.status}
                                        </span>
                                        <span className={`text-xs font-medium px-2 py-1 rounded-full sm:hidden ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                            {booking.status.slice(0, 3)}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-2 sm:py-3 text-gray-500 text-xs sm:text-sm">
                                No recent bookings
                            </div>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <select
                        value={user.role || 'user'}
                        onChange={(e) => updateUserRole(user._id, e.target.value, user.name)}
                        className="flex-1 text-xs sm:text-sm border border-gray-300 rounded-xl px-2 sm:px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                        <option value="user">👤 User</option>
                        <option value="admin">👑 Admin</option>
                        <option value="guide">🧭 Guide</option>
                    </select>

                    <div className="flex space-x-2">
                        <button
                            onClick={() => viewUserBookings(user.email, user.name)}
                            className="flex-1 flex items-center justify-center space-x-1 bg-blue-500 text-white px-2 sm:px-3 py-2 rounded-xl hover:bg-blue-600 transition-colors text-xs sm:text-sm"
                        >
                            <FiEye className="text-xs sm:text-sm" />
                            <span className="hidden xs:inline">View</span>
                        </button>

                        <button
                            onClick={() => deleteUser(user._id, user.email, user.name)}
                            className="flex-1 flex items-center justify-center space-x-1 bg-red-500 text-white px-2 sm:px-3 py-2 rounded-xl hover:bg-red-600 transition-colors text-xs sm:text-sm"
                        >
                            <FiTrash2 className="text-xs sm:text-sm" />
                            <span className="hidden xs:inline">Delete</span>
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );

    if (loading) return <Loading />

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-4 sm:py-6 lg:py-8">
            <div className="container mx-auto px-3 sm:px-4 lg:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-6 sm:mb-8"
                >
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">👥 User Management</h1>
                    <p className="text-gray-600 text-sm sm:text-base">Manage all users and their booking activities</p>
                </motion.div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-2xl shadow-lg p-3 sm:p-4 lg:p-6 text-center border border-gray-100"
                    >
                        <div className="flex items-center justify-center space-x-2 mb-1 sm:mb-2">
                            <FiUsers className="text-lg sm:text-xl lg:text-2xl text-blue-500" />
                            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">{users.length}</div>
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600 font-medium">Total Users</div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-2xl shadow-lg p-3 sm:p-4 lg:p-6 text-center border border-gray-100"
                    >
                        <div className="flex items-center justify-center space-x-2 mb-1 sm:mb-2">
                            <FiShield className="text-lg sm:text-xl lg:text-2xl text-purple-500" />
                            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
                                {users.filter(u => u.role === 'admin').length}
                            </div>
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600 font-medium">Admins</div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white rounded-2xl shadow-lg p-3 sm:p-4 lg:p-6 text-center border border-gray-100"
                    >
                        <div className="flex items-center justify-center space-x-2 mb-1 sm:mb-2">
                            <FiNavigation className="text-lg sm:text-xl lg:text-2xl text-green-500" />
                            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
                                {users.filter(u => u.role === 'guide').length}
                            </div>
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600 font-medium">Guides</div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white rounded-2xl shadow-lg p-3 sm:p-4 lg:p-6 text-center border border-gray-100"
                    >
                        <div className="flex items-center justify-center space-x-2 mb-1 sm:mb-2">
                            <FiBook className="text-lg sm:text-xl lg:text-2xl text-orange-500" />
                            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
                                {users.reduce((total, user) => total + user.bookingCount, 0)}
                            </div>
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600 font-medium">Total Bookings</div>
                    </motion.div>
                </div>

                {/* Search and Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 border border-gray-100"
                >
                    <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
                        {/* Search */}
                        <div className="flex-1 w-full relative">
                            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
                            <input
                                type="text"
                                placeholder="Search users by name, email, or role..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-sm sm:text-base"
                            />
                        </div>

                        {/* Role Filter */}
                        <select
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-sm sm:text-base"
                        >
                            <option value="all">All Roles</option>
                            <option value="user">Users</option>
                            <option value="admin">Admins</option>
                            <option value="guide">Guides</option>
                        </select>

                        {/* Sort */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-sm sm:text-base"
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="bookings-high">Most Bookings</option>
                            <option value="bookings-low">Fewest Bookings</option>
                            <option value="name">Name A-Z</option>
                        </select>
                    </div>
                </motion.div>

                {/* Users Grid */}
                <AnimatePresence>
                    {filteredUsers.length > 0 ? (
                        <motion.div
                            layout
                            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6"
                        >
                            {filteredUsers.map((user, index) => (
                                <UserCard key={user._id} user={user} index={index} />
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-12 sm:py-16 bg-white rounded-2xl shadow-lg border border-gray-100"
                        >
                            <FiUsers className="text-4xl sm:text-6xl text-gray-400 mx-auto mb-3 sm:mb-4" />
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">No Users Found</h3>
                            <p className="text-gray-500 text-sm sm:text-base max-w-md mx-auto px-4">
                                {users.length === 0
                                    ? "No users are registered in the system yet."
                                    : "No users match your search criteria. Try adjusting your filters."
                                }
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <ToastContainer position="bottom-right" />
        </div>
    );
};


export default AllUsers;