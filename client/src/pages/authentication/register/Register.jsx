import React from 'react'
import RegistrationForm from './Form/RegistrationForm'
import { RequestVerification } from '@/components/Common/requestVerification/RequestVerification'

const Register = () => {
    return (
        // <div className={`flex justify-center items-center w-full bg-gradient-to-l from-sky-200 via-sky-100 to-transparent min-h-screen p-4`}>
        <div className={`flex flex-col justify-center items-center w-full bg-gradient-to-r from-sky-200 to-sky-100 min-h-screen p-4 gap-3`}>
            <div className={`flex flex-col sm:flex-row min-w-[90%] sm:min-w-[80%] gap-2 items-center justify-between bg-white rounded shadow-lg p-8`}>
                <div>
                    text content here
                </div>
                <RegistrationForm />
            </div>
            <RequestVerification customClasses= {"min-w-[90%] sm:min-w-[80%] px-8"}/>
        </div>
    )
}

export default Register