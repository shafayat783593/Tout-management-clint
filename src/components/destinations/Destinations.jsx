import { motion } from "framer-motion";

const destinations = [
    {
        name: "Bali, Indonesia",
        img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        desc: "Tropical paradise with beaches, temples, and rich culture.",
    },
    {
        name: "Paris, France",
        img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
        desc: "The city of lights and love — home to the Eiffel Tower.",
    },
    {
        name: "Tokyo, Japan",
        img: "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=800&q=80",
        desc: "A futuristic city with deep roots in culture and tradition.",
    },
    {
        name: "Cox’s Bazar, Bangladesh",
        img: "https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/blogiJR0K1sWVNFzinGC_l4r3IdsVLyxZfkr.jpg",
        desc: "Home to the world's longest natural sea beach.",
    }
  ];

export default function TopDestinations() {
    return (
        <div className="py-16 ">
            <div className="text-center mb-10">
                <motion.h2
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-bold text-blue-600"
                >
                    Top Destinations
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-gray-500 mt-2"
                >
                    Discover some of the most visited places by travelers worldwide.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-6 max-w-6xl mx-auto">
                {destinations.map((dest, i) => (
                    <motion.div
                        key={i}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <img src={dest.img} alt={dest.name} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-1 text-black">{dest.name}</h3>
                            <p className="text-gray-500 text-sm">{dest.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
