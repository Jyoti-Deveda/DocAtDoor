import React from 'react'
import ImgGrid from './ImgGrid/ImgGrid'
import SectionHeading from '@/components/Headings/SectionHeading/SectionHeading'
import CustomButton from '@/components/CustomButton/CustomButton'

const Hero = () => {

    const handleClick = () => {
        // do something 
    }

    return (
        <div className='w-[100%] bg-gradient-to-l from-sky-200 via-sky-100 to-transparent min-h-max py-8'>
            <div className='w-full flex flex-col items-center'>

                <ImgGrid />

                <div className='flex flex-col items-center gap-2'>
                    <SectionHeading
                        color='primary'
                        title='Get An Appointment'
                        useH1
                    />
                    <p className='text-md text-gray-600 w-[80%] text-center'>
                        Our dedicated team is committed to providing compassionate and personalized care for you and your loved ones.
                        The assistance is a click away
                    </p>
                    <CustomButton
                        variant='contained'
                        color='primary'
                        onClick={handleClick}
                    >
                        Book Appointment
                    </CustomButton>
                </div>
            </div>
        </div>
    )
}

export default Hero