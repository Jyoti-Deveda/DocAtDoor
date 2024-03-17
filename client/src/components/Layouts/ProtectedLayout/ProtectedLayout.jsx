import React from 'react'
import Style from "./ProtectedLayout.module.css";
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar';
import useAuth from '@/util/useAuth';
import { protectedRoutesMap } from '@/routesMap';
import UnAuthorized from '@/components/Common/UnAuthorized/UnAuthorized';


const ProtectedLayout = () => {
    const { user, role } = useAuth();
    const location = useLocation();

    if (!user) {
        return <Navigate to={'login'} replace />
    }

    // look on the route's allowed roles to match the current user role.
    if (role) {
        const currentRoute = protectedRoutesMap[location.pathname];
        if (currentRoute && !currentRoute.allowed_roles.includes(role)) {
            return <UnAuthorized />;
        }
    }

    return (
        <div className={`${Style.container} gap-3`}>
            <div className={`flex flex-col gap-4 border-2 border-black-900 p-1`}>
                <Sidebar />
            </div>
            <div className={`flex flex-col p-3 pr-5`}>
                <Outlet />
            </div>
        </div>
    )
}

export default ProtectedLayout