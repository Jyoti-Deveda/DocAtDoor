import CustomButton from '@/components/CustomButton/CustomButton'
import SectionHeading from '@/components/Headings/SectionHeading/SectionHeading'
import StyledInput from '@/components/inputs/StyledInput/StyledInput'
import React, { useEffect, useState } from 'react'

export const VerificationContainer = ({verified=false, title="", desc, btnText, btnHandler, email}) => {

    const [userEmail, setUserEmail] = useState(email);

    useEffect(() => {
        setUserEmail(email)
    }, [email])
    console.log("EMail: ", userEmail)

  return (
    <div className='w-[90%] sm:w-[80%] min-h-fit h-[400px] sm:h-[300px] flex flex-col justify-center items-center text-center bg-sky-100 mx-auto gap-3 rounded-sm px-3 shadow-md '>
        <SectionHeading title={title}>
            {verified && <p className='text-green-600'>Successfull</p>}
        </SectionHeading>

        {/* when user is verified a simple success message is rendered but when user requests for a verification email, an input field for email is present */}
        {
            !verified &&
            <StyledInput
                label='Email'
                value={userEmail}
                type='email'
                onChange={e => setUserEmail(e.target.value)}
                name='email'
                size="small"
                className='w-[90%] sm:w-[80%]'
            />
        }

        <p className='w-[90%] sm:w-[80%] text-gray-700  text-lg sm:text-[1.2rem]'>
            {desc}
        </p>

        <CustomButton onClick={() => btnHandler(userEmail)}  className={`${verified ? "bg-green-600" : "bg-sky-600"} text-neutral-50 font-medium px-3 py-2 mt-[1rem]`}>
            {btnText}
        </CustomButton>

    </div>
  )
}
