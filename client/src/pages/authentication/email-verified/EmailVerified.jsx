import { VerificationContainer } from '@/components/Common/VerificationContainer/VerificationContainer';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyEmail } from '@/services/Operations/auth';
import { CustomError } from '@/components/Common/CustomError/CustomError';
import toast from 'react-hot-toast';

export const EmailVerified = () => {

  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const token = location.pathname.split('/').at(-1);

  const emailVerification = async() => {
    console.log("Verification token: ", token);
    const res = await verifyEmail(token);
    console.log("RESPONSE in: ", res);

    if(res?.data?.success){
      setVerified(true);
    }
    else{
      // toast.error("Verification failed")
      navigate("/verify-email")
    }
  }

  useEffect(() => {
    
    // setTimeout(emailVerification, 10000);
    emailVerification();

  }, []);

  return (
    <div className='w-full flex justify-center items-center'>
      {
        !verified ? 
        (
          <div className='spinner mx-auto flex justify-center items-center'></div>
        ) : 
        (
          <VerificationContainer
            verified={true}
            title={"Email Verification "}
            desc={"A verification email has been sent to the registered email id. Check your mail and get verified."}
            btnText={"Login"}
            btnHandler={() => {navigate("/login")}}
          />
        )
      }
    </div>
  )
}
