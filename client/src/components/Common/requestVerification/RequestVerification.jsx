import { resendVerificationToken } from '@/services/Operations/auth';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const RequestVerification = ({customClasses}) => {

    const [isTokensent, setIstokensent] = useState(true);
    const navigate = useNavigate();

    // const resendToken = async () => {
    //     setIstokensent(false);
    //     await resendVerificationToken();
    //     setIstokensent(true);
    // }

  return (
    <div className={`bg-slate-100 bg-opacity-45 text-gray-900 border border-neutral-500 border-opacity-60 rounded-full text-sm sm:text-base text-center ${customClasses} py-2`}>
        <p className=''>
          Registered already click <button className=' text-sky-700 cursor-pointer hover:underline' 
          onClick={() => navigate('/verify-email')} disabled={true ? !isTokensent : false}> here </button> to verify
        </p>
    </div>
  )
}
