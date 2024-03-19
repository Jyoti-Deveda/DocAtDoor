import { apiConnector } from "@/services/apiConnector";
import toast from "react-hot-toast"
import { doctorEndpoints } from "@/services/apiEndpoints";

//change to specialization constant
import { symptoms } from "@/lib/constant";
import { convertToObjectArray } from "@/util/helpers";

export const getDoctorDetails = async () => {

    const toastId = toast.loading();
    let res = null;
    try {

        res = await apiConnector("GET", doctorEndpoints.GET_DOCTOR_DETAILS);

        if (!res?.data?.success) {
            throw new Error("Profile creation/updation failed!")
        }

        res = res?.data?.doctor

        toast.success(res?.data?.message);

        const newData = { ...res };

        // converting the string array to Object array 
        newData["specialization"] = convertToObjectArray(newData?.specialization, symptoms);
        newData["specializedDiseases"] = convertToObjectArray(newData?.specializedDiseases, symptoms);

        res = newData

        console.log("GET DOCTOR DETAILS RESPONSE: ", newData);


    } catch (err) {
        res = err;
        const message = err?.response?.data?.error || err?.message;
        toast.error(message);
        console.log("Error in doctor general profile", err);
    }
    toast.dismiss(toastId)
    return res;
}