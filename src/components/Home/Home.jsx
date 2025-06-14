
import { motion } from "framer-motion";
import { useLoaderData, useNavigate } from "react-router";
import banner  from "../../assets/tourbanner.jpg"
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";

import { FaClock, FaCalendarAlt } from "react-icons/fa";
import UseAuth from "../../Hooks/UseAuth";
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
        // style={{
        //   backgroundImage: `url(${banner})`,
        // }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Overlay */}
        <div className="absolute inset-0  bg-opacity-60 z-0" />

        {/* Content */}
        {/* <div className="relative z-10 text-center max-w-2xl">
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
        </div> */}











        <section>
          <div className="max-w-screen-xl mx-auto px-4 py-28 gap-12 text-gray-600 overflow-hidden md:px-8 md:flex">
            <div className='flex-none space-y-5 max-w-xl'>
              <a href="javascript:void(0)" className='inline-flex gap-x-6 items-center rounded-full p-1 pr-6 border text-sm font-medium duration-150 hover:bg-white'>
                <span className='inline-block rounded-full px-3 py-1 bg-indigo-600 text-white'>
                  News
                </span>
                <p className='flex items-center'>
                  Read the launch post from here
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                </p>
              </a>
              <h1 className="text-4xl text-gray-800 font-extrabold sm:text-5xl">
                Build your SaaS exactly how you want
              </h1>
              <p>
                Sed ut perspiciatis unde omnis iste natus voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae.
              </p>
              <div className='flex items-center gap-x-3 sm:text-sm'>
                <a href="javascript:void(0)" className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 duration-150 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex">
                  Get started
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="javascript:void(0)" className="flex items-center justify-center gap-x-1 py-2 px-4 text-gray-700 hover:text-gray-900 font-medium duration-150 md:inline-flex">
                  Contact sales
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            <div className='flex-1 hidden md:block'>
              {/* Replace with your image */}
              <img src="https://raw.githubusercontent.com/sidiDev/remote-assets/c86a7ae02ac188442548f510b5393c04140515d7/undraw_progressive_app_m-9-ms_oftfv5.svg" className="max-w-xl" />
            </div>
          </div>
        </section>
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
    </div>
  );
}
