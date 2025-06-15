
import { motion } from "framer-motion";
import { useLoaderData, useNavigate } from "react-router";
import banner  from "../../assets/tourbanner.jpg"
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";

import { FaClock, FaCalendarAlt } from "react-icons/fa";
import UseAuth from "../../Hooks/UseAuth";
import Carousel from "../Carousel/Carousel";
import TopDestinations from "../destinations/Destinations";
export default function Home() {
  const [loading, setloading] = useState(true)
  const [packages, setpackages] = useState([])
  const {user}= UseAuth()
  useEffect(() => {

    axios("http://localhost:3000/appTourPackages").then(res => {
      setpackages(res.data)
      setloading(false)
    }).catch(error => {
      console.error(error);
      setloading(false); 
    })
  }, [])
  console.log(packages)

  const navigate = useNavigate();
  if (loading){
  return  <Loading />

  }
  return (
    <div className="text-center px-4">
      {/* Hero Banner */}
      <motion.section
        className="relative h-[90vh] flex items-center justify-center text-white px-4 bg-cover bg-center"
        style={{
          backgroundImage: `url(${banner})`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Overlay */}
        <div className="absolute inset-0  bg-opacity-60 z-0" />

        {/* Content */}
        <div className="relative z-10 text-center max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Discover Breathtaking Journeys
          </h1>
          <p className="text-lg md:text-xl mb-6 ">
            Explore handpicked tours and adventure trips made just for you.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/all-packages")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold"
          >
            Explore All Packages
          </motion.button>
        </div>











        
      </motion.section>



      {/* Featured Packages */}
      <section className="py-16">
        <h2 className="text-3xl font-bold mb-10 text-center">Featured Packages</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.slice(0, 6).map((pkg) => (
            <motion.div
              key={pkg._id}
              className="bg-white shadow-md rounded-xl overflow-hidden"
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
                  <p className="text-sm text-gray-700">{pkg.guidname}</p>
                </div>

                <p className="flex items-center gap-2 text-sm text-gray-600">
                  <FaClock className="text-blue-500" /> {pkg.duration}
                </p>

                <p className="flex items-center gap-2 text-sm text-gray-600">
                  <FaCalendarAlt className="text-green-500" /> {pkg.date}
                </p>

                <p className="text-lg font-bold text-gray-800">{pkg.price}</p>

                <button
                  onClick={() => user ? navigate(`/PackageDetails/${pkg._id}`) : navigate("/login")}
                
                
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

        <Carousel/>
      </section>
      <section className="my-4">
        <TopDestinations/>
      </section>
    </div>
  );
}
