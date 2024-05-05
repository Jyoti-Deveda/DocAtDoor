import { apiConnector } from '@/services/apiConnector';
import { doctorEndpoints } from '@/services/apiEndpoints';
import React from 'react'
import toast from 'react-hot-toast'

export const markAppointmentAttended = async (id) => {
  
    const toastId = toast.loading();
    let response;
    try{

        response = await apiConnector("POST", `${doctorEndpoints.MARK_APPOINTMENT_ATTENDED}/${id}`);

        if(!response?.data?.success) {
            throw new Error("Failed to mark appointment as attended");
        }

        console.log("MARK APPOINTMENT AS ATTEDNDED API RESPONSE: ", response);
        toast.success(response?.data?.message);


    }
    catch(err){
        console.log("MARK APPOINTMENT AS ATTENDED ERROR: ", err);
        toast.error(err?.response?.data?.error || "Failed to mark appointment as attended");
    }
    toast.dismiss(toastId);
    return response;

}
