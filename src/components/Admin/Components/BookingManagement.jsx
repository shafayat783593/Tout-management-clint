import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../Loading/Loading';

const BookingManagement = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({});
    const [filters, setFilters] = useState({
        status: 'all',
        search: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        fetchAllBookings();
        fetchBookingStats();
    }, []);

    const fetchAllBookings = async () => {
        try {
            setLoading(true);
            setError('');
            console.log("🔄 Fetching bookings from API...");

            const response = await fetch('https://tour-management-server-ashen.vercel.app/allBookings');
                console.log("📡 API Response status:", response.status);

            if (response.ok) {
                const result = await response.json();
                console.log("✅ Bookings data received:", result);
                setBookings(result.bookings || []);
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error('❌ Error fetching bookings:', error);
            setError(error.message);
            toast.error(`Failed to load bookings: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const fetchBookingStats = async () => {
        try {
            const response = await fetch('https://tour-management-server-ashen.vercel.app/bookingStats');

            if (response.ok) {
                const result = await response.json();
                setStats(result.stats || {});
            }
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const handleStatusUpdate = async (bookingId, newStatus) => {
        try {
            const response = await fetch(`https://tour-management-server-ashen.vercel.app/updateBookingStatus/${bookingId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    toast.success(`Booking status updated to ${newStatus}`);
                    fetchAllBookings();
                } else {
                    throw new Error(result.error);
                }
            } else {
                throw new Error('Failed to update status');
            }
        } catch (error) {
            console.error('Error updating status:', error);
            toast.error('Failed to update booking status');
        }
    };

    const filteredBookings = bookings.filter(booking => {
        const statusMatch = filters.status === 'all' || booking.status === filters.status;
        const searchMatch = filters.search === '' ||
            (booking.tourName && booking.tourName.toLowerCase().includes(filters.search.toLowerCase())) ||
            (booking.buyerEmail && booking.buyerEmail.toLowerCase().includes(filters.search.toLowerCase())) ||
            (booking.buyerName && booking.buyerName.toLowerCase().includes(filters.search.toLowerCase())) ||
            (booking.destination && booking.destination.toLowerCase().includes(filters.search.toLowerCase()));

        return statusMatch && searchMatch;
    });

    const getStatusBadge = (status) => {
        const statusStyles = {
            pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            confirmed: 'bg-green-100 text-green-800 border-green-200',
            cancelled: 'bg-red-100 text-red-800 border-red-200',
            completed: 'bg-blue-100 text-blue-800 border-blue-200'
        };

        return (
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>
                {status?.charAt(0).toUpperCase() + status?.slice(1)}
            </span>
        );
    };

    const exportToCSV = () => {
        const headers = ['Booking ID', 'Tour Name', 'Destination', 'Customer Name', 'Customer Email', 'Contact No', 'Booking Date', 'Price', 'Status', 'Departure Location', 'Special Note'];

        const csvData = filteredBookings.map(booking => [
            booking._id?.toString().slice(-6) || 'N/A',
            booking.tourName || 'N/A',
            booking.destination || 'N/A',
            booking.buyerName || 'N/A',
            booking.buyerEmail || 'N/A',
            booking.contactNo || 'N/A',
            booking.bookingDate || 'N/A',
            `৳${booking.price || 0}`,
            booking.status || 'N/A',
            booking.departureLocation || 'N/A',
            booking.specialNote || 'N/A'
        ]);

        const csvContent = [headers, ...csvData]
            .map(row => row.map(field => `"${field}"`).join(','))
            .join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `bookings-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);

        toast.success('Data exported successfully!');
    };

    // Test connection function
    const testConnection = async () => {
        try {
            const response = await fetch('https://tour-management-server-ashen.vercel.app/allBookings');
            const result = await response.json();
            console.log("Connection test result:", result);
            toast.info(`Found ${result.count} bookings`);
        } catch (error) {
            console.error('Connection test failed:', error);
            toast.error('Connection test failed');
        }
    };

    if (loading) return <Loading />

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="container mx-auto px-4">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                        <strong className="font-bold">Error! </strong>
                        <span className="block sm:inline">{error}</span>
                        <div className="mt-4">
                            <button
                                onClick={testConnection}
                                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                            >
                                Test Connection
                            </button>
                            <button
                                onClick={fetchAllBookings}
                                className="bg-green-500 text-white px-4 py-2 rounded"
                            >
                                Retry
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">All Bookings</h1>
                    <p className="text-gray-600">Manage and view all customer bookings</p>
                </motion.div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-lg shadow p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">{stats.total || 0}</div>
                        <div className="text-sm text-gray-600">Total Bookings</div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4 text-center">
                        <div className="text-2xl font-bold text-yellow-600">{stats.pending || 0}</div>
                        <div className="text-sm text-gray-600">Pending</div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">{stats.confirmed || 0}</div>
                        <div className="text-sm text-gray-600">Confirmed</div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4 text-center">
                        <div className="text-2xl font-bold text-red-600">{stats.cancelled || 0}</div>
                        <div className="text-sm text-gray-600">Cancelled</div>
                    </div>
                </div>

                {/* Filters and Actions */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Status Filter
                            </label>
                            <select
                                value={filters.status}
                                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="cancelled">Cancelled</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Search
                            </label>
                            <input
                                type="text"
                                placeholder="Search by tour, email, name, or destination..."
                                value={filters.search}
                                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex items-end space-x-2">
                            {/* <button
                                onClick={fetchAllBookings}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Refresh
                            </button> */}
                        </div>
                        <div className="flex items-end">
                            <button
                                onClick={exportToCSV}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300 flex items-center"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Export CSV
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bookings Count */}
                <div className="mb-4">
                    <p className="text-gray-600">
                        Showing <span className="font-semibold">{filteredBookings.length}</span> of <span className="font-semibold">{bookings.length}</span> bookings
                    </p>
                </div>

                {/* Bookings Table */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Booking Info
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Customer Details
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Tour Details
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Price & Status
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredBookings.map((booking, index) => (
                                    <motion.tr
                                        key={booking._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {booking._id?.toString().slice(-6) || 'N/A'}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                Booked: {booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : 'N/A'}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                Tour: {booking.tourId ? `#${booking.tourId.slice(-6)}` : 'N/A'}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {booking.buyerName || 'N/A'}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {booking.buyerEmail || 'N/A'}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {booking.contactNo || 'N/A'}
                                            </div>
                                            {booking.specialNote && (
                                                <div className="text-sm text-gray-500 mt-1">
                                                    {booking.specialNote}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {booking.tourName || 'N/A'}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                From: {booking.departureLocation || 'N/A'}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                To: {booking.destination || 'N/A'}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                Date: {booking.bookingDate || 'N/A'}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="text-lg font-semibold text-green-600 mb-2">
                                                ৳{booking.price || 0}
                                            </div>
                                            <div className="mb-2">
                                                {getStatusBadge(booking.status)}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex flex-col space-y-2">
                                                <select
                                                    value={booking.status || 'pending'}
                                                    onChange={(e) => handleStatusUpdate(booking._id, e.target.value)}
                                                    className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500"
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="confirmed">Confirmed</option>
                                                    <option value="cancelled">Cancelled</option>
                                                    <option value="completed">Completed</option>
                                                </select>
                                                <button
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(booking._id);
                                                        toast.success('Booking ID copied!');
                                                    }}
                                                    className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded hover:bg-gray-200"
                                                >
                                                    Copy ID
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredBookings.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-gray-400 text-6xl mb-4">📅</div>
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Bookings Found</h3>
                            <p className="text-gray-500">
                                {bookings.length === 0
                                    ? "No bookings available in the system."
                                    : "No bookings match your current filters."
                                }
                            </p>
                        </div>
                    )}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default BookingManagement;