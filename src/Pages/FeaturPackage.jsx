// import { motion, useMotionValue, useTransform } from "framer-motion";
// import { useRef } from "react";
// import { FaShieldAlt, FaHeadset, FaMoneyCheckAlt, FaStar } from "react-icons/fa";

// export default function WhyChooseUs() {
//   const features = [
//     {
//       icon: FaShieldAlt,
//       title: "Trusted & Secure",
//       description: "We prioritize your safety with verified bookings and secure payments.",
//     },
//     {
//       icon: FaHeadset,
//       title: "24/7 Customer Support",
//       description: "Our friendly team is here to assist you anytime, anywhere.",
//     },
//     {
//       icon: FaMoneyCheckAlt,
//       title: "Best Price Guarantee",
//       description: "Get the most competitive prices and exclusive deals.",
//     },
//     {
//       icon: FaStar,
//       title: "Top-rated Services",
//       description: "Highly rated by thousands of happy travelers worldwide.",
//     },
//   ];

//   // Custom hook to create 3D tilt effect
//   function useTilt() {
//     const ref = useRef(null);
//     const x = useMotionValue(0);
//     const y = useMotionValue(0);

//     const rotateX = useTransform(y, [-50, 50], [15, -15]);
//     const rotateY = useTransform(x, [-50, 50], [-15, 15]);

//     function handleMouse(event) {
//       const rect = ref.current.getBoundingClientRect();
//       x.set(event.clientX - rect.left - rect.width / 2);
//       y.set(event.clientY - rect.top - rect.height / 2);
//     }
//     function handleMouseLeave() {
//       x.set(0);
//       y.set(0);
//     }

//     return {
//       ref,
//       style: {
//         rotateX,
//         rotateY,
//         perspective: 1000,
//       },
//       handleMouse,
//       handleMouseLeave,
//     };
//   }

//   return (
//     <section className="w-11/12 max-w-7xl mx-auto my-16">
//       <motion.h2
//         className="text-4xl font-extrabold text-center mb-10 text-gray-800"
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7, ease: "easeOut" }}
//       >
//         Why Choose Us?
//       </motion.h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
//         {features.map(({ icon: Icon, title, description }, idx) => {
//           const { ref, style, handleMouse, handleMouseLeave } = useTilt();

//           return (
//             <motion.div
//               key={idx}
//               ref={ref}
//               style={style}
//               className="bg-gradient-to-tr from-blue-50 to-white p-6 rounded-xl shadow-lg cursor-pointer select-none"
//               onMouseMove={handleMouse}
//               onMouseLeave={handleMouseLeave}
//               whileHover={{
//                 scale: 1.08,
//                 boxShadow:
//                   "0 20px 30px rgba(59, 130, 246, 0.4), 0 10px 20px rgba(59, 130, 246, 0.25)",
//               }}
//               transition={{ type: "spring", stiffness: 300, damping: 20 }}
//             >
//               <motion.div
//                 className="mb-5 text-blue-600"
//                 whileHover={{ scale: 1.2, rotate: 10, color: "#2563eb" }}
//                 transition={{ type: "spring", stiffness: 300, damping: 10 }}
//               >
//                 <Icon size={36} />
//               </motion.div>
//               <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
//               <p className="text-gray-600">{description}</p>
//             </motion.div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }



import { motion } from "framer-motion";
import { FaShieldAlt, FaHeadset, FaMoneyCheckAlt, FaStar } from "react-icons/fa";

export default function WhyChooseUs() {
    const features = [
        {
            icon: FaShieldAlt,
            title: "Trusted & Secure",
            description: "We prioritize your safety with verified bookings and secure payments.",
        },
        {
            icon: FaHeadset,
            title: "24/7 Customer Support",
            description: "Our friendly team is here to assist you anytime, anywhere.",
        },
        {
            icon: FaMoneyCheckAlt,
            title: "Best Price Guarantee",
            description: "Get the most competitive prices and exclusive deals.",
        },
        {
            icon: FaStar,
            title: "Top-rated Services",
            description: "Highly rated by thousands of happy travelers worldwide.",
        },
    ];

    return (
        <section className="w-11/12 max-w-7xl mx-auto my-16">
            <motion.h2
                className="text-4xl font-extrabold text-center mb-10 "
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
            >
                Why Choose Us?
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {features.map(({ icon: Icon, title, description }, idx) => (
                    <motion.div
                        key={idx}
                        className=" p-6 rounded-xl shadow-md cursor-pointer select-none flex flex-col items-center text-center"
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0 10px 20px rgba(59, 130, 246, 0.3)",
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        <motion.div
                            className="mb-5 text-blue-600"
                            whileHover={{ scale: 1.3, color: "#2563eb" }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        >
                            <Icon size={36} />
                        </motion.div>
                        <h3 className="text-xl font-semibold mb-3 ">{title}</h3>
                        <p className="">{description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
