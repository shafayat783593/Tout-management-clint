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
import PageTitle from "../../Hooks/PageTitle";

function PackageDetails() {
    const { user } = UseAuth();
    const [showModal, setShowModal] = useState(false);
    const [specialNote, setSpecialNote] = useState("");
    const tour = useLoaderData();
    const navigate = useNavigate();
    const [BookingCount, setBookingCount] = useState(tour.bookingCount || 0);
    console.log(tour.guidEmail)
    console.log(user.email)

    const handleBooking = async () => {
        // if (!user) {
        //     Swal.fire("Error", "Please login to book a tour", "error");
        //     return;
        // }

        if (user?.email === tour?.guidEmail) {
            Swal.fire("Oh ! It's Your Post");
            return navigate("/all-packages")
        }

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
            status: "pending"
        };


        try {
            const bookingResponse = await axios.post("https://tour-management-server-ashen.vercel.app/bookTourPackage", booking);

            if (bookingResponse.data.insertedId) {

                const countResponse = await axios.patch(`https://tour-management-server-ashen.vercel.app/bookingCount/${tour._id}`);

                if (countResponse.data.modifiedCount > 0) {
                    setBookingCount(prev => prev + 1);
                    Swal.fire("Success", "Booking submitted successfully!", "success");
                    setShowModal(false);
                    navigate("/myBooking");
                }
            }
        } catch (error) {
            console.error("Booking error:", error);
            Swal.fire("Error", "Failed to process booking", "error");
        }
    };

    if (!tour) return <Loading />;

    return (
        <>
            <PageTitle title="Package Details" />

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

                <div className="space-y-2 mb-6">
                    <p className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-blue-600" /> Departure: {tour.departureLocation}
                    </p>
                    <p className="flex items-center gap-2">
                        <FaCalendarAlt className="text-blue-600" /> Date: {tour.date}
                    </p>
                    <p className="flex items-center gap-2">
                        <FaClock className="text-blue-600" /> Duration: {tour.duration}
                    </p>
                    <p className="flex items-center gap-2">
                        <FaMoneyBillWave className="text-blue-600" /> Price: ${tour.price}
                    </p>
                    <p className="flex items-center gap-2">
                        <FaFlagCheckered className="text-blue-600" /> Destination: {tour.destination || "N/A"}
                    </p>
                    <p className="flex items-center gap-2">
                        <FaReceipt className="text-blue-600" /> Bookings: {BookingCount}
                    </p>
                </div>

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
                            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
                        >
                            <h2 className="text-xl text-info font-semibold mb-4">Book This Tour</h2>
                            <div className="space-y-2 mb-4">
                                <p className="text-neutral"><strong>Package:</strong> {tour.tourName}</p>
                                <p className="text-neutral"><strong>Price:</strong> ${tour.price}</p>
                                <p className="text-neutral"><strong>Name:</strong> {user?.displayName}</p>
                                <p className="text-neutral"><strong>Email:</strong> {user?.email}</p>
                                <p className="text-neutral"><strong>Date:</strong> {format(new Date(), 'yyyy-MM-dd')}</p>
                            </div>

                            <textarea
                                placeholder="Special Note (optional)"
                                className="w-full border mt-4 p-2 rounded-md text-neutral"
                                value={specialNote}
                                onChange={(e) => setSpecialNote(e.target.value)}
                            ></textarea>

                            <div className="flex justify-end mt-4 gap-2">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleBooking}
                                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                                >
                                    Confirm Booking
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </>
    );
}

export default PackageDetails;