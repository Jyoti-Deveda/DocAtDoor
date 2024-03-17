import React, { useEffect } from 'react'
import Style from "./SmNavbar.module.css";
import { Link } from 'react-router-dom';
import logo from '../../../assets/Logo/logo.png'
import CustomButton from '@/components/CustomButton/CustomButton';
import CloseIcon from '@mui/icons-material/Close';
import { LogoutButton } from '../Logout/LogoutButton';
import { userRoles } from '@/config/config';



const patientDashboardPath = '/patient/dashboard';
const doctorDashboardPath = '/doctor/dashboard';


const SmNavbar = ({
    show = false,
    NavbarLinks,
    onClose,
    handleLoginClick,
    handleSignupClick,
    user,
    role,
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
        <>
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

                    {user &&
                        <Link to={role === userRoles.PATIENT ? patientDashboardPath : doctorDashboardPath} onClick={handleClick}>
                            <div className='text-sky-600 hover:text-sky-300 text-lg font-semibold cursor-pointer px-2'>
                                Dashboard
                            </div>
                        </Link>
                    }

                    {NavbarLinks.map((link, index) => (
                        <Link to={link.path} onClick={handleClick}>
                            <div key={index} className='text-sky-600 hover:text-sky-300 text-lg font-semibold cursor-pointer px-2'>
                                {link.title}
                            </div>
                        </Link>
                    ))}

                    {/* display login and signup only when user is not logged in  */}
                    {!user ?
                        <div className='flex flex-row gap-x-3'>
                            <button
                                onClick={handleLoginClick}
                                className='border-2 border-sky-500 text-sky-600 px-3 py-2 rounded-md font-medium uppercase
          hover:bg-sky-600 hover:text-white'>
                                Login
                            </button>
                            <button
                                onClick={handleSignupClick}
                                className='border-2 border-sky-500 text-sky-600 px-3 py-2 rounded-md font-medium uppercase
            hover:bg-sky-600 hover:text-white'>
                                Signup
                            </button>
                        </div>
                        :
                        <div>

                            <LogoutButton
                                variant='contained'
                                color="primary"
                                rounded
                                size='small'
                                className={'ml-2'}
                            />
                        </div>
                    }

                </div>
            </div>

        </>
    )
}

export default SmNavbar