import React from 'react'

export const CustomError = ({ message }) => {
  return (
    <div className='flex justify-center items-center h-screen text-[1.5rem] text-red-500 gap-2'>
      <span>
        Erorr:
      </span>
      {message}
    </div>
  )
}
