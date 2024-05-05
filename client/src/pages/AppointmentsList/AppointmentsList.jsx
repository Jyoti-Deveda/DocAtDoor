import { AppointmentCard } from '@/components/Common/AppointmentCard/AppointmentCard';
import { CustomError } from '@/components/Common/CustomError/CustomError';
import Loading from '@/components/Common/Loading/Loading';
import { userRoles } from '@/config/config';
import { getDoctorsAppointments } from '@/services/Operations/doctor/getDoctorsAppointments';
import { getPatientsAppointments } from '@/services/Operations/patient/getPatientsAppointments';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const AppointmentsList = () => {

    const [appointmentsList, setAppointmentsList] = useState([]);
    const [userType, setUserType] = useState();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const userData = Cookies.get('UserData');
        // console.log("User data: ", userData);
        
        if (userData) {
            const user = JSON.parse(userData);
            // console.log("User: ", user);
            setUserType(user?.userType);
        }
        // console.log("User type: ", userType);

    }, []);

    const patientsAppointmentsList = async () => {
        const response = await getPatientsAppointments();
        console.log("RESPONSE: ", response);

        if(response?.appointments?.length > 0){
            setAppointmentsList(response?.appointments);
        }
        setLoading(false);

    }

    const doctorsAppointmentsList = async () => {
        const response = await getDoctorsAppointments(); 
        console.log("RESPONSE: ", response);

        if(response?.appointments?.length > 0){
            setAppointmentsList(response?.appointments);
        }
    }

    useEffect(() => {
        setLoading(true);
        if(userType === userRoles.PATIENT){
            patientsAppointmentsList();
        }
        else if(userType === userRoles.DOCTOR){
            doctorsAppointmentsList();
        }
        setLoading(false);


    }, [userType]);

    useEffect(() => {
        console.log("Appointments List: ", appointmentsList);

    }, [appointmentsList]);

    if(!userType){
        return <CustomError message={"User type not found"} />
    }


  return (
    
    <>
        {
            loading ? (
                <Loading/>
            ) : 
            (
                <div className={`flex flex-col`}>
                    
                    <p className={`text-sky-600 font-semibold text-xl mb-4`}>
                    {
                        userType === "Doctor" ? 
                        (<span>Your Appointments </span>)
                        : (<span>Booked Appointments</span>)
                            
                    }
                    </p>
                    <hr className='border border-gray-300 my-3'></hr>

                    <div className={`flex flex-col gap-y-4`}>
                        {
                            appointmentsList?.map((appointment , index) => (
                                <AppointmentCard key={index} data={appointment} userType={userType}/>
                            ))
                        } 
                    </div>       
                </div>
            )
        }
    </>
  )
}
