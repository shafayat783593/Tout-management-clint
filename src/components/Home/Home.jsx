
import { motion } from "framer-motion";
import { useLoaderData, useNavigate } from "react-router";
import banner from "../../assets/banner.jpg"
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";
import { useQuery } from '@tanstack/react-query';
import { FaClock, FaCalendarAlt } from "react-icons/fa";
import UseAuth from "../../Hooks/UseAuth";
import Carousel from "../Carousel/Carousel";
import TopDestinations from "../destinations/Destinations";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
export default function Home() {
  const [loading, setloading] = useState(true)
  const [packages, setpackages] = useState([])
  const { user } = UseAuth()
  const axiosSecure = UseAxiosSecure()


  const { data: spacilaoffer = [], error, isPending, isError, } = useQuery({
    queryKey: ['spacilaoffer'],
    queryFn: async () => {
      const res = await axiosSecure.get("/spacialOffer");
      return res.data;
    }
  })
  console.log("spical offer", spacilaoffer)

  useEffect(() => {

    axios("http://localhost:3000/appTourPackages").then(res => {
      setpackages(res.data)
      setloading(false)
    }).catch(error => {
      console.error(error);
      setloading(false);
    })
  }, [])





  const navigate = useNavigate();
  if (loading) {
    return <Loading />

  }
  return (
    <div className="text-center px-4">
      {/* Hero Banner */}
      <motion.section
        className="relative h-[50vh] md:h-[90vh]  flex items-center justify-center text-white px-4 bg-cover bg-center rounded-3xl mt-5"
        style={{
          backgroundImage: `url(${banner})`,
          filter: "brightness(0.8)", // slightly darkens the image itself
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Content */}
        <div className="relative z-10 text-center max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-[0_4px_6px_rgba(0,0,0,0.7)]">
            Discover Breathtaking Journeys
          </h1>
          <p className="text-lg text-white md:text-xl mb-6 drop-shadow-[0_3px_4px_rgba(0,0,0,0.7)]">
            Explore handpicked tours and adventure trips made just for you.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/all-packages")}
            className=" cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg"
          >
            Explore All Packages
          </motion.button>
        </div>
      </motion.section>




      {/* Featured Packages */}
      <section className="py-16">
        <h2 className="text-3xl font-bold mb-10 text-center">Featured Packages</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {packages?.slice(0, 6).map((pkg) => (
            <motion.div
              key={pkg._id}
              className=" shadow-md rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <img src={pkg.photo} alt={pkg.tourName} className="w-full h-48 object-cover" />
              <div className="p-4 text-left space-y-2">
                <h3 className="text-xl font-semibold">{pkg.title}</h3>

                <div className="flex items-center gap-2">
                  <img
                    src={pkg.guidPhoto}
                    alt={pkg.guidname}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <p className="text-sm text-gray-400">{pkg.guidname}</p>
                </div>

                <p className="flex items-center gap-2 text-sm ">
                  <FaClock className="text-blue-500" /> {pkg.duration}
                </p>

                <p className="flex items-center gap-2 text-sm ">
                  <FaCalendarAlt className="text-green-500" /> {pkg.date}
                </p>

                <p className="text-lg font-bold text-gray-400">{pkg.price}</p>

                <button
                  onClick={() => user ? navigate(`/PackageDetails/${pkg._id}`) : navigate("/auth/login")}


                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm cursor-pointer">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={() => navigate("/all-packages")}
            className="text-blue-600 border border-blue-600 px-6 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition duration-300"
          >
            Show All
          </button>
        </motion.div>
      </section>


      <section>

        <Carousel />
      </section>
      <section className="my-4">
        <TopDestinations />
      </section>


      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Exclusive Offers for You</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {spacilaoffer?.map((spacial, i) => (
              <motion.div
                key={spacial._id}
                className="  shadow-2xl rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
              >
                <img
                  src={spacial.photo}
                  alt="Hotel Offer"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold">Luxury Beach Resort</h3>
                  <p className="text-gray-500">
                    Save up to <span>{spacial?.discount}</span>% on your stay!
                  </p>
                  <button
                    onClick={() =>
                      user
                        ? navigate(`/PackageDetails/${spacial._id}`)
                        : navigate("/auth/login")
                    }
                    className="mt-4 cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>




    </div>
  );
}
