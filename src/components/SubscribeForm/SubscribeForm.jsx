'use client'

import { useState, useEffect, useRef } from 'react'
import {
    FiMail,
    FiBell,
    FiStar,
    FiShield,
    FiFilm,
    FiSend,
} from 'react-icons/fi'
import { MdOutlinePrivacyTip } from 'react-icons/md'
import Swal from 'sweetalert2'
import axios from 'axios'
import UseAxiosSecure from '../../Hooks/UseAxiosSecure'

function NewsLetter() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [isSubscribed, setIsSubscribed] = useState(false)
    const [message, setMessage] = useState({ type: '', text: '' })
    const [mounted, setMounted] = useState(false)
    const formRef = useRef(null)
const axiosSecure= UseAxiosSecure()
    // Fix hydration mismatch by delaying render until mounted
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setMessage({ type: 'error', text: 'Please enter a valid email address' })
            return
        }

        setLoading(true)
        setMessage({ type: '', text: '' })

        try {
            const response = await axiosSecure.post('/api/newsletter/subscribe', {
                email,
            })

            if (response.data.success) {
                Swal.fire({
                    title: ' Subscribed Successfully!',
                    text: "Welcome to our cinema family! You'll receive exclusive updates.",
                    icon: 'success',
                    confirmButtonColor: '#ef4444',
                    background: '#0f172a',
                    color: '#fff',
                })

                setIsSubscribed(true)
                setEmail('')
                setMessage({
                    type: 'success',
                    text: "You're successfully subscribed!",
                })
            } else {
                Swal.fire({
                    title: 'Already Subscribed!',
                    text: "You're already part of our cinema community ",
                    icon: 'info',
                    confirmButtonColor: '#ef4444',
                    background: '#0f172a',
                    color: '#fff',
                })
                setMessage({
                    type: 'error',
                    text: response.data.message || 'Already subscribed',
                })
                setIsSubscribed(true)
            }
        } catch (error) {
            Swal.fire({
                title: 'Server Error!',
                text: error.response?.data?.message || 'Please try again later.',
                icon: 'error',
                confirmButtonColor: '#ef4444',
                background: '#0f172a',
                color: '#fff',
            })
            setMessage({
                type: 'error',
                text: error.response?.data?.message || 'Server error, try again later',
            })
        } finally {
            setLoading(false)
        }
    }

    const features = [
        {
            icon: FiBell,
            title: 'First to Know',
            description:
                'Be the first to hear about new releases and special screenings',
            color: 'from-blue-500 to-cyan-500',
            bgColor: 'bg-blue-500/10',
            borderColor: 'border-blue-500/20',
        },
        {
            icon: FiStar,
            title: 'Exclusive Deals',
            description: 'Get special discounts and offers before anyone else',
            color: 'from-amber-500 to-orange-500',
            bgColor: 'bg-amber-500/10',
            borderColor: 'border-amber-500/20',
        },
      
    ]

    return (
        <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-16">
                  
                 
                    <p className="text-lg  max-w-2xl mx-auto">
                        Join thousands of travelers who get exclusive early access to tour bookings, special experiences, and insider travel tips.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* Features */}
                    <div className="space-y-6">
                        <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-2xl">
                            <h2 className="text-2xl font-bold + mb-6 flex items-center justify-center gap-3">
                                <FiStar className="text-red-500" /> Premium Benefits
                            </h2>
                            <div className="space-y-4">
                                {features.map((f, i) => (
                                    <div
                                        key={i}
                                        className={`flex items-start gap-4 p-4 rounded-2xl border ${f.borderColor} ${f.bgColor} hover:bg-white/5 transition-all duration-300`}
                                    >
                                        <div
                                            className={`w-12 h-12 flex items-center justify-center bg-gradient-to-br ${f.color} rounded-xl`}
                                        >
                                            <f.icon className=" text-base" />
                                        </div>
                                        <div>
                                            <h3 className=" font-semibold">{f.title}</h3>
                                            <p className="text-slate-400 text-sm">{f.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Newsletter Form */}
                    <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-2xl  ">
                        <h2 className="text-2xl font-bold text-center  mb-4 flex items-center justify-center gap-2 pb-2 pt-2">
                            <FiSend className="text-red-500 text-xl" />
                            Subscribe Now
                        </h2>
                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-7 ">
                            <div className="relative">
                                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email..."
                                    className="w-full pl-12 pr-4 py-4  border border-slate-600/30 rounded-2xl placeholder-slate-400 focus:outline-none focus:border-red-500"
                                    disabled={loading || isSubscribed}
                                />
                            </div>

                            {message.text && (
                                <div
                                    className={`p-3 rounded-xl border text-sm ${message.type === 'success'
                                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                                        : 'bg-red-500/10 border-red-500/20 text-red-400'
                                        }`}
                                >
                                    {message.text}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading || isSubscribed}
                                className={`w-full py-4 rounded-2xl font-semibold transition-all duration-300 ${isSubscribed
                                    ? 'bg-gray-700 text-gray-300 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600'
                                    }`}
                            >
                                {loading
                                    ? 'Securing Your Spot...'
                                    : isSubscribed
                                        ? 'Subscribed '
                                        : 'Subscribe Now'}
                            </button>
                        </form>
                        <p className="text-sm text-slate-400 text-center pt-8 flex gap-1 items-center justify-center lg:pb-4">
                            <MdOutlinePrivacyTip className="text-emerald-400 text-lg" />
                            Your email is safe with us — we respect your privacy.
                        </p>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
          background-size: 200% 200%;
        }
      `}</style>
        </div>
    )
}

export default NewsLetter