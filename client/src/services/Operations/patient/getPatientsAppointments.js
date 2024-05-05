import { apiConnector } from "@/services/apiConnector";
import toast from "react-hot-toast"
import { doctorEndpoints, patientEndpoints } from "@/services/apiEndpoints";

export const getPatientsAppointments = async () => {

    const toastId = toast.loading();
    let response;
    try{
        response = await apiConnector("GET", patientEndpoints.GET_APPOINTMENTS);

        if(!response?.data?.success){
            throw new Error("Something went wrong while fetching appointments");
        }

        console.log("GET PATIENTS APPOINTMENTS API RESPONSE: ", response);

        toast.success("Appointments fetched successfully")

        response = response.data; 

    }
    catch(err){
        response = err
        console.log("GET PATIENTS APPOINTMENTS ERROR: ", err);
        const message = response?.response?.data?.error || "Failed to fetch appointments";
        toast.error(message);
    }
    toast.dismiss(toastId);
    return response;
}

