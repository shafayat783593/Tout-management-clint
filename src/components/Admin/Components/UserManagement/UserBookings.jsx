import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const UserBookings = ({ user }) => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        confirmed: 0,
        cancelled: 0
    });

    useEffect(() => {
        fetchUserBookings();
    }, [user]);

    const fetchUserBookings = async () => {
        if (!user?.email) return;

        try {
            setLoading(true);
            const response = await fetch(`https://tour-management-server-ashen.vercel.app/myBooking/${user.email}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                const result = await response.json();
                setBookings(result);

                // Calculate stats
                const stats = {
                    total: result.length,
                    pending: result.filter(b => b.status === 'pending').length,
                    confirmed: result.filter(b => b.status === 'confirmed').length,
                    cancelled: result.filter(b => b.status === 'cancelled').length
                };
                setStats(stats);
            } else {
                throw new Error('Failed to fetch bookings');
            }
        } catch (error) {
            console.error('Error fetching bookings:', error);
            toast.error('Failed to load bookings');
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status) => {
        const statusStyles = {
            pending: 'bg-yellow-100 text-yellow-800',
            confirmed: 'bg-green-100 text-green-800',
            cancelled: 'bg-red-100 text-red-800',
            completed: 'bg-blue-100 text-blue-800'
        };

        return (
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>
                {status?.charAt(0).toUpperCase() + status?.slice(1)}
            </span>
        );
    };

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            {/* Booking Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                    <div className="text-sm text-gray-600">Total Bookings</div>
                </div>
                <div className="bg-white rounded-lg shadow p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
                    <div className="text-sm text-gray-600">Pending</div>
                </div>
                <div className="bg-white rounded-lg shadow p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{stats.confirmed}</div>
                    <div className="text-sm text-gray-600">Confirmed</div>
                </div>
                <div className="bg-white rounded-lg shadow p-4 text-center">
                    <div className="text-2xl font-bold text-red-600">{stats.cancelled}</div>
                    <div className="text-sm text-gray-600">Cancelled</div>
                </div>
            </div>

            {/* Bookings List */}
            <div className="bg-white rounded-lg shadow-lg">
                <div className="p-6 border-b">
                    <h2 className="text-2xl font-bold text-gray-800">My Bookings</h2>
                    <p className="text-gray-600">Your tour package bookings</p>
                </div>

                {bookings.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="text-gray-400 text-6xl mb-4">📅</div>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No Bookings Found</h3>
                        <p className="text-gray-500">You haven't made any bookings yet.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Package
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Guests
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Price
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {bookings.map((booking, index) => (
                                    <motion.tr
                                        key={booking._id || index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <img
                                                        className="h-10 w-10 rounded-lg object-cover"
                                                        src={booking.packageImage || '/default-package.jpg'}
                                                        alt={booking.tourName}
                                                    />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {booking.tourName}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {booking.destination}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {new Date(booking.tourDate).toLocaleDateString()}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {booking.duration} days
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {booking.guests} guests
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            ৳{booking.totalPrice}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getStatusBadge(booking.status)}
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default UserBookings;