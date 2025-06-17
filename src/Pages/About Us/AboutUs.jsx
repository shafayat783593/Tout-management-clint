import { motion } from "framer-motion";
import { FaUsers, FaMapMarkedAlt, FaHandsHelping } from "react-icons/fa";
import { useNavigate } from "react-router";
import PageTitle from "../../Hooks/PageTitle";

function AboutUs() {
    const navigate= useNavigate()
    return (


     

        <div className="max-w-6xl mx-auto px-4 py-16">
            <PageTitle title="About Us" /> 

            <motion.h1
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl font-bold text-center mb-10"
            >
                About Us
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center text-lg text-gray-600 mb-12"
            >
                We are passionate about creating unforgettable travel experiences. Our mission is to connect explorers with the best guides and destinations.
            </motion.p>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
               
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-base-100 shadow-lg p-6 rounded-lg text-center"
                >
                    <FaUsers className="text-4xl text-blue-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Our Team</h3>
                    <p className="text-gray-500">
                        A diverse and experienced group of travel experts, guides, and tech enthusiasts.
                    </p>
                </motion.div>

              
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-base-100 shadow-lg p-6 rounded-lg text-center"
                >
                    <FaMapMarkedAlt className="text-4xl text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
                    <p className="text-gray-500">
                        We operate tours across continents, ensuring unique experiences everywhere.
                    </p>
                </motion.div>

            
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-base-100 shadow-lg p-6 rounded-lg text-center"
                >
                    <FaHandsHelping className="text-4xl text-yellow-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Support</h3>
                    <p className="text-gray-500">
                        24/7 customer service to assist you before, during, and after your adventure.
                    </p>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-16 text-center"
            >
                <p className="text-gray-700">
                    Ready to explore with us?{" "}
                    <span onClick={() => navigate("/all-packages")}  className="font-semibold text-blue-600 cursor-pointer">Join now and start your journey!</span>
                </p>
            </motion.div>
        </div>
    );
}

export default AboutUs;
