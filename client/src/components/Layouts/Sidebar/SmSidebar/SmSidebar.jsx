import React, { useEffect } from 'react'
import Style from './SmSidebar.module.css';
import { Link } from 'react-router-dom';
import logo from '../../../../assets/Logo/logo.png';
import CustomButton from '@/components/CustomButton/CustomButton';
import CloseIcon from '@mui/icons-material/Close';
import { LogoutButton } from '@/components/Common/Logout/LogoutButton';
import { userRoles } from '@/config/config';

const SmSidebar = ({
    show = false,
    onClose,
    user,
    role,
    sidebarLinks,
    activePath
}) => {


    const handleClick = () => {
        onClose();
    }

    useEffect(() => {
        if (show) {
            document.body.style.overflowY = "hidden";
        }
        else {
            document.body.style.overflowY = "auto"
        }

        return () => {
            document.body.style.overflowY = "auto"
        }
    }, [show])


    return (
        <div className={`${Style.container} ${!show && Style.hide}`}>
            <div className={`${Style.main}`}>
                <div className='flex flex-row justify-between'>

                    <Link to={"/"} className='flex flex-row items-center'>
                        <img src={logo}
                            alt='Logo'
                            className='w-[40px]'
                        />
                        <span className='text-xl text-sky-600 font-bold'>DocAtDoor</span>
                    </Link>

                    <CustomButton
                        iconButton
                        variant='text'
                        roundedFull
                        color='primary'
                        boxShadow={false}
                        onClick={handleClick}
                    >
                        <CloseIcon />
                    </CustomButton>
                </div>

                {/* links  */}
                <div className={`mt-4 flex flex-col gap-1`}>
                    {sidebarLinks[role]?.map((link, index) => (
                        <Link
                            to={link.path}
                            key={index}
                            className={` ${Style.link} ${(activePath === link.path || (activePath.startsWith(link.path) && link.path !== '/')) && Style.active_link}`}
                            onClick={onClose}
                        >
                            {link.icon}
                            {link.label}
                        </Link>
                    ))}

                    <LogoutButton
                        variant={"outlined"}
                        className={"mt-4"}
                        rounded
                        color={"primary"}
                        size={"small"}
                        boxShadow={false}
                    />

                </div>
            </div>

        </div>
    )
}

export default SmSidebar