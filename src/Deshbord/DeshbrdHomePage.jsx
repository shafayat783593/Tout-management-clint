import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    FiUsers,
    FiPackage,
    FiCalendar,
    FiDollarSign,
    FiTrendingUp,
    FiTrendingDown,
    FiShoppingCart,
    FiClock,
    FiCheckCircle,
    FiXCircle,
    FiBarChart2,
    FiMapPin,
    FiAward,
    FiRefreshCw,
    FiEye,
    FiStar,
    FiGlobe
} from 'react-icons/fi';
import {
    FaUserTie,
    FaUserCheck,
    FaMoneyBillWave,
    FaChartLine,
    FaChartPie,
    FaHotel,
    FaUmbrellaBeach,
    FaMountain,
    FaCity
} from 'react-icons/fa';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import Loading from '../components/Loading/Loading';

const AdminDashboard = () => {
    const [dashboardData, setDashboardData] = useState({
        users: { total: 0, admins: 0, guides: 0, active: 0 },
        bookings: { total: 0, pending: 0, confirmed: 0, cancelled: 0, completed: 0, revenue: 0 },
        packages: { total: 0, active: 0, inactive: 0, popular: 0 },
        payments: { total: 0, successful: 0, pending: 0, failed: 0, revenue: 0 },
        recentBookings: [],
        popularPackages: [],
        userStats: []
    });

    const [loading, setLoading] = useState(true);
    const [timeRange, setTimeRange] = useState('month');
    const axiosSecure = UseAxiosSecure();

    useEffect(() => {
        fetchDashboardData();
    }, [timeRange]);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);

            // Fetch all data from backend APIs
            const [
                usersResponse,
                bookingsResponse,
                packagesResponse,
                recentBookingsResponse,
                paymentsResponse
            ] = await Promise.all([
                axiosSecure.get('/api/bookings/admin/users-with-stats'),
                axiosSecure.get('/bookingStats'),
                axiosSecure.get('/allPackages'),
                axiosSecure.get('/allBookings?limit=5'),
                axiosSecure.get('/api/payments/stats')
            ]);

            const usersData = usersResponse.data;
            const bookingsData = bookingsResponse.data;
            const packagesData = packagesResponse.data;
            const recentBookingsData = recentBookingsResponse.data;
            const paymentsData = paymentsResponse.data;

            // Process the data for dashboard
            const processedData = {
                users: {
                    total: usersData.overallStats?.totalUsers || 0,
                    admins: usersData.overallStats?.totalAdmins || 0,
                    guides: usersData.overallStats?.totalGuides || 0,
                    active: usersData.users?.filter(user => user.bookingCount > 0).length || 0
                },
                bookings: {
                    total: bookingsData.stats?.total || 0,
                    pending: bookingsData.stats?.pending || 0,
                    confirmed: bookingsData.stats?.confirmed || 0,
                    cancelled: bookingsData.stats?.cancelled || 0,
                    completed: bookingsData.stats?.completed || 0,
                    revenue: paymentsData.stats?.totalRevenue || 0
                },
                packages: {
                    total: packagesData.length || 0,
                    active: packagesData.filter(pkg => pkg.status === 'active').length || 0,
                    inactive: packagesData.filter(pkg => pkg.status === 'inactive').length || 0,
                    popular: packagesData.filter(pkg => pkg.bookingCount > 10).length || 0
                },
                payments: {
                    total: paymentsData.stats?.totalPayments || 0,
                    successful: paymentsData.stats?.successfulPayments || 0,
                    pending: paymentsData.stats?.pendingPayments || 0,
                    failed: paymentsData.stats?.failedPayments || 0,
                    revenue: paymentsData.stats?.totalRevenue || 0
                },
                recentBookings: recentBookingsData.bookings?.slice(0, 5) || [],
                popularPackages: packagesData
                    .sort((a, b) => (b.bookingCount || 0) - (a.bookingCount || 0))
                    .slice(0, 4) || [],
                userStats: usersData.users?.slice(0, 4) || []
            };

            setDashboardData(processedData);
            toast.success('🎉 Dashboard updated successfully!');

        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            toast.error('Failed to load dashboard data');

            // Fallback to mock data if API fails
            setDashboardData(getMockData());
        } finally {
            setLoading(false);
        }
    };

    // Mock data fallback
    const getMockData = () => ({
        users: { total: 0, admins: 0, guides: 0, active: 0 },
        bookings: { total: 0, pending: 0, confirmed: 0, cancelled: 0, completed: 0, revenue: 0 },
        packages: { total: 0, active: 0, inactive: 0, popular: 0 },
        payments: { total: 0, successful: 0, pending: 0, failed: 0, revenue: 0 },
        recentBookings: [],
        popularPackages: [],
        userStats: []
    });

    const StatCard = ({ title, value, change, icon, color, delay = 0 }) => (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ delay, type: "spring", stiffness: 300 }}
            className={`bg-white rounded-2xl shadow-lg p-4 sm:p-6 border-l-4 ${color} hover:shadow-xl transition-all duration-300 group cursor-pointer relative overflow-hidden`}
        >
            <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-white to-transparent opacity-50 rounded-full -translate-y-8 sm:-translate-y-10 translate-x-8 sm:translate-x-10"></div>
            <div className="flex items-center justify-between relative z-10">
                <div className="flex-1">
                    <p className="text-xs sm:text-sm font-semibold text-gray-600 group-hover:text-gray-700 transition-colors mb-1 sm:mb-2">
                        {title}
                    </p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        {value}
                    </p>
                    {change !== undefined && (
                        <p className={`text-xs sm:text-sm font-semibold mt-1 sm:mt-2 flex items-center space-x-1 ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {change > 0 ? <FiTrendingUp /> : <FiTrendingDown />}
                            <span>{change > 0 ? '+' : ''}{change}% this month</span>
                        </p>
                    )}
                </div>
                <div className={`p-2 sm:p-3 rounded-xl bg-gradient-to-br ${color.replace('border-l-', 'from-')} to-white group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                    {React.cloneElement(icon, { className: "text-lg sm:text-2xl text-white" })}
                </div>
            </div>
        </motion.div>
    );

    const BookingStatusBadge = ({ status }) => {
        const styles = {
            pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
            confirmed: 'bg-green-100 text-green-800 border-green-300',
            cancelled: 'bg-red-100 text-red-800 border-red-300',
            completed: 'bg-blue-100 text-blue-800 border-blue-300'
        };

        const icons = {
            pending: <FiClock className="text-yellow-600" />,
            confirmed: <FiCheckCircle className="text-green-600" />,
            cancelled: <FiXCircle className="text-red-600" />,
            completed: <FaUserCheck className="text-blue-600" />
        };

        return (
            <motion.span
                whileHover={{ scale: 1.05 }}
                className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold border ${styles[status]} transition-all duration-200`}
            >
                {icons[status]}
                <span className="capitalize hidden sm:inline">{status}</span>
                <span className="capitalize sm:hidden text-xs">{status.slice(0, 3)}</span>
            </motion.span>
        );
    };

    const PackageCard = ({ pkg, index }) => {
        const getPackageIcon = (destination) => {
            if (destination?.toLowerCase().includes('beach') || destination?.toLowerCase().includes('island')) {
                return <FaUmbrellaBeach className="text-white" />;
            } else if (destination?.toLowerCase().includes('mountain') || destination?.toLowerCase().includes('hill')) {
                return <FaMountain className="text-white" />;
            } else if (destination?.toLowerCase().includes('city') || destination?.toLowerCase().includes('urban')) {
                return <FaCity className="text-white" />;
            } else {
                return <FaHotel className="text-white" />;
            }
        };

        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:border-orange-200 hover:shadow-lg transition-all duration-300 group"
            >
                <div className="flex-shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                        {getPackageIcon(pkg.destination)}
                    </div>
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-orange-600 transition-colors truncate">
                        {pkg.tourName}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">
                        {pkg.destination}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs font-bold text-gray-900">
                            ৳{pkg.price?.toLocaleString()}
                        </span>
                        <span className="text-xs text-gray-500 hidden sm:inline">
                            • {pkg.bookingCount || 0} bookings
                        </span>
                    </div>
                </div>
                {pkg.specialPackage && (
                    <FiAward className="text-yellow-500 flex-shrink-0 text-sm sm:text-base" />
                )}
            </motion.div>
        );
    };

    const UserCard = ({ user, index }) => {
        const getRoleIcon = (role) => {
            switch (role) {
                case 'admin':
                    return <FaUserTie className="text-purple-500" />;
                case 'guide':
                    return <FiUsers className="text-green-500" />;
                default:
                    return <FaUserCheck className="text-blue-500" />;
            }
        };

        const getRoleColor = (role) => {
            switch (role) {
                case 'admin':
                    return 'bg-purple-100 text-purple-800 border-purple-300';
                case 'guide':
                    return 'bg-green-100 text-green-800 border-green-300';
                default:
                    return 'bg-blue-100 text-blue-800 border-blue-300';
            }
        };

        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2 }}
                transition={{ delay: 1.0 + index * 0.1 }}
                className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:border-purple-200 hover:shadow-lg transition-all duration-300 group"
            >
                <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className={`p-2 sm:p-3 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300 ${user.role === 'admin' ? 'bg-purple-100' :
                        user.role === 'guide' ? 'bg-green-100' : 'bg-blue-100'
                        }`}>
                        {getRoleIcon(user.role)}
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-purple-600 transition-colors truncate">
                            {user.name}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">
                            {user.bookingCount || 0} bookings • ৳{(user.totalSpent || 0).toLocaleString()}
                        </p>
                    </div>
                </div>
                <div className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-bold border ${getRoleColor(user.role)} hidden sm:block`}>
                    {user.role}
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-bold border ${getRoleColor(user.role)} sm:hidden`}>
                    {user.role.slice(0, 1)}
                </div>
            </motion.div>
        );
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-3 sm:p-4 lg:p-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 sm:mb-8"
            >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="text-center lg:text-left mb-4 lg:mb-0">
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Dashboard Overview
                        </h1>
                        <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-lg">Welcome back! Here's what's happening today.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 justify-center lg:justify-end">
                        <div className="flex flex-wrap justify-center gap-2 bg-white rounded-2xl p-2 shadow-lg border w-full sm:w-auto">
                            {['today', 'week', 'month', 'year'].map((range) => (
                                <motion.button
                                    key={range}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setTimeRange(range)}
                                    className={`px-3 sm:px-4 py-2 rounded-xl font-semibold transition-all duration-200 text-xs sm:text-sm ${timeRange === range
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                                        : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    {range.charAt(0).toUpperCase() + range.slice(1)}
                                </motion.button>
                            ))}
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05, rotate: 180 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={fetchDashboardData}
                            className="p-2 sm:p-3 bg-white rounded-2xl shadow-lg border hover:shadow-xl transition-all duration-300 w-full sm:w-auto flex justify-center"
                        >
                            <FiRefreshCw className="text-gray-600 text-sm sm:text-base" />
                        </motion.button>
                    </div>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <StatCard
                    title="Total Revenue"
                    value={`৳${(dashboardData.bookings.revenue / 1000000).toFixed(1)}M`}
                    change={15.8}
                    icon={<FaMoneyBillWave />}
                    color="border-l-green-500 from-green-500"
                    delay={0.1}
                />
                <StatCard
                    title="Total Bookings"
                    value={dashboardData.bookings.total.toLocaleString()}
                    change={8.7}
                    icon={<FiCalendar />}
                    color="border-l-blue-500 from-blue-500"
                    delay={0.2}
                />
                <StatCard
                    title="Active Users"
                    value={dashboardData.users.active.toLocaleString()}
                    change={12.3}
                    icon={<FiUsers />}
                    color="border-l-purple-500 from-purple-500"
                    delay={0.3}
                />
                <StatCard
                    title="Tour Packages"
                    value={dashboardData.packages.total}
                    change={5.2}
                    icon={<FiPackage />}
                    color="border-l-orange-500 from-orange-500"
                    delay={0.4}
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
                {/* Left Column - 2/3 width */}
                <div className="xl:col-span-2 space-y-6 sm:space-y-8">
                    {/* Revenue & Analytics Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-100"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6">
                            <h2 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-0">
                                <div className="p-2 bg-gradient-to-r from-green-500 to-green-600 rounded-xl">
                                    <FaChartLine className="text-white text-base sm:text-lg" />
                                </div>
                                <span>Revenue Analytics</span>
                            </h2>
                            <div className="text-center sm:text-right">
                                <p className="text-xl sm:text-2xl font-bold text-gray-900">৳{(dashboardData.bookings.revenue / 1000000).toFixed(1)}M</p>
                                <p className="text-xs sm:text-sm text-green-600 flex items-center justify-center sm:justify-end">
                                    <FiTrendingUp className="mr-1" />
                                    +15.8% this month
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                            {[
                                { label: 'Total Payments', value: dashboardData.payments.total, icon: <FiDollarSign className="text-blue-500" />, color: 'blue' },
                                { label: 'Successful', value: dashboardData.payments.successful, icon: <FiCheckCircle className="text-green-500" />, color: 'green' },
                                { label: 'Pending', value: dashboardData.payments.pending, icon: <FiClock className="text-yellow-500" />, color: 'yellow' },
                                { label: 'Failed', value: dashboardData.payments.failed, icon: <FiXCircle className="text-red-500" />, color: 'red' }
                            ].map((item, index) => (
                                <motion.div
                                    key={item.label}
                                    whileHover={{ scale: 1.05 }}
                                    className="text-center p-3 sm:p-4 bg-gray-50 rounded-xl border-2 border-gray-200 hover:shadow-md transition-all duration-300"
                                >
                                    <div className="flex justify-center mb-1 sm:mb-2">
                                        {item.icon}
                                    </div>
                                    <div className="text-base sm:text-lg font-bold text-gray-900">
                                        {item.value}
                                    </div>
                                    <div className="text-xs font-semibold text-gray-600">
                                        {item.label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Recent Bookings */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-100"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6">
                            <h2 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-0">
                                <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
                                    <FiShoppingCart className="text-white text-base sm:text-lg" />
                                </div>
                                <span>Recent Bookings</span>
                            </h2>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
                            >
                                View All
                            </motion.button>
                        </div>

                        <div className="space-y-3 sm:space-y-4">
                            <AnimatePresence>
                                {dashboardData.recentBookings.length > 0 ? (
                                    dashboardData.recentBookings.map((booking, index) => (
                                        <motion.div
                                            key={booking._id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            whileHover={{ y: -2, scale: 1.01 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300 group"
                                        >
                                            <div className="flex items-center space-x-3 sm:space-x-4 flex-1 mb-2 sm:mb-0">
                                                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                                                    <FiGlobe className="text-white text-base sm:text-lg" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-sm sm:text-base font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                                                        {booking.tourName}
                                                    </p>
                                                    <p className="text-xs sm:text-sm text-gray-600 truncate">
                                                        {booking.buyerName} • {booking.buyerEmail}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between sm:justify-end space-x-2 sm:space-x-4 w-full sm:w-auto">
                                                <div className="text-left sm:text-right">
                                                    <p className="text-sm sm:text-base font-bold text-gray-900">
                                                        ৳{booking.price?.toLocaleString()}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString() : 'N/A'}
                                                    </p>
                                                </div>
                                                <BookingStatusBadge status={booking.status} />
                                            </div>
                                        </motion.div>
                                    ))
                                ) : (
                                    <div className="text-center py-6 sm:py-8 text-gray-500">
                                        <FiShoppingCart className="text-3xl sm:text-4xl text-gray-300 mx-auto mb-3 sm:mb-4" />
                                        <p className="text-sm sm:text-base">No recent bookings found</p>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>

                {/* Right Column - 1/3 width */}
                <div className="xl:col-span-1 space-y-6 sm:space-y-8">
                    {/* Booking Statistics */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                        className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-100"
                    >
                        <h2 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                            <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl">
                                <FaChartPie className="text-white text-base sm:text-lg" />
                            </div>
                            <span>Booking Statistics</span>
                        </h2>

                        <div className="space-y-3 sm:space-y-4">
                            {[
                                { label: 'Confirmed', value: dashboardData.bookings.confirmed, color: 'green', icon: <FiCheckCircle /> },
                                { label: 'Pending', value: dashboardData.bookings.pending, color: 'yellow', icon: <FiClock /> },
                                { label: 'Completed', value: dashboardData.bookings.completed, color: 'blue', icon: <FaUserCheck /> },
                                { label: 'Cancelled', value: dashboardData.bookings.cancelled, color: 'red', icon: <FiXCircle /> }
                            ].map((item, index) => (
                                <motion.div
                                    key={item.label}
                                    whileHover={{ scale: 1.02 }}
                                    className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300"
                                >
                                    <div className="flex items-center space-x-2 sm:space-x-3">
                                        <div className={`p-1 sm:p-2 rounded-lg bg-${item.color}-100`}>
                                            {React.cloneElement(item.icon, { className: `text-${item.color}-500 text-sm sm:text-base` })}
                                        </div>
                                        <span className="text-sm sm:text-base font-semibold text-gray-700">{item.label}</span>
                                    </div>
                                    <span className="text-base sm:text-lg font-bold text-gray-900">{item.value}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Popular Packages */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 }}
                        className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-100"
                    >
                        <h2 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                            <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl">
                                <FiStar className="text-white text-base sm:text-lg" />
                            </div>
                            <span>Popular Packages</span>
                        </h2>

                        <div className="space-y-3 sm:space-y-4">
                            {dashboardData.popularPackages.length > 0 ? (
                                dashboardData.popularPackages.map((pkg, index) => (
                                    <PackageCard key={pkg._id} pkg={pkg} index={index} />
                                ))
                            ) : (
                                <div className="text-center py-6 sm:py-8 text-gray-500">
                                    <FiPackage className="text-3xl sm:text-4xl text-gray-300 mx-auto mb-3 sm:mb-4" />
                                    <p className="text-sm sm:text-base">No packages available</p>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Top Users */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9 }}
                        className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-100"
                    >
                        <h2 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                            <div className="p-2 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl">
                                <FiUsers className="text-white text-base sm:text-lg" />
                            </div>
                            <span>Top Users</span>
                        </h2>

                        <div className="space-y-3 sm:space-y-4">
                            {dashboardData.userStats.length > 0 ? (
                                dashboardData.userStats.map((user, index) => (
                                    <UserCard key={user._id} user={user} index={index} />
                                ))
                            ) : (
                                <div className="text-center py-6 sm:py-8 text-gray-500">
                                    <FiUsers className="text-3xl sm:text-4xl text-gray-300 mx-auto mb-3 sm:mb-4" />
                                    <p className="text-sm sm:text-base">No user data available</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>

            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                toastClassName="rounded-2xl shadow-lg"
                progressClassName="bg-gradient-to-r from-blue-500 to-purple-600"
            />
        </div>
    );
};

export default AdminDashboard;