import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLoaderData, useNavigate } from "react-router";
import UseAuth from "../../Hooks/UseAuth";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import PageTitle from "../../Hooks/PageTitle";

function AllPackages() {
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setloading] = useState(true)
    const [TourData, setTourData] = useState([])
    const { user } = UseAuth();
    const navigate = useNavigate();

    useEffect(() => {

        axios("https://tour-management-server-ashen.vercel.app/appTourPackages").then(res => {
            setTourData(res.data)
            setloading(false)
        }).catch(error => {
            console.error(error);
            setloading(false); // 
        })
    }, [])


    const filteredTours = TourData.filter((tour) =>
        tour?.tourName?.toLowerCase().includes(searchTerm.toLowerCase()) || tour?.destination?.toLowerCase().includes(searchTerm.toLowerCase())
    );




    useEffect(() => {

        axios.get(`https://tour-management-server-ashen.vercel.app/search?q=${encodeURIComponent(searchTerm)}`)
            .then(res => {
                setTourData(res.data);
            })
            .catch(error => {
                console.error("Search error:", error);
            });

    }, [searchTerm]);




    if (loading) {
        return (
            <Loading />

        )
    }

    return (
        <>
            <PageTitle title="AllPackages" />


            <div className="px-4 py-12 max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-center">All Tour Packages</h2>

                {/* Search */}
                <div className="mb-10 text-center">
                    <input
                        type="text"
                        placeholder="Search by tour name..."
                        className="w-full max-w-md px-4 py-2 border rounded-md shadow focus:outline-none focus:ring"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Grid */}
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredTours.map((tour, i) => (
                        <motion.div
                            key={tour._id}
                            className="bg-white rounded-xl overflow-hidden shadow-lg"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <img
                                src={tour?.photo}
                                alt={tour?.tourName}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl text-info font-semibold mb-2">{tour?.tourName}</h3>

                                <div className="flex items-center gap-2 mb-3">
                                    <img
                                        src={tour?.guidPhoto}
                                        alt={tour?.guidname}
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <span className="text-sm text-neutral">{tour?.guidname}</span>
                                </div>

                                <p className="text-sm text-neutral mb-1">🕒 {tour?.duration}</p>
                                <p className="text-sm mb-1 text-neutral ">📅 {tour?.date}</p>
                                <p className="text-lg font-bold text-blue-700 mb-4">${tour?.price}</p>

                                <button
                                    onClick={() =>
                                        user ? navigate(`/PackageDetails/${tour._id}`) : navigate("/login")
                                    }
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm font-medium"
                                >
                                    View Details
                                </button>

                            </div>
                        </motion.div>
                    ))}
                </div>

                {filteredTours.length === 0 && (
                    <p className="text-center text-gray-500 mt-10">
                        No matching tours found.
                    </p>
                )}
            </div>
        </>
    );
}

export default AllPackages;
