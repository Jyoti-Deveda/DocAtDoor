import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../../assets/Logo/logo.png';
import Style from './Sidebar.module.css';
import useAuth from '@/util/useAuth';
import { userRoles } from '@/config/config';
import { LogoutButton } from '@/components/Common/Logout/LogoutButton';
import LogoutIcon from '@mui/icons-material/Logout';
import CustomButton from '@/components/CustomButton/CustomButton';
import Menu from '@mui/icons-material/Menu';
import SmSidebar from './SmSidebar/SmSidebar';

const sidebarLinks = {
    [userRoles.PATIENT]: [
        { label: 'Dashboard', path: '/patient/dashboard' },
        { label: 'Search', path: '/search-doctor' },
        { label: 'Settings', path: '/patient/settings' },
    ],
    [userRoles.DOCTOR]: [
        { label: 'Dashboard', path: '/doctor/dashboard' },
        { label: 'Settings', path: '/doctor/settings' },
    ]
};

const Sidebar = () => {
    const { role } = useAuth();
    const [show, setShow] = useState(false);
    const location = useLocation()
    const activePath = location.pathname;

    return (
        <>
            <div className={`${Style.sidebar} flex flex-col flex-1 justify-between`}>
                <div className={`flex flex-col gap-4`}>
                    <Link to={"/"} className='flex flex-row items-center p-3 px-2'>
                        <img src={logo}
                            alt='Logo'
                            className='w-[50px]'
                        />
                        <span className='text-xl text-sky-600 font-bold'>DocAtDoor</span>
                    </Link>
                    <div className={`mt-4 flex flex-col gap-1 ${Style.hide_on_sm}`}>
                        {sidebarLinks[role]?.map((link, index) => (
                            <Link
                                to={link.path}
                                key={index}
                                className={` ${Style.link} ${(activePath === link.path || (activePath.startsWith(link.path) && link.path !== '/')) && Style.active_link}`}
                            >
                                {link.icon}
                                {link.label}
                            </Link>
                        ))}

                    </div>
                </div>
                <div className={`flex ${Style.hide_on_sm}`}>
                    <LogoutButton
                        startIcon={<LogoutIcon fontSize='small' />}
                        size="small"
                        variant="underline"
                        boxShadow={false}
                        className={`m-2 ml-3 mb-4 text-start`}
                    />
                </div>

                <div className={`flex sm:hidden items-center`}>
                    <CustomButton
                        iconButton
                        variant='text-primary'
                        boxShadow={false}
                        onClick={() => setShow(true)}
                    >
                        <Menu />
                    </CustomButton>
                </div>

            </div>

            {/* sidebar to navbar on small screens  */}
            <SmSidebar
                show={show}
                onClose={() => setShow(false)}
                sidebarLinks={sidebarLinks}
                role={role}
                activePath={activePath}
            />
        </>
    );
};

export default Sidebar;