import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import logo from "../.././assets/sitelogo.png"
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
                        <h3 className="text-xl font-bold mb-4">About UniCQ</h3>
                        <p className="mb-4">
                            Your one-stop solution for seamless tour package bookings and travel experiences.
                        </p>
                        <div className="flex space-x-4">
                            <FaFacebook className="text-2xl hover:text-blue-500 cursor-pointer" />
                            <FaTwitter className="text-2xl hover:text-sky-400 cursor-pointer" />
                            <FaInstagram className="text-2xl hover:text-pink-500 cursor-pointer" />
                            <FaLinkedin className="text-2xl hover:text-blue-700 cursor-pointer" />
                        </div>
                    </motion.div>

                    {/* Column 2: Quick Links */}
                    <motion.div variants={fadeIn}>
                        <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-cyan-400">Home</a></li>
                            <li><a href="#" className="hover:text-cyan-400">Tour Packages</a></li>
                            <li><a href="#" className="hover:text-cyan-400">My Bookings</a></li>
                            <li><a href="#" className="hover:text-cyan-400">Contact Us</a></li>
                        </ul>
                    </motion.div>

                    {/* Column 3: Contact */}
                    <motion.div variants={fadeIn}>
                        <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                        <p>Email: support@unicq.com</p>
                        <p>Phone: +880 1234 567890</p>
                        <p>Address: 123 Travel Street, Dhaka, Bangladesh</p>
                    </motion.div>

                    {/* Column 4: Logo */}
                    <motion.div variants={fadeIn} className="flex flex-col items-center">
                        <div className="text-3xl font-bold mb-2">
                           <img className="w-[90px]" src={logo} alt="" />
                        </div>
                        <p className="text-sm text-gray-400">© 2023 UniCQ. All rights reserved.</p>
                    </motion.div>
                </div>

                {/* Payment Methods Section */}
                <motion.div
                    variants={fadeIn}
                    className="border-t border-gray-700 pt-6"
                >
                    <h3 className="text-lg font-bold mb-4 text-center">Payment Methods</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        {/* Payment Logos (Replace with actual images) */}
                        <img
                            src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.logo.wine%2Flogo%2FBKash&psig=AOvVaw0sodxedwSNTaIHXSjj262M&ust=1750169499700000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMjJ4suP9o0DFQAAAAAdAAAAABAE"
                            alt="Bkash"
                            className="h-12 object-contain"
                        />
                        <img
                            src="https://play-lh.googleusercontent.com/EQC9NtbtRvsNcU1r_5Dr8pWm3hPfN3OjGjzkOqzCEPDJvqBGKyfU9-a2ajNtcrIg1rs=w480-h960-rw"
                            alt="Nagad"
                            className="h-12 object-contain"
                        />
                        <img
                            src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3ARocket_mobile_banking_logo.svg&psig=AOvVaw29W-v3YbuNNLwQrkFBdcbN&ust=1750169521646000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOj4ktaP9o0DFQAAAAAdAAAAABAa"
                            alt="Rocket"
                            className="h-12 object-contain"
                        />
                        <img
                            src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fseeklogo.com%2Fvector-logo%2F288455%2Fislami-bank-bangladesh-ltd&psig=AOvVaw2y_p8U2GSqROnFwt9XgLkO&ust=1750169582177000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIjmn_OP9o0DFQAAAAAdAAAAABAE"
                            alt="IBBL"
                            className="h-12 object-contain"
                        />
                        <img
                            src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3ADutch-bangla-bank-ltd.svg&psig=AOvVaw0Oy0SNVtaaQh5xRqgZ0Qds&ust=1750169622624000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNC1mIaQ9o0DFQAAAAAdAAAAABAE"
                            alt="DBBL"
                            className="h-12 object-contain"
                        />
                    </div>
                </motion.div>
            </div>
        </motion.footer>
    );
};

export default Footer;