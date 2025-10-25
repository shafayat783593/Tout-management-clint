// src/components/MyBooking/MyBooking.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UseAuth from "../../Hooks/UseAuth";
import Loading from "../../components/Loading/Loading";
import PageTitle from "../../Hooks/PageTitle";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
    FaCheckCircle,
    FaTimesCircle,
    FaClock,
    FaReceipt,
    FaEye,
    FaPrint,
    FaCreditCard,
    FaArrowRight
} from "react-icons/fa";

const MyBooking = () => {
    const { user } = UseAuth();
    const axiosSecure = UseAxiosSecure();
    const navigate = useNavigate();

    // Fetch user's bookings with payment data
    const { data: bookings = [], isLoading, refetch } = useQuery({
        queryKey: ['myBookings', user?.email],
        queryFn: async () => {
            if (!user?.email) return [];
            const res = await axiosSecure.get(`/api/bookings/user/${user.email}`);
            return res.data.bookings || [];
        },
        enabled: !!user?.email
    });

    // Fetch user's payments
    const { data: payments = [] } = useQuery({
        queryKey: ['myPayments', user?.email],
        queryFn: async () => {
            if (!user?.email) return [];
            const res = await axiosSecure.get(`/api/payments/user/${user.email}`);
            return res.data.payments || [];
        },
        enabled: !!user?.email
    });

    // Combine booking and payment data
    const bookingWithPayments = bookings.map(booking => {
        const payment = payments.find(p => p.bookingId === booking._id);
        return {
            ...booking,
            payment: payment || null
        };
    });

    // Function to handle payment navigation
    const handlePayNow = (booking) => {
        console.log("🔄 Navigating to payment for booking:", booking._id);

        // Navigate to payment page with booking ID in URL and data in state
        navigate(`/payment/${booking._id}`, {
            state: {
                booking: booking,
                amount: booking.price
            }
        });
    };

    // Function to handle view details
    const handleViewDetails = (booking) => {
        // Navigate to booking details page
        navigate(`/booking-details/${booking._id}`);
    };

    // Function to handle view receipt
    const handleViewReceipt = (payment) => {
        // Navigate to receipt page or open receipt modal
        navigate(`/receipt/${payment._id}`);
    };

    // Function to get status badge
    const getStatusBadge = (status, paymentStatus) => {
        if (paymentStatus === 'paid') {
            return {
                text: 'Paid & Confirmed',
                color: 'bg-green-100 text-green-800 border-green-300',
                icon: <FaCheckCircle className="text-green-500" />,
                showPayButton: false
            };
        }

        switch (status) {
            case 'confirmed':
                return {
                    text: 'Confirmed',
                    color: 'bg-blue-100 text-blue-800 border-blue-300',
                    icon: <FaCheckCircle className="text-blue-500" />,
                    showPayButton: false
                };
            case 'pending':
                return {
                    text: 'Pending Payment',
                    color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
                    icon: <FaClock className="text-yellow-500" />,
                    showPayButton: true
                };
            case 'cancelled':
                return {
                    text: 'Cancelled',
                    color: 'bg-red-100 text-red-800 border-red-300',
                    icon: <FaTimesCircle className="text-red-500" />,
                    showPayButton: false
                };
            default:
                return {
                    text: 'Processing',
                    color: 'bg-gray-100 text-gray-800 border-gray-300',
                    icon: <FaClock className="text-gray-500" />,
                    showPayButton: false
                };
        }
    };

    // Format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-BD', {
            style: 'currency',
            currency: 'BDT'
        }).format(amount);
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <PageTitle title="My Bookings" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
                    <p className="text-gray-600 mt-2">
                        Manage and view all your tour bookings and payments
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <FaReceipt className="text-blue-600 text-xl" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                                <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <FaCheckCircle className="text-green-600 text-xl" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Paid Bookings</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {bookings.filter(b => b.paymentStatus === 'paid').length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-yellow-100 rounded-lg">
                                <FaClock className="text-yellow-600 text-xl" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Pending</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {bookings.filter(b => b.paymentStatus !== 'paid').length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <FaEye className="text-purple-600 text-xl" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {formatCurrency(
                                        payments.reduce((total, payment) => total + payment.amount, 0)
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bookings List */}
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    {bookingWithPayments.length === 0 ? (
                        <div className="text-center py-12">
                            <FaReceipt className="mx-auto text-6xl text-gray-300 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Bookings Found</h3>
                            <p className="text-gray-600">You haven't made any bookings yet.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Tour Details
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Booking Date
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Amount
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Payment Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {bookingWithPayments.map((booking) => {
                                        const statusBadge = getStatusBadge(booking.status, booking.paymentStatus);
                                        return (
                                            <tr key={booking._id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {booking.tourName}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {booking.destination}
                                                        </div>
                                                        <div className="text-xs text-gray-400">
                                                            Booking ID: {booking._id}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {formatDate(booking.bookingDate)}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {formatDate(booking.createdAt)}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-semibold text-gray-900">
                                                        {formatCurrency(booking.price)}
                                                    </div>
                                                    {booking.payment && (
                                                        <div className="text-xs text-green-600">
                                                            Paid: {formatCurrency(booking.payment.amount)}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusBadge.color}`}>
                                                        {statusBadge.icon}
                                                        <span className="ml-1">{statusBadge.text}</span>
                                                    </span>
                                                    {booking.payment && (
                                                        <div className="text-xs text-gray-500 mt-1">
                                                            Transaction: {booking.payment.transactionId}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex flex-col space-y-2">
                                                        <div className="flex space-x-2">
                                                            <button
                                                                className="text-blue-600 hover:text-blue-900 flex items-center text-xs"
                                                                onClick={() => handleViewDetails(booking)}
                                                            >
                                                                <FaEye className="mr-1" />
                                                                View
                                                            </button>
                                                            {booking.payment && (
                                                                <button
                                                                    className="text-green-600 hover:text-green-900 flex items-center text-xs"
                                                                    onClick={() => handleViewReceipt(booking.payment)}
                                                                >
                                                                    <FaPrint className="mr-1" />
                                                                    Receipt
                                                                </button>
                                                            )}
                                                        </div>

                                                        {/* Pay Now Button - Only show for pending payments */}
                                                        {statusBadge.showPayButton && (
                                                            <button
                                                                onClick={() => handlePayNow(booking)}
                                                                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-2 px-4 rounded-lg font-semibold text-sm flex items-center justify-center transition-all duration-200 transform hover:scale-105 shadow-md"
                                                            >
                                                                <FaCreditCard className="mr-2" />
                                                                Pay Now
                                                                <FaArrowRight className="ml-2" />
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Payment History Section */}
                {payments.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment History</h2>
                        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Transaction
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Tour
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Amount
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {payments.map((payment) => (
                                            <tr key={payment._id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {payment.transactionId}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {payment.paymentMethod.toUpperCase()}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {payment.tourName}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {payment.destination}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-semibold text-green-600">
                                                        {formatCurrency(payment.amount)}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {formatDate(payment.paymentDate)}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                        <FaCheckCircle className="mr-1" />
                                                        {payment.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Pending Payments Alert */}
                {bookings.filter(b => b.paymentStatus !== 'paid').length > 0 && (
                    <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-center">
                            <FaClock className="text-yellow-600 mr-3" />
                            <div>
                                <h3 className="text-sm font-medium text-yellow-800">
                                    Pending Payments
                                </h3>
                                <p className="text-sm text-yellow-700 mt-1">
                                    You have {bookings.filter(b => b.paymentStatus !== 'paid').length} booking(s) waiting for payment.
                                    Complete your payments to confirm your bookings.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBooking;