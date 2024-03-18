import { apiConnector } from "@/services/apiConnector";
import toast from "react-hot-toast"
import { doctorEndpoints } from "@/services/apiEndpoints";

export const getDoctorDetails = async () => {

    const toastId = toast.loading();
    let res = null;
    try {

        res = await apiConnector("GET", doctorEndpoints.GET_DOCTOR_DETAILS);
        console.log("GET DOCTOR DETAILS RESPONSE: ", res);

        if (!res?.data?.success) {
            throw new Error("Profile creation/updation failed!")
        }

        res = res?.data?.doctor

        toast.success(res?.data?.message);

    } catch(err) {
        res = err;
        const message = err?.response?.data?.error || err?.message;
        toast.error(message);
        console.log("Error in doctor general profile", err);
    }
    toast.dismiss(toastId)
    return res;
}