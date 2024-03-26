import { apiConnector } from "@/services/apiConnector"
import { patientEndpoints } from "@/services/apiEndpoints"
import toast from "react-hot-toast"


export const getProfileDetails = async () => {
    let res = null;
    const toastId = toast.loading();
    try {
        res = await apiConnector('GET', patientEndpoints.GET_PATIENT_DETAILS);
        if (!res?.data?.success) {
            throw new Error("Something went wrong, please try agian later")
        }

        res = res?.data;
        toast.success();

        // console.log("🚀 ~ getProfileDetails ~ res:", res)

    } catch (error) {
        const message = error?.response?.data?.error || error?.message;
        res = { error: true, message };
        console.log("🚀 ~ getProfileDetails ~ error:", error)
    }
    toast.dismiss(toastId);
    return res;
}