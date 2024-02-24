import { Footer } from '@/components/Common/Footer'
import { Navbar } from '@/components/Common/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout