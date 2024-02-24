import React from 'react'
import Style from "./ProtectedLayout.module.css";
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedLayout = () => {
    const isAuth = true;

    if (!isAuth) {
        return <Navigate to={'login'} replace />
    }

    return (
        <div className={`${Style.container}`}>
            this is protected layout
            <Outlet />
        </div>
    )
}

export default ProtectedLayout