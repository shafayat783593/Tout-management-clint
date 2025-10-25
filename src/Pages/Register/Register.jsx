import React, { useState } from 'react'
import { motion } from "framer-motion"
import './Register.css'
import { toast, ToastContainer } from 'react-toastify'
import { Link, useNavigate, useLocation } from 'react-router' // 'react-router' এর পরিবর্তে 'react-router-dom' use করুন
import UseAuth from '../../Hooks/UseAuth'
import PageTitle from '../../Hooks/PageTitle'

function Register() {
    const { createUser, updateUser, setUser } = UseAuth() // setuser এর পরিবর্তে setUser use করুন
    const navigate = useNavigate()
    const location = useLocation()
    const [nameError, setnameError] = useState('')
    const [firebaseerror, setfirebaseerror] = useState("")
    const [success, setsuccess] = useState("")
    const [passworderror, setpassworderror] = useState("")
    const [loading, setLoading] = useState(false)

    const handelSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setfirebaseerror("")
        setsuccess("")

        const name = e.target.name.value
        const photoUrl = e.target.photo.value
        const email = e.target.email.value
        const password = e.target.password.value

        console.log("Form data:", { name, email, photoUrl });

        // Validation
        if (name.length < 2) {
            setnameError("Name should be more than 2 characters")
            setLoading(false)
            return
        } else {
            setnameError("")
        }

        if (password.length < 6) {
            setpassworderror("Password must contain at least six characters.");
            setLoading(false)
            return
        }
        if (!/[A-Z]/.test(password)) {
            setpassworderror("Password must contain at least one uppercase letter.");
            setLoading(false)
            return
        }
        if (!/[a-z]/.test(password)) {
            setpassworderror("Password must contain at least one lowercase letter.");
            setLoading(false)
            return
        }

        try {
            // 1. Firebase-এ user create করুন
            console.log("Creating Firebase user...");
            const userCredential = await createUser(email, password)
            const user = userCredential.user
            console.log("Firebase user created:", user.email);

            // 2. Firebase-এ profile update করুন
            console.log("Updating Firebase profile...");
            await updateUser({
                displayName: name,
                photoURL: photoUrl
            })

            // 3. MongoDB-তে user save করুন
            console.log("Saving to MongoDB...");
            const userData = {
                name: name,
                email: email,
                photo: photoUrl,
                role: "user"
            }

            console.log("Sending data to backend:", userData);

            const response = await fetch('https://tour-management-server-ashen.vercel.app/api/users/register', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
            },
                body: JSON.stringify(userData)
            })

        console.log("Backend response status:", response.status);

        const result = await response.json()
        console.log("Backend response data:", result);

        if (!response.ok) {
            throw new Error(result.message || `Failed to save user to database: ${response.status}`)
        }

        // 4. Success handling - setUser use করুন
        setsuccess("You have successfully registered!")

        // Auth state automatically update হবে onAuthStateChanged এর মাধ্যমে
        // যদি manual set করতে চান:
        setUser({
            ...user,
            displayName: name,
            photoURL: photoUrl
        })

        toast.success('You are successfully registered!', {
            position: "top-right",
            autoClose: 3000,
            pauseOnHover: true,
            theme: "light",
        })

        console.log("Registration completed successfully");

        // 5. Redirect - location.state check করুন
        const redirectPath = location.state?.from?.pathname || "/"
        console.log("Redirecting to:", redirectPath);

        setTimeout(() => {
            navigate(redirectPath, { replace: true })
        }, 2000)

    } catch (error) {
        console.error("❌ Registration error:", error)
        setfirebaseerror(error.message)
        toast.error(error.message, {
            position: "top-right",
            autoClose: 5000,
            pauseOnHover: true,
            theme: "light",
        })
    } finally {
        setLoading(false)
    }
}

return (
    <>
        <PageTitle title="Register" />
        <div className='flex justify-center items-center py-5 mt-30'>
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
            >
                <form onSubmit={handelSubmit} className="form shadow-2xl">
                    <p className="title">Register</p>
                    <p className="message">Register now and get full access to our app.</p>

                    <label>
                        <input required placeholder="" name='name' type="text" className="input" />
                        <span>Name</span>
                    </label>
                    {nameError && <p className='text-red-500'>{nameError}</p>}

                    <label>
                        <input required placeholder="" name='email' type="email" className="input" />
                        <span>Email</span>
                    </label>

                    <label>
                        <input required placeholder="" name='password' type="password" className="input" />
                        <span>Password</span>
                    </label>
                    <p className='text-red-600 font-bold'>{passworderror}</p>

                    <label>
                        <input placeholder="" name='photo' type="url" className="input" />
                        <span>Photo URL (Optional)</span>
                    </label>

                    <button
                        type='submit'
                        className="submit cursor-pointer"
                        disabled={loading}
                    >
                        {loading ? 'Registering...' : 'Submit'}
                    </button>
                    <p className="signin">
                        Already have an account? <Link to="/auth/login">Login</Link>
                    </p>
                </form>
                {firebaseerror && <p className='text-red-500 text-center mt-4'>{firebaseerror}</p>}
                {success && <p className='text-green-400 font-bold text-center mt-4'>{success}</p>}
            </motion.div>
            <ToastContainer />
        </div>
    </>
)
}

export default Register