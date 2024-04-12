import { apiConnector } from "@/services/apiConnector"
import { patientEndpoints } from "@/services/apiEndpoints"
import toast from "react-hot-toast"


export const getListFromDiseases = async (diseases) => {
    let res = null;
    const toastId = toast.loading();
    console.log("Diseases in get doc list: ", diseases)
    try {
        res = await apiConnector('POST', patientEndpoints.GET_DOC_LIST, { diseases: diseases });

        console.log("GET LIST OF DOCTORS API RESPONSE: ", res);

        if (!res?.data?.success) {
            throw new Error("Something went wrong, please try agian later")
        }

        res = res?.data;
        toast.success();

        console.log("🚀 ~ getListFromDiseases ~ res:", res)

    } catch (error) {
        const message = error?.response?.data?.error || error?.message;
        res = { error: true, message };
        console.log("🚀 ~ getListFromDiseases ~ error:", error)
    }
    toast.dismiss(toastId);
    return res;
}