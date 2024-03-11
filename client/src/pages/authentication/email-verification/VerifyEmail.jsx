import CustomButton from '@/components/CustomButton/CustomButton'
import SectionHeading from '@/components/Headings/SectionHeading/SectionHeading'
import { Box } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const VerifyEmail = () => {

  const navigate = useNavigate();
  const [isTokensent, setIstokensent] = useState(true);

  const resendToken = () => {

  }



  return (
    <div className='w-[90%] sm:w-[80%] min-h-max h-[350px] sm:h-[250px] flex flex-col justify-center items-center text-center bg-sky-100 mx-auto mt-[2rem] gap-3 rounded-sm px-3 shadow-md '>
      {
        !isTokensent ? 
        (
          <div className='spinner'></div>
        ) :
        (
          <>
            <SectionHeading
              title='Check email for Verification'
            />
            <p className='text-gray-700 text-lg text-balance'>
              A verification email has been sent to the registered email id. Check your mail and get verified.
            </p>
            <div className='w-full flex justify-between justify-self-center items-center px-[10%] sm:px-[18%] mt-4'>
              <CustomButton className={"bg-sky-600 text-neutral-50 font-medium"} 
                onClick={() => navigate("/login")}>
                Login
              </CustomButton>
              <CustomButton className={"bg-sky-600 text-neutral-50 font-medium"}>
                Resend
              </CustomButton>
            </div>
          </>
        )
      }
    </div>
  )
}
