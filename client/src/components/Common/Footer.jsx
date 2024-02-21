import React from 'react'
import logo from '../../assets/Logo/logo.png'
import { Link } from 'react-router-dom'

export const Footer = () => {
    const diseases = [
        "Pneumonia",
        "Tuberculosis",
        "Asthma",
        "Malaria",
        "Allergies",
        "Strep throat",
        "Depression"
    ]

    const treatments = [
        "Cardiologist",
        "Dermatologist",
        "Neurologist",
        "Gastroenterologist",
        "Hematology",
    ]
  return (
    <div className='w-full min-h-[250px]  bg-gradient-to-r from-sky-600 via-sky-700 to-sky-800 py-5 flex flex-col p-5'>
        <div className='w-full flex flex-row items-start '>
            <div className='lg:w-[50%]  flex flex-row items-start  gap-10'>
                <Link to={"/"}>
                    <div className='flex items-center text-sky-100 text-2xl font-medium'>
                        <img
                            src={logo}
                            alt='logo'
                            className='w-[50px]'
                        />
                            DocAtDoor
                    </div>
                </Link>

                <div className='flex flex-col text-sky-100'>
                    <h2 className='text-2xl text-sky-100 font-medium'>Diseases</h2>
                    <ul>
                        {
                            diseases.map((disease, index) => (
                                <li key={index} className='hover:text-sky-200'>
                                    {disease}
                                </li>
                            ))
                        }
                    </ul>
                </div>

                <div className='flex flex-col text-sky-100'>
                    <h2 className='text-2xl font-medium'>Treatments</h2>
                    <ul>
                        {
                            treatments.map((treatment, index) => (
                                <li key={index} className='hover:text-sky-200'>
                                    {treatment}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            <div>

            </div>
        </div>
    <div className='text-sky-100 flex self-end'>
        Made with ❤️ | Hackathon © 2023
    </div>
    </div>
  )
}
