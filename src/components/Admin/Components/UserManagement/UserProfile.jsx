import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UseAuth from '../../../../Hooks/UseAuth';
import UseAxiosSecure from '../../../../Hooks/UseAxiosSecure';

const UserUpdateComponent = () => {
    const { user: authUser, logOut } = UseAuth(); // Get user from your auth hook
    const [user, setUser] = useState({
        name: '',
        photo: '',
        role: 'user'
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('profile');
const axiosSecure = UseAxiosSecure()
    // Get user email from auth hook
    const userEmail = authUser?.email;

    // Fetch user data
    useEffect(() => {
        const fetchUser = async () => {
            if (!userEmail) {
                setError('User not authenticated');
                return;
            }

            try {
                setLoading(true);
                setError('');
                const response = await axiosSecure.get(`/api/users/${userEmail}`);
                setUser(response.data.user);
            } catch (err) {
                console.error('Fetch error:', err);
                if (err.response?.status === 404) {
                    setError('User profile not found. Please complete your registration.');
                } else {
                    setError('Failed to fetch user data. Please try again.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userEmail]); // Refetch when userEmail changes

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userEmail) {
            setError('User not authenticated');
            return;
        }

        setLoading(true);
        setMessage('');
        setError('');

        try {
            const response = await axiosSecure.put(`/api/users/${userEmail}`, {
                name: user.name,
                photo: user.photo,
                role: user.role
            });
            setMessage('Profile updated successfully!');
            setUser(response.data.user);

            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            console.error('Update error:', err);
            if (err.response?.status === 404) {
                setError('User not found. Please check your email address.');
            } else {
                setError(err.response?.data?.message || 'Failed to update profile. Please try again.');
            }
            setTimeout(() => setError(''), 5000);
        } finally {
            setLoading(false);
        }
    };

    const handlePartialUpdate = async (field, value) => {
        if (!userEmail) {
            setError('User not authenticated');
            return;
        }

        setLoading(true);
        setMessage('');
        setError('');

        try {
            const response = await axiosSecure.patch(`/api/users/${userEmail}`, {
                [field]: value
            });
            setUser(response.data.user);
            setMessage(`${field.charAt(0) + field.slice(1)} updated successfully!`);

            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            console.error('Partial update error:', err);
            setError(err.response?.data?.message || `Failed to update ${field}`);
            setTimeout(() => setError(''), 5000);
        } finally {
            setLoading(false);
        }
    };

    const getRoleColor = (role) => {
        switch (role) {
            case 'admin': return 'bg-red-100 text-red-800 border-red-200';
            case 'guide': return 'bg-blue-100 text-blue-800 border-blue-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    // SVG Icons as React components
    const UserIcon = () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
    );

    const CameraIcon = () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    );

    const ShieldIcon = () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
    );

    const CheckIcon = () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );

    const ErrorIcon = () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );

    const EditIcon = () => (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
    );

    const PhotoIcon = () => (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
    );

    const LogoutIcon = () => (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
    );

    if (loading && !user.name) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading user data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">User Profile</h1>
                    <p className="text-gray-600">Manage and update your profile information</p>
                </div>

                {!userEmail && (
                    <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <ErrorIcon />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Authentication Required</h3>
                        <p className="text-gray-600 mb-4">Please log in to view and edit your profile.</p>
                        <button
                            onClick={() => window.location.href = '/auth/login'}
                            className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
                        >
                            Go to Login
                        </button>
                    </div>
                )}

                {userEmail && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Sidebar - User Info */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-8">
                                {/* User Avatar */}
                                <div className="text-center mb-6">
                                    <div className="relative inline-block">
                                        {user?.photo ? (
                                            <img
                                                src={user?.photo}
                                                alt={user?.name}
                                                className="w-24 h-24 rounded-full object-cover border-4 border-indigo-100 shadow-lg"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                }}
                                            />
                                        ) : (
                                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center border-4 border-indigo-100 shadow-lg">
                                                <UserIcon />
                                            </div>
                                        )}
                                        <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1 border-2 border-white">
                                            <CheckIcon />
                                        </div>
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-900 mt-4">{user?.name || 'No Name'}</h2>
                                    <p className="text-gray-600 text-sm">{userEmail}</p>
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border mt-2 ${getRoleColor(user?.role)}`}>
                                        {user?.role}
                                    </span>
                                </div>

                                {/* Stats */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <span className="text-gray-600">Status</span>
                                        <span className="text-sm font-medium text-green-600">Active</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <span className="text-gray-600">Profile</span>
                                        <span className="text-sm font-medium text-gray-900">
                                            {user?.name ? 'Complete' : 'Incomplete'}
                                        </span>
                                    </div>
                                </div>

                                {/* Logout Button */}
                                <button
                                    onClick={logOut}
                                    className="w-full mt-6 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center"
                                >
                                    <LogoutIcon />
                                    <span className="ml-2">Logout</span>
                                </button>
                            </div>
                        </div>

                        {/* Main Content - Update Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                                {/* Tabs */}
                                <div className="border-b border-gray-200">
                                    <nav className="flex -mb-px">
                                        <button
                                            onClick={() => setActiveTab('profile')}
                                            className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'profile'
                                                    ? 'border-indigo-500 text-indigo-600'
                                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                                }`}
                                        >
                                            <UserIcon />
                                            <span className="ml-2">Profile Settings</span>
                                        </button>
                                    </nav>
                                </div>

                                {/* Form Content */}
                                <div className="p-8">
                                    {/* Messages */}
                                    {message && (
                                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center">
                                            <CheckIcon />
                                            <span className="ml-2 text-green-800">{message}</span>
                                        </div>
                                    )}

                                    {error && (
                                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center">
                                            <ErrorIcon />
                                            <span className="ml-2 text-red-800">{error}</span>
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {/* Name Field */}
                                        <div className="space-y-2">
                                            <label className="flex items-center text-sm font-medium text-gray-700">
                                                <UserIcon />
                                                <span className="ml-2">Full Name</span>
                                            </label>
                                            <div className="flex gap-3">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={user?.name}
                                                    onChange={handleChange}
                                                    required
                                                    minLength="2"
                                                    className="flex-1 text-gray-900 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                                    placeholder="Enter your full name"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handlePartialUpdate('name', user?.name)}
                                                    disabled={loading || user?.name.length < 2}
                                                    className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                                                >
                                                    <EditIcon />
                                                    <span className="ml-2">Update</span>
                                                </button>
                                            </div>
                                            <p className="text-xs text-gray-500">Minimum 2 characters required</p>
                                        </div>

                                        {/* Email Field (Read-only) */}
                                        <div className="space-y-2">
                                            <label className="flex items-center text-sm font-medium text-gray-700">
                                                <UserIcon />
                                                <span className="ml-2">Email Address</span>
                                            </label>
                                            <input
                                                type="email"
                                                value={userEmail}
                                                readOnly
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-600"
                                            />
                                            <p className="text-xs text-gray-500">Email cannot be changed</p>
                                        </div>

                                        {/* Photo Field */}
                                        <div className="space-y-2">
                                            <label className="flex items-center text-sm font-medium text-gray-700">
                                                <CameraIcon />
                                                <span className="ml-2">Profile Photo URL</span>
                                            </label>
                                            <div className="flex gap-3">
                                                <input
                                                    type="url"
                                                    name="photo"
                                                    value={user?.photo}
                                                    onChange={handleChange}
                                                    className="flex-1 text-gray-900 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                                    placeholder="https://example.com/photo.jpg"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handlePartialUpdate('photo', user?.photo)}
                                                    disabled={loading}
                                                    className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                                                >
                                                    <PhotoIcon />
                                                    <span className="ml-2">Update</span>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Submit Button */}
                                        <div className="pt-6 border-t border-gray-200">
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                                            >
                                                {loading ? (
                                                    <div className="flex items-center justify-center">
                                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                        Updating Profile...
                                                    </div>
                                                ) : (
                                                    'Save All Changes'
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserUpdateComponent;