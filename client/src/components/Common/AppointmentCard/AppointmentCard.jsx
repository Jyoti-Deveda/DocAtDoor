import React, { useEffect, useState } from 'react'
import logo from '../../../assets/Logo/logo.png'
import ReactStars from 'react-rating-stars-component';
import { FaStar } from 'react-icons/fa';
import CustomButton from '@/components/CustomButton/CustomButton';
import { experienceYears } from '@/lib/constant';
import { markAppointmentAttended } from '@/services/Operations/doctor/markAppointmentAttended';

export const AppointmentCard = ({data, userType}) => {

  const [user, setUser] = useState(userType);
  const [appointmentData, setAppointmentData] = useState(data);

  useEffect(() => {

    console.log("User type: ", userType )
    setUser(userType)
    
  }, [userType])

  const markAppointmentAsDone = async () => {
    const response = await markAppointmentAttended(data?._id);
    if(response?.data?.success){
      setAppointmentData(prev => {
        return {...prev, attended: true}
      })
    }
  }


  return (
    <div className={'md:w-[70%] flex flex-col shadow-lg rounded-md p-4 gap-1'}>
        <div className='flex justify-between items-center gap-y-2'>
          
          <div className={'flex items-center gap-x-2'}>
            {
              user === "Patient" ?
              (
                <>
                  <img src={appointmentData?.doctor?.image} className={`aspect-square rounded-full w-[40px]`}/>
                  <div className='flex flex-col'>
                    <p className='text-lg text-gray-700 font-semibold'>{appointmentData?.doctor?.personalDetails?.firstName} {appointmentData?.doctor?.personalDetails?.lastName}</p>
                    <p className='text-sm text-gray-600'>
                    {
                      experienceYears.find(exp => {
                        return exp.value === appointmentData?.doctor?.doctorsProfile?.experience;
                      })?.label 
                    } 
                      <span>  of experience</span>
                    </p>
                  </div>
                </>
              )
              :
              (
                <>
                <img src={appointmentData?.patient?.image} className={`aspect-square rounded-full w-[40px]`}/>
                <div className='flex flex-col -space-y-1'>
                  <p className='text-xs text-gray-600'>Patient name </p>
                  <p className='text-lg text-gray-700 font-semibold'>{appointmentData?.patient?.personalDetails?.firstName} {appointmentData?.patient?.personalDetails?.lastName}</p>
                </div>
              </>
              )
            }
          </div>
        
          <CustomButton 
          variant='contained' 
          color='primary'
          disabled={user === "Patient" || appointmentData?.attended }
          onClick={user === "Doctor" && markAppointmentAsDone}
          >
            {
              appointmentData.attended === true ? "Attended" : (user === "Doctor" ? "Mark Attended" : "Unattended")  
            }
          </CustomButton>  
          
          
        </div>

        {
          user === "Patient" && 
          <div className={`mt-2 flex gap-1 items-center`}>
          <ReactStars
              count={5}
              value={appointmentData?.doctor?.doctorsProfile?.rating?.value}
              size={30}
              activeColor="#ffd700"
              edit={false}
              emptyIcon={<FaStar />}
              fullIcon={<FaStar />}
          />
          <p className={`text-sm text-gray-500`}>
              {appointmentData?.doctor?.doctorsProfile?.rating?.value}
          </p>
        </div>
        }

        <p className='text-sm text-gray-500'>
          <span className='font-semibold'>Predicted diseases</span> include 
          {
            appointmentData?.diseaseNames?.map((disease, index) => (
              <span key={index}> {disease},</span>
            ))
          }
        </p>

        <div className='flex flex-col gap-x-2'>
          <p className='text-sm text-gray-500'>
            <span className='font-semibold'>Appointment Date: </span> 
            {
              appointmentData?.scheduledDay?.date && 
              new Date(appointmentData?.scheduledDay?.date).toLocaleDateString('en-GB')
            }
          </p>
          <p className='text-sm text-gray-500'>
            <span className='font-semibold'>Time slot: </span> 
            {appointmentData?.timeslot?.start_time}-{appointmentData?.timeslot?.end_time}
          </p>
        </div>

  
    </div>
  )
}


