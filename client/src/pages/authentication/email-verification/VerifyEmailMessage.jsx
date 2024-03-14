import { VerificationContainer } from '@/components/Common/VerificationContainer/VerificationContainer'
import CustomButton from '@/components/CustomButton/CustomButton'
import SectionHeading from '@/components/Headings/SectionHeading/SectionHeading'
import { resendVerificationToken } from '@/services/Operations/auth'
import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export const VerifyEmailMessage = () => {

  const navigate = useNavigate();
  const [isTokensent, setIstokensent] = useState(true);
  const [userEmail, setUserEmail] = useState("")

  useEffect(() => {
    const storedData = sessionStorage.getItem("User");
    const parsedData = JSON.parse(storedData);
    console.log("Email: ", parsedData?.email);
    setUserEmail(parsedData?.email)
  }, [userEmail])

  //the email which is being passed here is from the verificationContainer component
  const resendToken = async (email) => {
    if(email){
      setIstokensent(false);
      await resendVerificationToken(email);
      setIstokensent(true);
    }else{
      toast.error("Email is required")
    }
  }



  return (
    <div className='w-full flex justify-center items-center'>
      {
        !isTokensent ? 
        (
          <div className='spinner mx-auto flex justify-center items-center'></div>
        ) : 
        (
          <VerificationContainer
            email={userEmail}
            title='Check email for Verification'
            desc={"A verification email has been sent to the registered email id. Check your mail and get verified."}
            btnText={"Resend"}
            btnHandler={resendToken}
          />
        )
      }
    </div>
  )
}
