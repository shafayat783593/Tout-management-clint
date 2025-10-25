import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
    Eye,
    Edit,
    Trash2,
    MapPin,
    Calendar,
    DollarSign,
    TrendingUp,
    Package,
    Search,
    Filter,
    X,
    Save
} from 'lucide-react';
import UseAuth from '../../../Hooks/UseAuth';
import Loading from '../../Loading/Loading';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import PageTitle from '../../../Hooks/PageTitle';

function ManageAllPackages() {
    const [packages, setPackages] = useState([]);
    const [filteredPackages, setFilteredPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [updating, setUpdating] = useState(false);
    const { user } = UseAuth();
    const navigate = useNavigate();
    const axiosSecure = UseAxiosSecure();

    useEffect(() => {
        fetchAllPackages();
    }, []);

    useEffect(() => {
        filterPackages();
    }, [packages, searchTerm, statusFilter]);

    const fetchAllPackages = async () => {
        try {
            console.log('Fetching all packages...');
            const res = await axiosSecure.get('/allPackages');
            console.log('API Response:', res.data);
            setPackages(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching packages:', err);
            setLoading(false);
            Swal.fire({
                title: "Error!",
                text: "Failed to load packages",
                icon: "error",
                background: '#ffffff',
                color: '#1f2937'
            });
        }
    };

    const filterPackages = () => {
        let filtered = packages;

        if (searchTerm) {
            filtered = filtered.filter(pkg =>
                pkg.tourName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                pkg.destination?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                pkg.guidname?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (statusFilter !== 'all') {
            filtered = filtered.filter(pkg => pkg.status === statusFilter);
        }

        setFilteredPackages(filtered);
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This tour package will be permanently deleted.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
            background: '#ffffff',
            color: '#1f2937'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/deletePackage/${id}`);
                    setPackages((prev) => prev.filter((pkg) => pkg._id !== id));
                    Swal.fire({
                        title: "Deleted!",
                        text: "Tour package has been deleted.",
                        icon: "success",
                        background: '#ffffff',
                        color: '#1f2937'
                    });
                } catch (error) {
                    console.error(error);
                    Swal.fire({
                        title: "Error!",
                        text: "Something went wrong.",
                        icon: "error",
                        background: '#ffffff',
                        color: '#1f2937'
                    });
                }
            }
        });
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await axiosSecure.patch(`/updatePackageStatus/${id}`, {
                status: newStatus
            });

            setPackages(prev => prev.map(pkg =>
                pkg._id === id ? { ...pkg, status: newStatus } : pkg
            ));

            Swal.fire({
                title: "Success!",
                text: `Package status updated to ${newStatus}`,
                icon: "success",
                background: '#ffffff',
                color: '#1f2937'
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Error!",
                text: "Failed to update status",
                icon: "error",
                background: '#ffffff',
                color: '#1f2937'
            });
        }
    };

    const handleEditClick = (pkg) => {
        setSelectedPackage({ ...pkg });
        setShowUpdateModal(true);
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);

        try {
            const updatedData = {
                tourName: selectedPackage.tourName,
                photo: selectedPackage.photo,
                duration: selectedPackage.duration,
                departureLocation: selectedPackage.departureLocation,
                destination: selectedPackage.destination,
                price: selectedPackage.price,
                discount: selectedPackage.discount,
                contactNo: selectedPackage.contactNo,
                packageDetails: selectedPackage.packageDetails,
                specialPackage: selectedPackage.specialPackage,
                status: selectedPackage.status,
                date: selectedPackage.date,
                lastUpdated: new Date().toISOString(),
                updatedBy: user?.email
            };

            console.log('🔄 Updating package with ID:', selectedPackage._id);
            console.log('📦 Data being sent:', updatedData);

            const response = await axiosSecure.put(`/updateTourPackages/${selectedPackage._id}`, updatedData);
            console.log('✅ Update response:', response);

            if (response.data.modifiedCount > 0 || response.data.upsertedCount > 0 || response.data.acknowledged) {
                setPackages(prev => prev.map(pkg =>
                    pkg._id === selectedPackage._id ? { ...selectedPackage } : pkg
                ));

                Swal.fire({
                    title: "Success!",
                    text: "Tour package updated successfully",
                    icon: "success",
                    background: '#ffffff',
                    color: '#1f2937'
                });
                setShowUpdateModal(false);
                setSelectedPackage(null);
            } else {
                console.warn('⚠️ No changes detected in response:', response.data);
                Swal.fire({
                    title: "Warning!",
                    text: "No changes were made to the package",
                    icon: "warning",
                    background: '#ffffff',
                    color: '#1f2937'
                });
            }
        } catch (error) {
            console.error('❌ Error updating package:', error);
            console.error('Error details:', error.response?.data);

            try {
                console.log('🔄 Trying alternative endpoint...');
                const altResponse = await axiosSecure.put(`/updateTourPackage/${selectedPackage._id}`, updatedData);
                console.log('✅ Alternative update response:', altResponse);

                if (altResponse.data.modifiedCount > 0 || altResponse.data.upsertedCount > 0 || altResponse.data.acknowledged) {
                    setPackages(prev => prev.map(pkg =>
                        pkg._id === selectedPackage._id ? { ...selectedPackage } : pkg
                    ));

                    Swal.fire({
                        title: "Success!",
                        text: "Tour package updated successfully",
                        icon: "success",
                        background: '#ffffff',
                        color: '#1f2937'
                    });
                    setShowUpdateModal(false);
                    setSelectedPackage(null);
                    return;
                }
            } catch (secondError) {
                console.error('❌ Alternative endpoint also failed:', secondError);
            }

            Swal.fire({
                title: "Error!",
                text: "Failed to update package. Please check console for details.",
                icon: "error",
                background: '#ffffff',
                color: '#1f2937'
            });
        } finally {
            setUpdating(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSelectedPackage(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const getPackageStatus = (pkg) => {
        return pkg.status || 'active';
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <PageTitle title="Manage All Packages" />

            <div className="min-h-screen bg-white p-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Package className="h-8 w-8 text-blue-600" />
                            <h1 className="text-4xl font-bold text-gray-900">Manage All Tour Packages</h1>
                        </div>
                        <p className="text-gray-600 text-lg">
                            Manage and organize all tour packages in the system
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-blue-700 text-sm font-medium">Total Packages</p>
                                    <p className="text-2xl font-bold text-blue-900 mt-1">{packages.length}</p>
                                </div>
                                <Package className="h-8 w-8 text-blue-600" />
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-green-700 text-sm font-medium">Active</p>
                                    <p className="text-2xl font-bold text-green-900 mt-1">
                                        {packages.filter(t => getPackageStatus(t) === 'active').length}
                                    </p>
                                </div>
                                <TrendingUp className="h-8 w-8 text-green-600" />
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-yellow-700 text-sm font-medium">Inactive</p>
                                    <p className="text-2xl font-bold text-yellow-900 mt-1">
                                        {packages.filter(t => getPackageStatus(t) === 'inactive').length}
                                    </p>
                                </div>
                                <Calendar className="h-8 w-8 text-yellow-600" />
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-purple-700 text-sm font-medium">Total Revenue</p>
                                    <p className="text-2xl font-bold text-purple-900 mt-1">
                                        ${packages.reduce((sum, pkg) => sum + (parseFloat(pkg.price) || 0), 0)}
                                    </p>
                                </div>
                                <DollarSign className="h-8 w-8 text-purple-600" />
                            </div>
                        </div>
                    </div>

                    {/* Search and Filter Section */}
                    <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search packages by name, destination, or guide..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div className="flex items-center gap-4">
                                <Filter className="h-5 w-5 text-gray-400" />
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="all">All Status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {filteredPackages.length === 0 ? (
                        <div className="text-center py-12">
                            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                {packages.length === 0 ? 'No Packages Found' : 'No Packages Match Your Search'}
                            </h3>
                            <p className="text-gray-600 mb-6">
                                {packages.length === 0
                                    ? 'There are no tour packages in the system yet.'
                                    : 'Try adjusting your search criteria.'
                                }
                            </p>
                            {packages.length === 0 && (
                                <Link
                                    to="/add-tour"
                                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                                >
                                    <Package className="h-5 w-5" />
                                    Create First Package
                                </Link>
                            )}
                        </div>
                    ) : (
                        <>
                            {/* Desktop Table */}
                            <div className="hidden lg:block bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200 bg-gray-50">
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Tour Package</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Guide</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Details</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredPackages.map((pkg) => (
                                            <tr key={pkg._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-4">
                                                        <img
                                                            src={pkg.photo}
                                                            alt={pkg.tourName}
                                                            className="w-12 h-12 rounded-lg object-cover"
                                                            onError={(e) => {
                                                                e.target.src = 'https://via.placeholder.com/48x48?text=No+Image';
                                                            }}
                                                        />
                                                        <div>
                                                            <h3 className="font-semibold text-gray-900">{pkg.tourName}</h3>
                                                            <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                                                                <MapPin className="h-4 w-4" />
                                                                {pkg.destination}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={pkg.guidPhoto}
                                                            alt={pkg.guidname}
                                                            className="w-8 h-8 rounded-full object-cover"
                                                            onError={(e) => {
                                                                e.target.src = 'https://via.placeholder.com/32x32?text=G';
                                                            }}
                                                        />
                                                        <div>
                                                            <p className="text-gray-900 text-sm font-medium">{pkg.guidname}</p>
                                                            <p className="text-gray-500 text-xs">{pkg.guidEmail}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="space-y-2">
                                                        <p className="text-gray-900 flex items-center gap-2">
                                                            <DollarSign className="h-4 w-4" />
                                                            ${pkg.price}
                                                            {pkg.discount && (
                                                                <span className="text-green-600 text-sm">
                                                                    (-{pkg.discount}%)
                                                                </span>
                                                            )}
                                                        </p>
                                                        <p className="text-gray-600 flex items-center gap-2">
                                                            <Calendar className="h-4 w-4" />
                                                            {pkg.duration}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <select
                                                        value={getPackageStatus(pkg)}
                                                        onChange={(e) => handleStatusUpdate(pkg._id, e.target.value)}
                                                        className={`px-3 py-1 rounded-full text-sm font-medium border-0 focus:ring-2 focus:ring-blue-500 ${getPackageStatus(pkg) === 'active'
                                                            ? 'bg-green-100 text-green-800 border border-green-200'
                                                            : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                                                            }`}
                                                    >
                                                        <option value="active">Active</option>
                                                        <option value="inactive">Inactive</option>
                                                    </select>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => handleEditClick(pkg)}
                                                            className="p-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg transition-colors"
                                                            title="Edit Package"
                                                        >
                                                            <Edit className="h-4 w-4 text-white" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(pkg._id)}
                                                            className="p-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                                                            title="Delete Package"
                                                        >
                                                            <Trash2 className="h-4 w-4 text-white" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Cards */}
                            <div className="grid gap-6 lg:hidden">
                                {filteredPackages.map((pkg) => (
                                    <div
                                        key={pkg._id}
                                        className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex items-start gap-4 mb-4">
                                            <img
                                                src={pkg.photo}
                                                alt={pkg.tourName}
                                                className="w-16 h-16 rounded-lg object-cover"
                                                onError={(e) => {
                                                    e.target.src = 'https://via.placeholder.com/64x64?text=No+Image';
                                                }}
                                            />
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-900 text-lg mb-1">{pkg.tourName}</h3>
                                                <p className="text-gray-600 flex items-center gap-1 mb-2">
                                                    <MapPin className="h-4 w-4" />
                                                    {pkg.destination}
                                                </p>
                                                <div className="flex items-center gap-2">
                                                    <img
                                                        src={pkg.guidPhoto}
                                                        alt={pkg.guidname}
                                                        className="w-6 h-6 rounded-full object-cover"
                                                        onError={(e) => {
                                                            e.target.src = 'https://via.placeholder.com/24x24?text=G';
                                                        }}
                                                    />
                                                    <span className="text-sm text-gray-700">{pkg.guidname}</span>
                                                </div>
                                            </div>
                                            <select
                                                value={getPackageStatus(pkg)}
                                                onChange={(e) => handleStatusUpdate(pkg._id, e.target.value)}
                                                className={`px-3 py-1 rounded-full text-sm font-medium border-0 ${getPackageStatus(pkg) === 'active'
                                                    ? 'bg-green-100 text-green-800 border border-green-200'
                                                    : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                                                    }`}
                                            >
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </select>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div className="flex items-center gap-2 text-gray-900">
                                                <DollarSign className="h-4 w-4" />
                                                <span>${pkg.price}</span>
                                                {pkg.discount && (
                                                    <span className="text-green-600 text-sm">(-{pkg.discount}%)</span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Calendar className="h-4 w-4" />
                                                <span>{pkg.duration}</span>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <div className="flex gap-2">
                                                <Link
                                                    to={`/tour/${pkg._id}`}
                                                    className="p-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
                                                >
                                                    <Eye className="h-4 w-4 text-white" />
                                                </Link>
                                                <button
                                                    onClick={() => handleEditClick(pkg)}
                                                    className="p-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg transition-colors"
                                                >
                                                    <Edit className="h-4 w-4 text-white" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(pkg._id)}
                                                    className="p-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                                                >
                                                    <Trash2 className="h-4 w-4 text-white" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {/* Update Package Modal */}
                    {showUpdateModal && selectedPackage && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                    <h2 className="text-2xl font-bold text-gray-900">Update Tour Package</h2>
                                    <button
                                        onClick={() => setShowUpdateModal(false)}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <X className="h-5 w-5 text-gray-600" />
                                    </button>
                                </div>

                                <form onSubmit={handleUpdateSubmit} className="p-6 space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Tour Name</label>
                                            <input
                                                type="text"
                                                name="tourName"
                                                value={selectedPackage.tourName}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
                                            <input
                                                type="url"
                                                name="photo"
                                                value={selectedPackage.photo}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                                            <input
                                                type="text"
                                                name="duration"
                                                value={selectedPackage.duration}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                                            <input
                                                type="text"
                                                name="destination"
                                                value={selectedPackage.destination}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                                            <input
                                                type="number"
                                                name="price"
                                                value={selectedPackage.price}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                            <select
                                                name="status"
                                                value={selectedPackage.status || 'active'}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Package Details</label>
                                        <textarea
                                            name="packageDetails"
                                            value={selectedPackage.packageDetails}
                                            onChange={handleInputChange}
                                            rows={4}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>

                                    <div className="flex gap-3 pt-4">
                                        <button
                                            type="button"
                                            onClick={() => setShowUpdateModal(false)}
                                            className="flex-1 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={updating}
                                            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                                        >
                                            {updating ? (
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
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default ManageAllPackages;