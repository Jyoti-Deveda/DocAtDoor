import React, { useState } from 'react'
import Style from "./Home.module.css";
import CustomButton from '@/components/CustomButton/CustomButton';
import StyledInput from '@/components/inputs/StyledInput/StyledInput';
import Layout from '@/components/layout/Layout';
import img1 from '../../assets/Images/doctor.png'
import img2 from '../../assets/Images/nurse.png'
import img3 from '../../assets/Images/examination.png'
import img4 from '../../assets/Images/nutritionist.png'
import img5 from '../../assets/Images/medical-checkup.png'
import img6 from '../../assets/Images/hospital.png'
import { ReviewSlider } from '../../components/Common/ReviewSlider'
import { Footer } from '../../components/Common/Footer'

export const Home = () => {

  return (
    <div className='w-full flex flex-col'>
      {/* first section  */}
      <div className='w-[100%] bg-gradient-to-l from-sky-200 via-sky-100 to-transparent min-h-max py-8'>
          <div className='w-full flex flex-col items-center'>
            
            {/* image section  */}
            <div className='lg:w-[400px] w-[350px]  grid grid-cols-2 justify-center content-center mx-auto m-3'>

              <div className='flex justify-center items-center border-r-2 border-b-2 border-sky-600 border-dashed aspect-square p-0'>
                <img
                  src={img1}
                  alt='doctor'
                  className='w-[200px]'
                />
              </div>
              <div className='flex justify-center items-center border-b-2 border-sky-600 border-dashed aspect-square'>
                <img
                  src={img2}
                  alt='doctor'
                  className='w-[10rem] aspect-square'
                />
              </div>
              <div className='flex justify-center items-center border-r-2 border-sky-600 border-dashed aspect-square'>
                <img
                  src={img3}
                  alt='doctor'
                  className='w-[10rem] aspect-square'
                />
              </div>
              <div className='flex justify-center items-center aspect-square'>
                <img
                  src={img4}
                  alt='doctor'
                  className='w-[10rem] aspect-square'
                />
              </div>
            </div>

            <div className='flex flex-col items-center gap-2'>
              <h1 className='text-sky-600 font-bold text-4xl'>
                Get An Appointment
              </h1>
              <p className='text-md text-gray-600 w-[80%] text-center'>
                Our dedicated team is committed to providing compassionate and personalized care for you and your loved ones.
                The assistance is a click away
              </p>
              <button type='button' className='uppercase bg-sky-600 text-white px-3 py-2 rounded-md font-medium hover:bg-sky-700 shadow-md hover:text-yellow-50'>
                Book Appointment
              </button>
            </div>
          </div>
      </div>

      {/*second section --> quote */}
      <div className='bg-sky-600 lg:h-[200px] min-h-max lg:text-4xl text-3xl text-center flex items-center justify-center  py-8 px-2'>
        <p className='w-[90%] text-sky-100 font-medium leading-normal'>
          Your <span className='text-pink-700'> health </span> 
          and <span className='text-pink-700'> well-being </span> 
          are our <span className='text-yellow-400'> top priorities </span>, 
           and we're here to <span className='text-yellow-400'>support</span> you on your  <span className='text-pink-700'>healthcare journey</span>
        </p>
      </div>

      {/* third section  */}
      <div className='bg-gradient-to-r from-sky-200 via-sky-100 to-transparent min-h-max py-8 
      flex flex-col justify-center items-center gap-10 pt-[5rem]'>
          <h2 className='text-[3rem] text-gray-600 font-medium'>
            What we Offer?
          </h2>
          <div className='lg:w-9/12 w-[90%] mx-auto flex flex-col items-center gap-[5rem]'>
          {/* for Doctors */}
            <div className='flex lg:flex-row flex-col-reverse  items-center  px-5 py-3 rounded-lg border-r-[5px]  border-sky-600 gap-8 w-[80%] shadow-md'>
              <p className='text-[1rem] text-gray-600'>
                <span className='text-3xl text-sky-600 font-medium'>If You are a healthcare Professional... </span><br/>
                Our website offers a comprehensive platform for doctors like you to efficiently manage and grow your patient base. With our user-friendly interface, you can easily set up your profile, list your services, and manage appointments, all in one place. 
              </p>
              <img
                src={img5}
                alt='healthcare professional'
                className='w-[200px]'
              />
            </div>

            {/* for patients  */}
            <div className='flex lg:flex-row flex-col items-center  px-5 py-3 rounded-lg border-l-[5px] border-sky-600 gap-8 w-[80%] shadow-md'>
              <img
                src={img6}
                alt='healthcare professional'
                className='w-[200px]'
              />
              <p className='text-[1rem] text-gray-600'>
                <span className='text-3xl text-sky-600 font-medium'>If You are seeking a medical advice... </span><br/>
                Our platform simplifies the appointment booking process, allowing you to schedule consultations and treatments at your convenience. You can explore doctor profiles, read patient reviews, and access valuable healthcare resources, all in one place. 
              </p>
              
            </div>
          </div>
      </div>

      {/* fourth section --> reviews  */}
      <div className='bg-gradient-to-l from-sky-200 via-sky-100 to-transparent min-h-max py-8 flex flex-col justify-center gap-10'>
        <h3 className='lg:text-[3rem] text-[2.3rem] text-gray-600 font-medium text-center'>
          Reviews from Our Patients
        </h3>

        <div className='w-10/12 mx-auto mb-[8rem]'>
        <ReviewSlider/>
        </div>
      </div>

      {/* fifth section  */}
      <Footer/>
    </div>
  )
}
