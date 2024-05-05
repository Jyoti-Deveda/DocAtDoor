import React from 'react'
import Style from "./Dashboard.module.css";
import { LogoutButton } from '@/components/Common/Logout/LogoutButton';
import { AppointmentsList } from '@/pages/AppointmentsList/AppointmentsList';

const Dashboard = () => {
    return (
        <div className='p-5 md:p-10'>
            {/* <LogoutButton/> */}
            <AppointmentsList/>
        </div>
    )
}

export default Dashboard