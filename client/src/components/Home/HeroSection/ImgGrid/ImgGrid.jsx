import React from 'react'
import img1 from '@/assets/Images/doctor.png'
import img2 from '@/assets/Images/nurse.png'
import img3 from '@/assets/Images/examination.png'
import img4 from '@/assets/Images/nutritionist.png'


const ImgGrid = () => {
    return (
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
    )
}

export default ImgGrid