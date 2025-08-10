import React, { use, useState } from 'react'

import { motion } from "framer-motion"


import './Register.css'
import { toast, ToastContainer } from 'react-toastify'
import { Link, useNavigate } from 'react-router'
import UseAuth from '../../Hooks/UseAuth'
import PageTitle from '../../Hooks/PageTitle'
function Register() {



    const { createUser, updateUser, setuser } =UseAuth()
    const navagate = useNavigate()
    const [nameError, setnameError] = useState('')
    const [firebaseerror, setfirebaseerror] = useState("")
    const [success, setsuccess] = useState("")
    const [passworderror, setpassworderror] = useState("")

    const handelSubmit = (e) => {



        e.preventDefault()

        const name = e.target.name.value
        const photoUrl = e.target.photo.value
        const email = e.target.email.value
        const password = e.target.password.value



        if (name.length < 5) {
            setnameError("Name should be more then 5 char")
            return
        } else {
            setnameError("")
        }






        if (password.length < 6) {
            setpassworderror("Password must contain at least six characters.");
            return
        }
        if (!/[A-Z]/.test(password)) {
            setpassworderror("Password must contain at least one uppercase letter.");
            return
        }
        if (!/[a-z]/.test(password)) {
            setpassworderror("Password must contain at least one lowercase letter.");
            return
        }



        createUser(email, password).then(res => {

            setsuccess("")
            setnameError("");
            setsuccess("you have successfully add ")
            toast.success('You are successfully registered!', {
                position: "top-right",
                autoClose: 3000,
                pauseOnHover: true,
                theme: "light",
            })
            navagate(`${location.state ? location.state : "/"}`)

            const user = res.user
            updateUser({ displayName: name, photoURL: photoUrl }).then(() => {
                setuser({ ...user, displayName: name, photoURL: photoUrl })


            }).catch((error) => {
             

            });


        }).catch(error => {
            const errorCode = error.code;


            setfirebaseerror(errorCode)
        })

    }
    return (

<>
            <PageTitle  title="Register" /> 

        <div className='flex justify-center items-center py-5 mt-30 '>


            <motion.div


                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
            >


                <form
                    onSubmit={handelSubmit}

                    className="form shadow-2xl ">
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
                        <input required placeholder="" name='photo' type="url" className="input" />
                        <span>Photo URL</span>
                    </label>



                    <button  type='submit' className="submit cursor-pointer">Submit</button>
                    <p className="signin">Already have an account? <Link to="/auth/login">Login</Link></p>
                </form>
                {firebaseerror && <p className='text-red-500'>{firebaseerror}</p>}
                {
                    success && <p className='text-green-400 font-bold'>{success}</p>
                }
            </motion.div>
            <ToastContainer />

        </div>

</>




    )
}

export default Register
