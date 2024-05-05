import { apiConnector } from "@/services/apiConnector";
import { doctorEndpoints } from "@/services/apiEndpoints";
import toast from "react-hot-toast";

export const getDoctorsAppointments = async () => {
    const toastId = toast.loading();
    let response;
    try{

        response = await apiConnector("GET", doctorEndpoints.GET_DOC_APPOINTMENTS);

        if(!response?.data?.success){
            throw new Error("Something went wrong while fetching appointments");
        }

        console.log("GET DOCTORS APPOINTMENTS API RESPONSE: ", response);

        toast.success("Appointments fetched successfully")

        response = response.data;
    
    }
    catch(err){
        response = err
        console.log("GET DOCTORS APPOINTMENTS ERROR: ", err);
        const message = response?.response?.data?.error || "Failed to fetch appointments";
        toast.error(message);
    }

    toast.dismiss(toastId);
    return response;
}