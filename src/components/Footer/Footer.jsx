import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import logo from "../.././assets/logo.png";
import { Link } from "react-router"; // Fixed import

const Footer = () => {
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <motion.footer
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="bg-gray-900 text-white pt-12 pb-6"
        >
            <div className="container mx-auto px-4">
                {/* Top Section: Links + Logo */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Column 1: About */}
                    <motion.div variants={fadeIn}>
                        <h3 className="text-xl font-bold mb-4">About Booking</h3>
                        <p className="mb-4">
                            Your one-stop solution for seamless tour package bookings and travel experiences.
                        </p>
                        <div className="flex space-x-4">
                            <Link to="https://www.facebook.com/rana.rahim.5473">
                            <FaFacebook  className="text-2xl hover:text-blue-500 cursor-pointer" />
                            </Link>
                            <Link to="https://www.youtube.com/@shapashapa1676">

                            <FaTwitter className="text-2xl hover:text-sky-400 cursor-pointer" />
                            </Link>

                            <Link to="https://www.instagram.com/safayet302/?fbclid=IwY2xjawK-cwtleHRuA2FlbQIxMABicmlkETF3cEdWQlE4bHRqM0t6cW5EAR6e9lBuK_2mzzj9JgMfMHTRUgwTM0vTqmHZxWQwuc4TZR7lvFwuZ7klL2FUdg_aem_XsZvkmZQxAmuthyb-NMeQw#">

                            
                            <FaInstagram className="text-2xl hover:text-pink-500 cursor-pointer" />
                            </Link>

                            <Link to="https://www.linkedin.com/in/md-shafayat-hosan"> 
                            
                            
                            <FaLinkedin className="text-2xl hover:text-blue-700 cursor-pointer" />
                            </Link>
                        </div>
                    </motion.div>

                    {/* Column 2: Quick Links */}
                    <motion.div variants={fadeIn}>
                        <h3 className="text-xl font-bold mb-4">Booking Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/" className="hover:text-cyan-400">Home</Link></li>
                            <li><Link to="/all-packages" className="hover:text-cyan-400">Tour Packages</Link></li>
                            <li><Link to="/myBooking" className="hover:text-cyan-400">My Bookings</Link></li>
                            <li><Link to="/aboutUs" className="hover:text-cyan-400">Contact Us</Link></li>
                        </ul>
                    </motion.div>

                    {/* Column 3: Contact */}
                    <motion.div variants={fadeIn}>
                        <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                        <p>Email: sshapa17@gmail.com</p>
                        <p>Phone: +880 1610665069</p>
                        <p>Address: 123 Travel Street, Dhaka, Bangladesh</p>
                    </motion.div>

                    {/* Column 4: Logo */}
                    <motion.div variants={fadeIn} className="flex flex-col items-center">
                        <div className="text-3xl font-bold mb-2">
                     <div className="hover:scale-[1.02] transition-transform duration-200">
                                           <Link
                                               className="flex items-center justify-center gap-2 group"
                                               to="/"
                                           >
                                             
                                               <img
                                                   className="w-[60px] group-hover:drop-shadow-lg transition-all duration-300"
                                                   src={logo}
                                                   alt="BookEase Logo"
                                               />
                   
                                       
                                               <h1 className="hidden md:block text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 group-hover:from-blue-700 group-hover:to-cyan-500 transition-all duration-500 tracking-tight">
                                                   Booking Management
                                               </h1>
                                           </Link>
                                       </div>
                        </div>
                        <p className="text-sm text-gray-400">© 2025 package management. All rights reserved.</p>
                    </motion.div>
                </div>

                <motion.div
                    variants={fadeIn}
                    className="border-t border-gray-700 pt-6"
                >
                    <h3 className="text-lg font-bold mb-4 text-center">Payment Methods</h3>
                    <div className="flex flex-wrap justify-center gap-4">

                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png"
                            alt="Visa"
                            className="h-12 object-contain"
                        />

                        {/* Mastercard */}
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png"
                            alt="Mastercard"
                            className="h-12 object-contain"
                        />

                    </div>
                </motion.div>
            </div>
        </motion.footer>
    );
};

export default Footer;