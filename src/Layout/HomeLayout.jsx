import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'

function HomeLayout() {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer/>

        </div>
    )
}

export default HomeLayout
