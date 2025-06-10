import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiUpload, FiUser, FiCalendar, FiMapPin, FiDollarSign, FiPhone, FiInfo } from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import UseAuth from '../../Hooks/UseAuth';
import { MdAddPhotoAlternate, MdEmail } from 'react-icons/md';
import axios from 'axios';

const TourForm = () => {
    const formRef = useRef(null);
    const [departureDate, setDepartureDate] = useState(new Date());
    const [imagePreview, setImagePreview] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const { user } = UseAuth()
    console.log(user.email)

    //   const handleImageChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //       const reader = new FileReader();
    //       reader.onloadend = () => {
    //         setImagePreview(reader.result);
    //       };
    //       reader.readAsDataURL(file);
    //     }
    //   };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);

        const form = e.target

        const formData = new FormData(form)
        const newtravels = Object.fromEntries(formData.entries())
        newtravels.guidname = user?.displayName
        newtravels.guidEmail = user?.email
        newtravels.guidPhoto = user?.photoURL






        axios.post("http://localhost:3000/addTourPackages",newtravels).then(function (response) {
            console.log(response.data);
        })
            .catch(function (error) {
                console.log(error);
          });

        console.log('Form Data:', newtravels);

        // Here you would typically send the data to your API
        // Example: fetch('/api/tours', { method: 'POST', body: formData });

        setTimeout(() => {
            setSubmitting(false);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
            });

        }, 1500);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <motion.div
            className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <h2 className="text-3xl font-bold text-center mb-8 text-indigo-700">Create New Tour Package</h2>

            <form ref={formRef} onSubmit={handleSubmit}>
                <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={containerVariants}>
                    {/* Tour Name */}
                    <motion.div variants={itemVariants}>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                            <FiInfo className="mr-2" /> Tour Name
                        </label>
                        <input
                            type="text"
                            name="tourName"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </motion.div>

                    {/* Image Upload */}
                    <motion.div variants={itemVariants}>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                            
                            <MdAddPhotoAlternate className="mr-2" />  Tour Photo
                        </label>
                        <input
                            
                          
                            type="url"
                            name="photo"

                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </motion.div>

                    {/* Duration */}
                    <motion.div variants={itemVariants}>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                            <FiCalendar className="mr-2" /> Duration
                        </label>
                        <input
                            type="text"
                            name="duration"
                            placeholder="e.g., 3 Days 2 Nights"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </motion.div>

                    {/* Departure Location */}
                    <motion.div variants={itemVariants}>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                            <FiMapPin className="mr-2" /> Departure Location
                        </label>
                        <input
                            type="text"
                            name="departureLocation"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </motion.div>

                    {/* Destination */}
                    <motion.div variants={itemVariants}>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                            <FiMapPin className="mr-2" /> Destination
                        </label>
                        <input
                            type="text"
                            name="destination"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </motion.div>

                    {/* Price */}
                    <motion.div variants={itemVariants}>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                            <FiDollarSign className="mr-2" /> Price
                        </label>
                        <input
                            type="number"
                            name="price"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </motion.div>

                    {/* Departure Date */}
                    <motion.div variants={itemVariants}>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                            <FiCalendar className="mr-2" /> Departure Date
                        </label>
                        <DatePicker
                            selected={departureDate}
                            onChange={(date) => setDepartureDate(date)}
                            minDate={new Date()}
                            name='date'
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </motion.div>

                    {/* Guide Name */}


                    {/* Package Details */}
                    <motion.div className="md:col-span-2" variants={itemVariants}>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                            <FiInfo className="mr-2" /> Package Details
                        </label>
                        <textarea
                            name="packageDetails"
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </motion.div>

                    {/* Contact No */}
                    <motion.div variants={itemVariants}>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                            <FiPhone className="mr-2" /> Contact Number
                        </label>
                        <input
                            type="tel"
                            name="contactNo"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </motion.div>

                    {/* Guide name (simulated file input) */}
                    <motion.div variants={itemVariants}>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                            <FiUser className="mr-2" /> Guide Name
                        </label>
                        <input
                            defaultValue={user?.displayName}
                            readOnly
                            type="text"
                            // name="guidName"

                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                            <MdAddPhotoAlternate className="mr-2" />  Guide Photo
                        </label>
                        <input
                            defaultValue={user?.photoURL}
                            readOnly
                            type="url"
                            // name="guidePhoto"

                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </motion.div>

                    {/* Guide Email */}
                    <motion.div variants={itemVariants}>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                            <MdEmail className="mr-2" /> Guide Email
                        </label>
                        <input
                            defaultValue={user?.email}
                            readOnly
                            type="email"
                            // name="guideEmail"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div
                        className="md:col-span-2 flex justify-center mt-4"
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <button
                            type="submit"
                            disabled={submitting}
                            className={`px-8 py-3 rounded-lg font-medium transition-colors shadow-md flex items-center ${submitting
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                                }`}
                        >
                            {submitting ? (
                                <div className='flex justify-center items-center'>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Submitting...
                                </div>
                            ) : <div className='flex justify-center items-center'> Create Tour Package</div>}
                        </button>
                    </motion.div>
                </motion.div>
            </form>
        </motion.div>
    );
};

export default TourForm;