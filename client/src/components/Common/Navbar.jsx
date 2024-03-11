import React, { useState } from 'react'
import { useNavigate, Link } from "react-router-dom"
import logo from '../../assets/Logo/logo.png'
import Style from "./navbar.module.css";
import CustomButton from '../CustomButton/CustomButton';
import MenuIcon from '@mui/icons-material/Menu';
import SmNavbar from './smNavbar/SmNavbar';

export const Navbar = () => {

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const NavbarLinks = [
    {
      title: "Doctors",
      path: '/ḍoctors',
    },
    {
      title: "About Us",
      path: "/about",
    },
    {
      title: "Contact Us",
      path: "/contact",
    },
  ];


  const handleLoginClick = () => {
    navigate('login')
  }
  const handleSignupClick = () => {
    navigate('register')
  }



  return (
    <div className='w-full h-auto py-2 sm:py-0 sm:h-[100px] shadow-md flex flex-row justify-between items-center px-2 sm:px-4'>
      <div className='flex flex-row'>

        <Link to={"/"} className='flex flex-row items-center'>
          <img src={logo}
            alt='Logo'
            className='w-[40px] sm:w-[100px]'
          />
          <span className='text-xl sm:text-3xl text-sky-600 font-bold'>DocAtDoor</span>
        </Link>
      </div>

      <div className={`${Style.lg_nav_link_container} flex flex-row items-center gap-4`}>
        <div>
          <nav>
            <ul className='flex flex-row gap-x-6'>
              {
                NavbarLinks.map((link, index) => (
                  <li key={index} className='text-sky-600 text-lg font-semibold cursor-pointer'>
                    <Link to={link.path}>
                      {link.title}
                    </Link>
                  </li>
                ))
              }
            </ul>
          </nav>
        </div>

        {/* display login and signup when user is not logged in  */}
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
      </div>

      <div className={`${Style.sm_menu_btn}`}>
        <CustomButton
          iconButton
          boxShadow={false}
          variant='text-primary'
          color='primary'
          onClick={() => setShow(!show)}
        >
          <MenuIcon />
        </CustomButton>
      </div>
      <SmNavbar
        NavbarLinks={NavbarLinks}
        show={show}
        onClose={() => setShow(false)}
        handleLoginClick={handleLoginClick}
        handleSignupClick={handleSignupClick}
      />

    </div>
  )
}
