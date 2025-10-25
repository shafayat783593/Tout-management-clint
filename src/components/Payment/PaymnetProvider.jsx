// // src/components/Payment/PaymentProvider.jsx
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import Loading from "../Loading/Loading";
// import TourPaymentForm from "./PaymentFrom";

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// export default function PaymentProvider() {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [booking, setBooking] = useState(null);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchData = async () => {
//             console.log("Fetching booking ID:", id); // ✅ log
//             try {
//                 const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/bookings/${id}`);
//                 const data = await res.json();

//                 if (!res.ok) throw new Error(data.message || "Failed to fetch booking");

//                 console.log("Fetched booking:", data.booking);
//                 setBooking(data.booking);
//             } catch (error) {
//                 console.error("Error fetching booking:", error);
//                 setError(error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (id) fetchData();
//     }, [id]);



//     // Show loading state
//     if (loading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <Loading />
//             </div>
//         );
//     }

//     // Show error state
//     if (error) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <div className="text-center">
//                     <div className="text-red-500 text-xl mb-4">❌ {error}</div>
//                     <button
//                         onClick={() => navigate("/my-bookings")}
//                         className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
//                     >
//                         Back to My Bookings
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     // Show no booking data state
//     if (!booking) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <div className="text-center">
//                     <div className="text-gray-500 text-xl mb-4">No booking data found</div>
//                     <button
//                         onClick={() => navigate("/my-bookings")}
//                         className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
//                     >
//                         Back to My Bookings
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     // Show payment form
//     return (
//         <Elements stripe={stripePromise}>
//             <div className="pb-10">
//                 <TourPaymentForm booking={booking} />
//             </div>
//         </Elements>
//     );
// }





















// src/components/Payment/PaymentProvider.jsx - SIMPLE VERSION
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Loading from "../Loading/Loading";
import TourPaymentForm from "./PaymentFrom";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function PaymentProvider() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    // Get booking from location state (passed from MyBooking)
    const booking = location.state?.booking;

    console.log("📍 PaymentProvider - Booking from state:", booking);
    console.log("📍 PaymentProvider - ID from params:", id);

    // If no booking data in state, try to show helpful error
    if (!booking) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center max-w-md p-8 bg-white rounded-lg shadow-lg border border-red-200">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Data Missing</h2>

                    <div className="text-left bg-gray-100 p-4 rounded-lg mb-6">
                        <p className="text-sm text-gray-700 mb-2">
                            <strong>Debug Info:</strong>
                        </p>
                        <p className="text-sm text-gray-600">Booking ID: {id}</p>
                        <p className="text-sm text-gray-600">Has State Data: {location.state ? 'Yes' : 'No'}</p>
                    </div>

                    <p className="text-gray-600 mb-2">
                        Please go back to your bookings and click "Pay Now" again.
                    </p>
                    <p className="text-sm text-gray-500 mb-6">
                        If this continues, the booking might not exist or you may need to refresh the page.
                    </p>

                    <div className="space-y-3">
                        <button
                            onClick={() => navigate("/my-bookings")}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors font-medium"
                        >
                            Back to My Bookings
                        </button>
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors font-medium"
                        >
                            Refresh Page
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Show payment form with booking data from state
    return (
        <Elements stripe={stripePromise}>
            <div className="min-h-screen bg-gray-50">
                <TourPaymentForm booking={booking} />
            </div>
        </Elements>
    );
}