import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Loading from "../Loading/Loading";
import { useNavigate } from "react-router";
import UseAuth from "../../Hooks/UseAuth";

export default function AutoCarousel() {
    const [current, setCurrent] = useState(0);
    const [data, setData] = useState([]);
    const navigate = useNavigate()
    const { user } = UseAuth()

    useEffect(() => {
        axios("https://tour-management-server-ashen.vercel.app/appTourPackages")
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

    // const prev = () => setCurrent((prev) => (prev - 1 + data.length) % data.length);
    // const next = () => setCurrent((prev) => (prev + 1) % data.length);

    if (!data.length) {
        return Loading;
    }

    return (
        <>
            <div className="relative w-full max-w-5xl mx-auto rounded-lg overflow-hidden">
                <div className="text-3xl font-bold my-4 text-blue-600">Best Hotels for Your Next Trip</div>
                <div className="mb-6 text-gray-500">
                    Luxurious or budget-friendly hotels, villas or resorts — browse accommodations at ShareTrip that meet your needs. Book long-term or short-term accommodation from our hotel deals.
                </div>

                <div className="relative h-[450px] w-full overflow-hidden rounded-xl"


                    onClick={() => {
                        
                        user ? navigate(`/PackageDetails/${data[current]._id}`) : navigate("/login");
                    }}
                >
                    <motion.div
                        key={data[current]._id}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.6 }}
                        className="w-full h-full"
                    >
                        <img
                            src={data[current].photo}
                            alt={data[current].tourName}
                            className="w-full h-full object-cover rounded-xl"
                        />
                        <div className="absolute bottom-0 bg-black bg-opacity-50 text-white p-4 w-full">
                            <h2 className="text-2xl font-semibold">{data[current].tourName}</h2>
                            <p className="text-sm">📍 {data[current].destination}</p>
                            <p className="text-sm">💰 ${data[current].price}</p>
                        </div>
                    </motion.div>


                </div>
                {/* Navigation Buttons */}
                {/* <div className="absolute inset-0 flex items-center justify-between px-5 z-10">
                    <button
                        onClick={prev}
                        className="btn btn-circle bg-white bg-opacity-80 hover:bg-opacity-100"
                    >
                        ❮
                    </button>
                    <button
                        onClick={next}
                        className="btn btn-circle bg-white bg-opacity-80 hover:bg-opacity-100"
                    >
                        ❯
                    </button>
                </div> */}

                {/* Indicator Dots */}
                <div className="flex justify-center gap-2 mt-4">
                    {data.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`h-3 w-3 rounded-full ${i === current ? "bg-blue-500" : "bg-gray-300"
                                }`}
                        ></button>
                    ))}
                </div>
            </div>
        </>
    );
}
