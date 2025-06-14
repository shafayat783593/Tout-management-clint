import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import UseAuth from "../../Hooks/UseAuth";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router";
import axios from "axios";
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaMoneyBillWave, FaFlagCheckered, FaReceipt } from 'react-icons/fa';
import Loading from "../../components/Loading/Loading";

function PackageDetails() {
    // const { id } = useParams();
    const { user } = UseAuth();
    // const [tour, setTour] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [specialNote, setSpecialNote] = useState("");
    console.log(showModal)
    const tour = useLoaderData()
    const navigate = useNavigate()
    const handleBooking = async () => {
      
        const booking = {
            tourId: tour._id,
            tourName: tour.tourName,
            price: tour.price,
            guidname: tour.guidname,
            guidemail: tour?.email,
            buyerName: user.displayName,
            buyerEmail: user.email,
            contactNo: tour?.contactNo,
            departureLocation: tour?.departureLocation,
            destination: tour?.destination,
            bookingDate: tour?.date,
            specialNote,
            status: "pending",

        };




        axios.post("http://localhost:3000/bookTourPackage", booking).then(function (response) {
            console.log(response.data);
            if (response.data.insertedId) {
                Swal.fire("Success", "Booking submitted!", "success");
                setShowModal(false);
            }
            navigate("/myBooking")

        })
            .catch(function (error) {
                console.log(error);
            });
    };




    if (!tour) return <Loading/>

    return (
        <div className="max-w-5xl mx-auto p-4 py-10">
            <img
                src={tour.photo}
                alt={tour.tourName}
                className="w-full h-96 object-cover rounded-xl mb-6"
            />
            <h1 className="text-4xl font-bold mb-4">{tour.tourName}</h1>

            <div className="flex items-center gap-4 mb-4">
                <img
                    src={tour.guidPhoto}
                    alt={tour.guidname}
                    className="w-12 h-12 rounded-full"
                />
                <div>
                    <p className="font-semibold">Guide: {tour.guidname}</p>
                    <p className="text-sm text-gray-600">Contact: {tour.contactNo}</p>
                </div>
            </div>

            <p className="mb-2 flex items-center gap-2">
                <FaMapMarkerAlt className="text-blue-600" /> Departure: {tour.departureLocation}
            </p>
            <p className="mb-2 flex items-center gap-2">
                <FaCalendarAlt className="text-blue-600" /> Date: {tour.date}
            </p>
            <p className="mb-2 flex items-center gap-2">
                <FaClock className="text-blue-600" /> Duration: {tour.duration}
            </p>
            <p className="mb-2 flex items-center gap-2">
                <FaMoneyBillWave className="text-blue-600" /> Price: ${tour.price}
            </p>
            <p className="mb-2 flex items-center gap-2">
                <FaFlagCheckered className="text-blue-600" /> Destination: {tour.destination || "N/A"}
            </p>
            <p className="mb-6 flex items-center gap-2">
                <FaReceipt className="text-blue-600" /> Bookings: {tour.bookingCount || 0}
            </p>
            <p className="mb-6 text-gray-700">{tour.packageDetails}</p>






            <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg cursor-pointer"
                onClick={() => setShowModal(true)}
            >
                Book Now
            </button>

            {showModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-60 flex items-center justify-center z-50">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}

                        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Book This Tour</h2>
                        <p><strong>Package:</strong> {tour.tourName}</p>
                        <p><strong>Price:</strong> ${tour.price}</p>
                        <p><strong>Name:</strong> {user.displayName}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Date:</strong> {format(new Date(), 'yyyy-MM-dd')}</p>
                        <textarea
                            placeholder="Special Note (optional)"
                            className="w-full border mt-4 p-2 rounded-md"
                            value={specialNote}
                            onChange={(e) => setSpecialNote(e.target.value)}
                        ></textarea>

                        <div className="flex justify-end mt-4 gap-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 rounded bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleBooking}
                                className="px-4 py-2 rounded bg-blue-600 text-white cursor-pointer"
                            >
                                Book Now
                            </button>
                        </div>

                    </motion.div>
                </div>
            )}








        </div>
    );
}

export default PackageDetails
















//     <motion.div motion.div
// initial = {{ scale: 0.8, opacity: 0 }}
// animate = {{ scale: 1, opacity: 1 }}
// className = "bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
//     >
// <h2 className="text-xl font-semibold mb-4">Book This Tour</h2>
// <p><strong>Package:</strong> {tour.tourName}</p>
// <p><strong>Price:</strong> ${tour.price}</p>
// <p><strong>Name:</strong> {user.displayName}</p>
// <p><strong>Email:</strong> {user.email}</p>
// <p><strong>Date:</strong> {format(new Date(), 'yyyy-MM-dd')}</p>




// </motion.div >