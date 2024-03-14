import React from 'react'
import Style from "./ProtectedLayout.module.css";
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedLayout = () => {
    const isAuth = true;

    if (!isAuth) {
        return <Navigate to={'login'} replace />
    }

    return (
        <div className={`${Style.container} gap-3`}>
            <div className={`flex flex-col gap-4 border-2 border-black-900 p-1`}>
                sidebar
            </div>
            <div className={`flex flex-col justify-center p-3 pr-5`}>
                <Outlet />
            </div>
        </div>
    )
}

export default ProtectedLayout