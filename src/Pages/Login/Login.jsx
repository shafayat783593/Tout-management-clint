import React, { useState } from 'react'
import UseAuth from '../../Hooks/UseAuth'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Login.css'
import { motion } from "framer-motion"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PageTitle from '../../Hooks/PageTitle'
import UseAxiosSecure from '../../Hooks/UseAxiosSecure'

function Login() {
    const location = useLocation()
    const navigate = useNavigate()
    const { signIn, googleLogin, github } = UseAuth()
    const axiosSecure = UseAxiosSecure()

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    // Function to save user data to backend
    const saveUserToBackend = async (userData) => {
        try {
            console.log('📤 Saving user to backend:', userData)

            const response = await axiosSecure.post('/api/users/register', userData)

            if (response.data.success) {
                console.log('✅ User saved to backend successfully')
                toast.success('Welcome! Login successful')
            } else {
                console.log('ℹ️ User already exists or other status:', response.data.message)
            }
            return response.data
        } catch (error) {
            console.error('❌ Error saving user to backend:', error)
            // Don't show error toast for duplicate users, it's normal
            if (!error.response?.data?.message?.includes('already exists')) {
                toast.error('Failed to save user data')
            }
            throw error
        }
    }

    // Prepare user data for backend
    const prepareUserData = (user, loginMethod) => {
        return {
            name: user.displayName || user.email.split('@')[0],
            email: user.email,
            photo: user.photoURL || '',
            role: 'user',
            loginMethod: loginMethod,
            lastLogin: new Date().toISOString(),
            emailVerified: user.emailVerified || false
        }
    }

    const handelSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        const email = e.target.email.value
        const password = e.target.password.value

        signIn(email, password).then(res => {
            const user = res.user
            console.log('🔐 Email login successful:', user)

            // Prepare user data for backend
            const userData = prepareUserData(user, 'email')

            // Save to backend
            saveUserToBackend(userData)
                .then(() => {
                    navigate(location.state?.from || "/")
                    toast.success('Welcome back!')
                })
                .catch(error => {
                    console.error('Error saving email user:', error)
                    // Still navigate even if backend save fails
                    navigate(location.state?.from || "/")
                })
                .finally(() => {
                    setLoading(false)
                })

        }).catch(error => {
            console.error('❌ Email login error:', error)
            setError(getFirebaseErrorMessage(error.code))
            setLoading(false)
            toast.error('Login failed. Please check your credentials.')
        })
    }

    const hanelGoogleLogin = () => {
        setLoading(true)
        setError("")

        googleLogin().then(result => {
            const user = result.user
            console.log('🔐 Google login successful:', user)

            // Prepare user data for backend
            const userData = prepareUserData(user, 'google')

            // Save to backend
            saveUserToBackend(userData)
                .then(() => {
                    navigate(location.state?.from || "/")
                    toast.success('Google login successful!')
                })
                .catch(error => {
                    console.error('Error saving Google user:', error)
                    // Still navigate even if backend save fails
                    navigate(location.state?.from || "/")
                })
                .finally(() => {
                    setLoading(false)
                })

        }).catch(error => {
            console.error('❌ Google login error:', error)
            setError(getFirebaseErrorMessage(error.code))
            setLoading(false)
            toast.error('Google login failed. Please try again.')
        })
    }

    const handelGItLogin = () => {
        setLoading(true)
        setError("")

        github().then(result => {
            const user = result.user
            console.log('🔐 GitHub login successful:', user)

            // Prepare user data for backend
            const userData = prepareUserData(user, 'github')

            // Save to backend
            saveUserToBackend(userData)
                .then(() => {
                    navigate(location.state?.from || "/")
                    toast.success('GitHub login successful!')
                })
                .catch(error => {
                    console.error('Error saving GitHub user:', error)
                    // Still navigate even if backend save fails
                    navigate(location.state?.from || "/")
                })
                .finally(() => {
                    setLoading(false)
                })

        }).catch(error => {
            console.error('❌ GitHub login error:', error)
            setError(getFirebaseErrorMessage(error.code))
            setLoading(false)
            toast.error('GitHub login failed. Please try again.')
        })
    }

    // Helper function to get user-friendly error messages
    const getFirebaseErrorMessage = (errorCode) => {
        const errorMessages = {
            'auth/invalid-email': 'Invalid email address',
            'auth/user-disabled': 'This account has been disabled',
            'auth/user-not-found': 'No account found with this email',
            'auth/wrong-password': 'Incorrect password',
            'auth/too-many-requests': 'Too many attempts. Please try again later',
            'auth/popup-closed-by-user': 'Login popup was closed',
            'auth/popup-blocked': 'Login popup was blocked by your browser',
            'auth/network-request-failed': 'Network error. Please check your connection'
        }
        return errorMessages[errorCode] || 'An error occurred. Please try again.'
    }

    return (
        <div>
            <PageTitle title="Login" />

            <div className='flex justify-center items-center py-5 mt-30'>
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                >
                    <form
                        onSubmit={handelSubmit}
                        className="form shadow-2xl w-"
                    >
                        <p className="title">Login</p>
                        <p className="message">Login now and get full access to our app.</p>

                        <label>
                            <input
                                required
                                placeholder=""
                                name='email'
                                type="email"
                                className="input"
                                disabled={loading}
                            />
                            <span>Email</span>
                        </label>

                        <label>
                            <input
                                required
                                placeholder=""
                                name='password'
                                type="password"
                                className="input"
                                disabled={loading}
                            />
                            <span>Password</span>
                        </label>

                        <Link to="/forgetpassword">
                            <span className="link link-hover">Forgot password?</span>
                        </Link>

                        {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}

                        <button
                            type='submit'
                            className="submit cursor-pointer"
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    Logging in...
                                </div>
                            ) : (
                                'Login'
                            )}
                        </button>

                        <h2 className='text-center font-bold'>
                            Don't Have An Account?
                            <Link to="/auth/register" className='text-[#9748FF]'> Register</Link>
                        </h2>

                        <div className="relative my-4">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        <button
                            onClick={hanelGoogleLogin}
                            disabled={loading}
                            className="btn mt-2"
                        >
                            <svg aria-label="Google logo" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <g>
                                    <path d="m0 0H512V512H0" fill="#fff"></path>
                                    <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                                    <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                                    <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                                    <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                                </g>
                            </svg>
                            {loading ? 'Connecting...' : 'Login with Google'}
                        </button>

                        <button
                            onClick={handelGItLogin}
                            disabled={loading}
                            className="btn bg-white dark:bg-gray-700 dark:border-none text-black border-[#e5e5e5] mt-3"
                        >
                            <svg aria-label="GitHub logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"></path>
                            </svg>
                            {loading ? 'Connecting...' : 'Login with GitHub'}
                        </button>
                    </form>
                </motion.div>

                <ToastContainer
                    position="bottom-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>
        </div>
    )
}

export default Login