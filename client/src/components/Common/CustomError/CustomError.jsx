import React from 'react'

export const CustomError = ({message}) => {
  return (
    <div className='flex justify-center items-center h-screen text-[3rem] text-red-500'>
        Error occurred
        {message}
    </div>
  )
}
