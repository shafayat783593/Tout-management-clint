
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import banner  from "../../assets/tourbanner.jpg"
const packages = [
  {
    id: 1,
    title: "Dhaka to Cox’s Bazar Tour",
    guide: "John Smith",
    guideImg: "https://i.pravatar.cc/40?img=1",
    duration: "3 Days. 2 Nights",
    date: "May 13, 2024",
    price: "$500",
    image: "https://source.unsplash.com/400x250/?beach",
  },
  {
    id: 2,
    title: "Ladakh Adventure",
    guide: "Sarah Green",
    guideImg: "https://i.pravatar.cc/40?img=2",
    duration: "6 Days. 5.3 Nights",
    date: "June 10, 2024",
    price: "$1200",
    image: "https://source.unsplash.com/400x250/?mountain",
  },
  {
    id: 3,
    title: "Bangkok City Tour",
    guide: "David Brown",
    guideImg: "https://i.pravatar.cc/40?img=3",
    duration: "4 Days. 3 Nights",
    date: "April 20, 2024",
    price: "$800",
    image: "https://source.unsplash.com/400x250/?city,temple",
  },
  {
    id: 4,
    title: "Grand Canyon Expedition",
    guide: "Emily White",
    guideImg: "https://i.pravatar.cc/40?img=4",
    duration: "5 Days. 4 Nights",
    date: "July 6, 2024",
    price: "$1500",
    image: "https://source.unsplash.com/400x250/?canyon",
  },
  {
    id: 5,
    title: "Cairo and Nile Cruise",
    guide: "Michael Lee",
    guideImg: "https://i.pravatar.cc/40?img=5",
    duration: "7 Days. 6 Nights",
    date: "August 12, 2024",
    price: "$1800",
    image: "https://source.unsplash.com/400x250/?pyramids",
  },
  {
    id: 6,
    title: "Santorini Getaway",
    guide: "Emma Davis",
    guideImg: "https://i.pravatar.cc/40?img=6",
    duration: "4 Days. 3 Nights",
    date: "September 5, 2024",
    price: "$1100",
    image: "https://source.unsplash.com/400x250/?santorini",
  },
];

export default function Home() {
  const navigate = useNavigate();

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
        <h2 className="text-3xl font-bold mb-10">Featured Packages</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              className="bg-white shadow-md rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <img src={pkg.image} alt={pkg.title} className="w-full h-48 object-cover" />
              <div className="p-4 text-left">
                <h3 className="text-xl font-semibold mb-2">{pkg.title}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src={pkg.guideImg}
                    alt={pkg.guide}
                    className="w-8 h-8 rounded-full"
                  />
                  <p className="text-sm">{pkg.guide}</p>
                </div>
                <p className="text-sm mb-1">🕒 {pkg.duration}</p>
                <p className="text-sm mb-1">📅 {pkg.date}</p>
                <p className="text-lg font-bold mb-3">{pkg.price}</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-10"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={() => navigate("/all-packages")}
            className="text-blue-600 border border-blue-600 px-5 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition"
          >
            Show All
          </button>
        </motion.div>
      </section>
    </div>
  );
}
