import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Save,
    MapPin,
    Calendar,
    DollarSign,
    Star,
    Image
} from 'lucide-react';

import axios from 'axios';
import Swal from 'sweetalert2';
import UseAuth from '../../../Hooks/UseAuth';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import Loading from '../../Loading/Loading';

const UpdateTourPackage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = UseAuth();
    const axiosSecure = UseAxiosSecure();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        tourName: '',
        photo: '',
        duration: '',
        departureLocation: '',
        destination: '',
        price: '',
        discount: '',
        contactNo: '',
        packageDetails: '',
        specialPackage: false,
        status: 'active',
        date: ''
    });

    useEffect(() => {
        fetchPackageData();
    }, [id]);

    const fetchPackageData = async () => {
        try {
            console.log('Fetching package with ID:', id);
            const response = await axiosSecure.get(`/updateMyPosted/${id}`);
            const packageData = response.data;
            console.log('Package data:', packageData);

            setFormData({
                tourName: packageData.tourName || '',
                photo: packageData.photo || '',
                duration: packageData.duration || '',
                departureLocation: packageData.departureLocation || '',
                destination: packageData.destination || '',
                price: packageData.price || '',
                discount: packageData.discount || '',
                contactNo: packageData.contactNo || '',
                packageDetails: packageData.packageDetails || '',
                specialPackage: packageData.specialPackage === true || packageData.specialPackage === 'yes' || false,
                status: packageData.status || 'active',
                date: packageData.date || ''
            });
            setLoading(false);
        } catch (error) {
            console.error('Error fetching package:', error);
            Swal.fire({
                title: "Error!",
                text: "Failed to load package data",
                icon: "error",
                background: '#1f2937',
                color: 'white'
            });
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            // Prepare the data for update
            const updatedData = {
                ...formData,
                // Convert specialPackage to proper format for backend
                specialPackage: formData.specialPackage ? "yes" : "no",
                lastUpdated: new Date().toISOString(),
                updatedBy: user?.email
            };

            console.log('Updating package with data:', updatedData);

            // Try the main update endpoint first
            const response = await axiosSecure.put(`/updateTourPackages/${id}`, updatedData);
            console.log('Update response:', response);

            if (response.data.modifiedCount > 0 || response.data.upsertedCount > 0) {
                Swal.fire({
                    title: "Success!",
                    text: "Tour package updated successfully",
                    icon: "success",
                    background: '#1f2937',
                    color: 'white'
                });
                navigate('/manage-all-packages'); // Adjust this route as needed
            } else {
                throw new Error('No changes were made');
            }
        } catch (error) {
            console.error('Error updating package:', error);

            // If main endpoint fails, try alternative endpoint
            try {
                console.log('Trying alternative update endpoint...');
                const alternativeResponse = await axiosSecure.put(`/updateTourPackage/${id}`, {
                    ...formData,
                    specialPackage: formData.specialPackage ? "yes" : "no",
                    lastUpdated: new Date().toISOString(),
                    updatedBy: user?.email
                });

                console.log('Alternative update response:', alternativeResponse);

                Swal.fire({
                    title: "Success!",
                    text: "Tour package updated successfully",
                    icon: "success",
                    background: '#1f2937',
                    color: 'white'
                });
                navigate('/manage-all-packages');
            } catch (secondError) {
                console.error('Alternative update also failed:', secondError);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to update package. Please try again.",
                    icon: "error",
                    background: '#1f2937',
                    color: 'white'
                });
            }
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-4 mb-8"
                >
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5 text-white" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-white">Update Tour Package</h1>
                        <p className="text-gray-300">Update your tour package information</p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Tour Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Tour Name *
                                </label>
                                <input
                                    type="text"
                                    name="tourName"
                                    value={formData.tourName}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            {/* Tour Photo */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Tour Photo URL *
                                </label>
                                <input
                                    type="url"
                                    name="photo"
                                    value={formData.photo}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            {/* Duration */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Duration *
                                </label>
                                <input
                                    type="text"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleInputChange}
                                    placeholder="e.g., 3 Days 2 Nights"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            {/* Departure Location */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Departure Location *
                                </label>
                                <input
                                    type="text"
                                    name="departureLocation"
                                    value={formData.departureLocation}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            {/* Destination */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Destination *
                                </label>
                                <input
                                    type="text"
                                    name="destination"
                                    value={formData.destination}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Price ($) *
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                    min="0"
                                />
                            </div>

                            {/* Departure Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Departure Date
                                </label>
                                <input
                                    type="text"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    placeholder="MM/DD/YYYY"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Contact Number */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Contact Number *
                                </label>
                                <input
                                    type="tel"
                                    name="contactNo"
                                    value={formData.contactNo}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            {/* Special Package */}
                            <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg">
                                <input
                                    type="checkbox"
                                    id="specialPackage"
                                    name="specialPackage"
                                    checked={formData.specialPackage}
                                    onChange={handleInputChange}
                                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                                />
                                <label htmlFor="specialPackage" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                    <Star className="h-4 w-4 text-yellow-400" />
                                    Special Package
                                </label>
                            </div>

                            {/* Discount */}
                            {formData.specialPackage && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Discount (%)
                                    </label>
                                    <input
                                        type="number"
                                        name="discount"
                                        value={formData.discount}
                                        onChange={handleInputChange}
                                        min="0"
                                        max="100"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            )}

                            {/* Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Status
                                </label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                        </div>

                        {/* Package Details */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Package Details *
                            </label>
                            <textarea
                                name="packageDetails"
                                value={formData.packageDetails}
                                onChange={handleInputChange}
                                rows={6}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        {/* Read-only Guide Info */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white/5 rounded-lg">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Guide Name
                                </label>
                                <input
                                    type="text"
                                    value={user?.displayName || ''}
                                    readOnly
                                    className="w-full px-4 py-2 bg-white/10 border border-white/10 rounded-lg text-gray-400"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Guide Email
                                </label>
                                <input
                                    type="email"
                                    value={user?.email || ''}
                                    readOnly
                                    className="w-full px-4 py-2 bg-white/10 border border-white/10 rounded-lg text-gray-400"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Guide Photo
                                </label>
                                <input
                                    type="text"
                                    value={user?.photoURL || ''}
                                    readOnly
                                    className="w-full px-4 py-2 bg-white/10 border border-white/10 rounded-lg text-gray-400 truncate"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex gap-4 pt-6">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors flex items-center gap-2"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                {submitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <Save className="h-4 w-4" />
                                        Update Package
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default UpdateTourPackage;