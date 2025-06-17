import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";
import UseAuth from "../../Hooks/UseAuth";
import Loading from "../../components/Loading/Loading";
import PageTitle from "../../Hooks/PageTitle";

const MyBooking = () => {
    const [data, setdata] = useState([])
    const [Bookings, setBookings] = useState()
    const [loading, setloading] = useState(true)
    const { user } = UseAuth()

    useEffect(() => {
        axios(`http://localhost:3000/myBooking/${user?.email}`).then(res => {
            setdata(res.data),
                setloading(false)
        }).catch(error => {
            console.log(error)
            setloading(false)

        })
    }, [user?.email])
    console.log(data)



    const handelstatusChange = (e, application) => {
        const status = { status: e.target.value }
        console.log(status)

        axios.patch(`http://localhost:3000/bookingsStatus/${application}`, status).then(res => {
            console.log(res)
        }).catch(error => {
            console.log(error)
        })
        console.log(e.target.value, application)



    }



    if (loading) {
        return <Loading />
    }



    return (
        <>
            <PageTitle title="My Booking" /> 

        <section className="py-16 px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Booking Requests</h2>

            {
                data.length === 0 ? <p className="text-center text-gray-600 font-xl"> You haven’t book any packages yet.</p> :


                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-neutral-content border border-gray-200 shadow-lg rounded-xl overflow-hidden">
                            <thead className="bg-blue-600 text-white text-left">
                                <tr>
                                    <th className="py-3 px-4">Tour Name</th>
                                    <th className="py-3 px-4">Guide + Contact</th>
                                    <th className="py-3 px-4">Departure Date</th>
                                    <th className="py-3 px-4">From → To</th>
                                    <th className="py-3 px-4">Special Note</th>
                                    <th className="py-3 px-4 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((booking, index) => (
                                    <motion.tr
                                        key={booking._id}
                                        className="border-b hover:bg-gray-100 transition"
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                    >
                                        <td className="py-3 px-4 font-medium text-neutral">{booking.tourName}</td>

                                        <td className="py-3 px-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="font-semibold">{booking.guidname}</span>
                                                <span className="flex items-center gap-2 text-sm text-gray-600">
                                                    <FaPhone className="text-green-600" /> {booking.contactNo}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="py-3 px-4 flex items-center gap-2 text-sm text-gray-700">
                                            <FaCalendarAlt className="text-blue-500" /> {booking.bookingDate}
                                        </td>

                                        <td className="py-3 px-4 text-neutral">
                                            <span className="flex items-center gap-2">
                                                <FaMapMarkerAlt className="text-red-500 " />
                                                {booking.departureLocation} →
                                                <FaMapMarkerAlt className="text-green-600" />
                                                {booking.destination}
                                            </span>
                                        </td>

                                        <td className="py-3 px-4 text-sm text-gray-700">{booking.specialNote || "NO add spical info"}</td>

                                        <td className="py-3 px-4 text-center">
                                            {/* {booking.status === "conform" ? (
                                                <span className="text-green-600 font-semibold flex items-center justify-center gap-1">
                                                    <FaCheckCircle /> conform
                                                </span>
                                            ) : (
                                                <button
                                                    onClick={() => onConfirm(booking._id, "panding")}
                                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition"
                                                >
                                                    panding
                                                </button>
                                            )} */}

                                            <select onChange={(e) => handelstatusChange(e, booking._id)}
                                                defaultValue={booking.status} className="select">
                                                <option disabled={true}>Update status</option>
                                                <option>Panding</option>
                                                <option>Conform</option>

                                            </select>




                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
            }
        </section>
        </>
    );
};

export default MyBooking;
