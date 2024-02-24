import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedLayout = () => {
    const isAuth = null;

    if (!isAuth) {
        return <Navigate to={'login'} replace />
    }

    return (
        <div>
            this is protected layout
            <Outlet />
        </div>
    )
}

export default ProtectedLayout