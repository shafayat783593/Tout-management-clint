import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import { Outlet } from 'react-router'

function AuthLayout() {
  return (
        <>


            <header className='w-11/12 mx-auto '>
                <Navbar />

            </header>
            <main>
                <Outlet />
            </main>

           

        </>
    )
}

export default AuthLayout
