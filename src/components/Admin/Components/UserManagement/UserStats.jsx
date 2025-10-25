import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const UserStats = ({ user }) => {
    const [stats, setStats] = useState({
        totalBookings: 0,
        totalSpent: 0,
        favoriteDestination: '',
        bookingHistory: []
    });

    useEffect(() => {
        fetchUserStats();
    }, [user]);

    const fetchUserStats = async () => {
        if (!user?.email) return;

        try {
            const response = await fetch(`https://tour-management-server-ashen.vercel.app/myBooking/${user.email}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                const bookings = await response.json();

                // Calculate statistics
                const totalBookings = bookings.length;
                const totalSpent = bookings.reduce((sum, booking) => sum + (booking.totalPrice || 0), 0);

                // Find favorite destination
                const destinationCount = {};
                bookings.forEach(booking => {
                    if (booking.destination) {
                        destinationCount[booking.destination] = (destinationCount[booking.destination] || 0) + 1;
                    }
                });

                const favoriteDestination = Object.keys(destinationCount).reduce((a, b) =>
                    destinationCount[a] > destinationCount[b] ? a : b, 'N/A'
                );

                setStats({
                    totalBookings,
                    totalSpent,
                    favoriteDestination,
                    bookingHistory: bookings
                });
            }
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            {/* Main Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                        {stats.totalBookings}
                    </div>
                    <div className="text-lg font-semibold text-gray-700">Total Bookings</div>
                    <div className="text-sm text-gray-500 mt-2">All time bookings</div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                        ৳{stats.totalSpent.toLocaleString()}
                    </div>
                    <div className="text-lg font-semibold text-gray-700">Total Spent</div>
                    <div className="text-sm text-gray-500 mt-2">Overall expenditure</div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                        {stats.favoriteDestination}
                    </div>
                    <div className="text-lg font-semibold text-gray-700">Favorite Destination</div>
                    <div className="text-sm text-gray-500 mt-2">Most visited place</div>
                </div>
            </div>

            {/* Monthly Stats */}
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Booking Overview</h3>

                {stats.bookingHistory.length === 0 ? (
                    <div className="text-center py-8">
                        <div className="text-gray-400 text-4xl mb-4">📊</div>
                        <p className="text-gray-500">No booking data available</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {stats.bookingHistory.slice(0, 5).map((booking, index) => (
                            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                                <div>
                                    <div className="font-semibold">{booking.tourName}</div>
                                    <div className="text-sm text-gray-500">{booking.destination}</div>
                                </div>
                                <div className="text-right">
                                    <div className="font-semibold">৳{booking.totalPrice}</div>
                                    <div className="text-sm text-gray-500">
                                        {new Date(booking.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default UserStats;