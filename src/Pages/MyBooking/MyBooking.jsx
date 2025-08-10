import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";
import UseAuth from "../../Hooks/UseAuth";
import Loading from "../../components/Loading/Loading";
import PageTitle from "../../Hooks/PageTitle";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MyBooking = () => {
    const [data, setdata] = useState([])
    const [Bookings, setBookings] = useState()
    const [loading, setloading] = useState(true)
    const { user } = UseAuth()
    const axiosSecure = UseAxiosSecure()


// const {data:booking = [],isloading}= useQuery({
//     queryKey:["booking"],
//     queryFn:async()=>{
//         axiosSecure

//     }
// })


    useEffect(() => {
        axiosSecure(`http://localhost:3000/myBooking/${user?.email}`).then(res => {
            setdata(res.data),
                setloading(false)
        }).catch(error => {

            setloading(false)

        })
    }, [user?.email, axiosSecure])




    const handelstatusChange = (e, application) => {
        const status = { status: e.target.value }


        axios.patch(`http://localhost:3000/bookingsStatus/${application}`, status).then(res => {
            // console.log(res.data)
        }).catch(error => {

        })




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
                    data.length === 0 ? (
                        <p className="text-center text-base-content font-xl">
                            You haven’t booked any packages yet.
                        </p>
                    ) : (
                        <>
                            {/* Desktop Table */}
                            <div className="hidden md:block overflow-x-auto">
                                    <table className="min-w-full  border border-gray-200 shadow-lg rounded-xl overflow-hidden">
                                    <thead className="bg-blue-600 text-left">
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
                                                className="border-b hover:bg-base-content/50  transition"
                                                initial={{ opacity: 0, y: 10 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                            >
                                                <td className="py-3 px-4 font-medium text-base-content">{booking.tourName}</td>
                                                <td className="py-3 px-4">
                                                    <div className="flex flex-col gap-1">
                                                        <span className="font-semibold">{booking.guidname}</span>
                                                        <span className="flex items-center gap-2 text-sm text-base-content">
                                                            <FaPhone className="text-green-600" /> {booking.contactNo}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4 flex items-center gap-2 text-sm text-base-content">
                                                    <FaCalendarAlt className="text-blue-500" /> {booking.bookingDate}
                                                </td>
                                                <td className="py-3 px-4 text-base-contentl">
                                                    <span className="flex items-center gap-2">
                                                        <FaMapMarkerAlt className="text-red-500 " />
                                                        {booking.departureLocation} →
                                                        <FaMapMarkerAlt className="text-green-600" />
                                                        {booking.destination}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4 text-sm text-base-content">{booking.specialNote || "NO add spical info"}</td>
                                                <td className="py-3 px-4 text-center">
                                                    <select
                                                        onChange={(e) => handelstatusChange(e, booking._id)}
                                                        defaultValue={booking.status}
                                                        className="select select-bordered w-full max-w-xs"
                                                    >
                                                        <option disabled>Update status</option>
                                                        <option>Panding</option>
                                                        <option>Conform</option>
                                                    </select>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Cards */}
                            <div className="grid grid-cols-1 gap-6 md:hidden">
                                {data.map((booking, index) => (
                                    <motion.div
                                        key={booking._id}
                                        className=" shadow-md rounded-lg p-4 border border-gray-200"
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                    >
                                        <h3 className="text-lg font-bold text-blue-600">{booking.tourName}</h3>
                                        <div className="mt-2 text-sm text-base-content">
                                            <p className="flex items-center gap-2 font-semibold">
                                                <FaPhone className="text-green-600" /> {booking.guidname} ({booking.contactNo})
                                            </p>
                                            <p className="flex items-center gap-2 mt-1">
                                                <FaCalendarAlt className="text-blue-500" /> {booking.bookingDate}
                                            </p>
                                            <p className="flex items-center gap-2 mt-1">
                                                <FaMapMarkerAlt className="text-red-500" /> {booking.departureLocation} →
                                                <FaMapMarkerAlt className="text-green-600" /> {booking.destination}
                                            </p>
                                            <p className="mt-1 italic">{booking.specialNote || "No special info"}</p>
                                        </div>
                                        <div className="mt-3">
                                            <select
                                                onChange={(e) => handelstatusChange(e, booking._id)}
                                                defaultValue={booking.status}
                                                className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                                            >
                                                <option disabled>Update status</option>
                                                <option>Panding</option>
                                                <option>Conform</option>
                                            </select>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </>
                    )
                }

            </section>
        </>
    );
};

export default MyBooking;
