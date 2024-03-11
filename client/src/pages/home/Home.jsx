import React, { useState } from 'react'
import Style from "./Home.module.css";
import img5 from '../../assets/Images/medical-checkup.png'
import img6 from '../../assets/Images/hospital.png'
import { ReviewSlider } from '../../components/Common/ReviewSlider'
import { Footer } from '../../components/Common/Footer'
import ImgGrid from '@/components/Home/HeroSection/ImgGrid/ImgGrid';
import SectionHeading from '@/components/Headings/SectionHeading/SectionHeading';
import Hero from '@/components/Home/HeroSection/Hero';
import QuoteBox from '@/components/Home/QuoteSection/QuoteBox';

export const Home = () => {

  return (
    <div className='w-full flex flex-col'>

      <Hero />

      <QuoteBox />

      {/* third section  */}
      <div className='bg-gradient-to-r from-sky-200 via-sky-100 to-transparent min-h-max py-8 
      flex flex-col justify-center items-center gap-10 pt-[5rem]'>
        <SectionHeading
          title='What we Offer?'
        />
        <div className='lg:w-9/12 sm:w-[90%] mx-auto flex flex-col items-center gap-[5rem]'>
          {/* for Doctors */}
          <div className='w-[90%] sm-w-auto flex lg:flex-row flex-col-reverse  items-center  px-5 py-3 rounded-lg border-r-[5px]  border-sky-600 gap-8 w-[80%] shadow-md'>
            <p className='text-[1rem] text-gray-600'>
              <span className='text-3xl text-sky-600 font-medium'>If You are a healthcare Professional... </span><br />
              Our website offers a comprehensive platform for doctors like you to efficiently manage and grow your patient base. With our user-friendly interface, you can easily set up your profile, list your services, and manage appointments, all in one place.
            </p>
            <img
              src={img5}
              alt='healthcare professional'
              className='w-[200px]'
            />
          </div>

          {/* for patients  */}
          <div className='w-[90%] sm-w-auto flex lg:flex-row flex-col items-center  px-5 py-3 rounded-lg border-l-[5px] border-sky-600 gap-8 w-[80%] shadow-md'>
            <img
              src={img6}
              alt='healthcare professional'
              className='w-[200px]'
            />
            <p className='text-[1rem] text-gray-600'>
              <span className='text-3xl text-sky-600 font-medium'>If You are seeking a medical advice... </span><br />
              Our platform simplifies the appointment booking process, allowing you to schedule consultations and treatments at your convenience. You can explore doctor profiles, read patient reviews, and access valuable healthcare resources, all in one place.
            </p>

          </div>
        </div>
      </div>

      {/* fourth section --> reviews  */}
      <div className='bg-gradient-to-l from-sky-200 via-sky-100 to-transparent min-h-max py-8 flex flex-col justify-center gap-10'>
        <SectionHeading
          title='Reviews from Our Patients'
          className={'text-center'}
        />

        <div className='w-10/12 mx-auto mb-[8rem]'>
          <ReviewSlider />
        </div>
      </div>
    </div >
  )
}
