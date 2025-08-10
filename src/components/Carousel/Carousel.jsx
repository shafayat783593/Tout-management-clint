import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Loading from "../Loading/Loading";
import { useNavigate } from "react-router";
import UseAuth from "../../Hooks/UseAuth";

export default function AutoCarousel() {
    const [current, setCurrent] = useState(0);
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const { user } = UseAuth();

    useEffect(() => {
        axios("http://localhost:3000/appTourPackages")
            .then((res) => {
                setData(res.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % data.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [data.length]);

    if (!data.length) {
        return <Loading />;
    }

    return (
        <div className="relative w-full max-w-6xl mx-auto rounded-lg overflow-hidden">
            {/* Heading */}
            <div className="text-3xl font-bold my-4 text-blue-600 text-center">
                Best Hotels for Your Next Trip
            </div>
            <p className="mb-6 text-gray-500 text-center max-w-3xl mx-auto">
                Luxurious or budget-friendly hotels, villas or resorts — browse accommodations at ShareTrip that meet your needs.
                Book long-term or short-term accommodation from our hotel deals.
            </p>

            {/* Carousel */}
            <div
                className="relative h-[480px] w-full overflow-hidden rounded-2xl shadow-2xl cursor-pointer"
                onClick={() => {
                    user
                        ? navigate(`/PackageDetails/${data[current]._id}`)
                        : navigate("/auth/login");
                }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={data[current]._id}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="relative w-full h-full"
                    >
                        {/* Image */}
                        <img
                            src={data[current].photo}
                            alt={data[current].tourName}
                            className="w-full h-full object-cover rounded-2xl"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-2xl" />

                        {/* Text Content */}
                        <div className="absolute bottom-6 left-6 text-white drop-shadow-lg">
                            <motion.h2
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                                className="text-3xl font-bold"
                            >
                                {data[current].tourName}
                            </motion.h2>
                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="text-sm text-gray-200"
                            >
                                📍 {data[current].destination}
                            </motion.p>
                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                                className="text-lg font-semibold mt-1"
                            >
                                💰 ${data[current].price}
                            </motion.p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Indicator Dots */}
            <div className="flex justify-center gap-3 mt-5">
                {data.map((_, i) => (
                    <motion.button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`h-3 w-3 rounded-full transition-all duration-300 ${i === current
                            ? "bg-blue-500 scale-125 shadow-lg shadow-blue-400/50"
                            : "bg-gray-300 hover:bg-gray-400"
                            }`}
                        whileHover={{ scale: 1.2 }}
                    ></motion.button>
                ))}
            </div>
        </div>
    );
}
