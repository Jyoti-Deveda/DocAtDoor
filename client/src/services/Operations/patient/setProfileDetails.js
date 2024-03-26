import { apiConnector } from "@/services/apiConnector"
import { patientEndpoints } from "@/services/apiEndpoints"
import toast from "react-hot-toast"


export const setProfileDetails = async (data) => {

    if (!data.first_name || !data.last_name || !data.email) {
        toast.error("All fields are required");
        return;
    }

    let res = null;

    const toastId = toast.loading();

    try {
        res = await apiConnector('POST', patientEndpoints.PATIENT_DETAILS, data);
        if (!res?.data?.success) {
            throw new Error("Something went wrong, please try agian later")
        }

        res = res?.data;
        toast.success();

        console.log("🚀 ~ getProfileDetails ~ res:", res)

    } catch (error) {
        const message = error?.response?.data?.error || error?.message;
        res = { error: true, message };
        console.log("🚀 ~ getProfileDetails ~ error:", error)
    }
    toast.dismiss(toastId);
    return res;
}