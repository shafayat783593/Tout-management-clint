import React, { use } from 'react'
// import loginbackground from "../../assets/loginbackground.jpg"
import { ToastContainer, toast } from 'react-toastify';
import UseAuth from '../../Hooks/UseAuth';


function ForgetPassword() {
    const { forgetPassword } = UseAuth()
    const handelSubmit = (e) => {
        e.preventDefault()
        const email = e.target.email.value

        forgetPassword(email).then(() => {

            toast.info('Send a forget password in you email please check!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

            });
        })
            .catch((error) => {

                const errorCode = error.code;

            });

    }

    return (
        <div>


            <div>
                <div
                    className="flex justify-center h-[calc(100vh-70px)] items-center bg-cover bg-center"
                // style={{ backgroundImage: `url(${loginbackground})` }}
                >
                    <form onSubmit={handelSubmit} className="space-y-6" action="">
                        <input name="email" type="Email" placeholder="Type here Email" className="input dark:bg-gray-700 dark:text-white" />
                        <button type="submit" className="btn btn-primary w-80">
                            Send a link
                        </button>
                    </form>
                </div>

            </div>

            <ToastContainer />
        </div>
    )
}

export default ForgetPassword
