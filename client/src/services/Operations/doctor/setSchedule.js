import { doctorEndpoints } from "@/services/apiEndpoints";
import { apiConnector } from "@/services/apiConnector";
import toast from "react-hot-toast";
import { objToStringArray } from "@/util/helpers";

export const setSchedule = async (data) => {

    let res = null;
    const toastId = toast.loading("Loading..");

    try {
        // request to backend 
        const res = await apiConnector('POST', doctorEndpoints.SET_SCHEDULED_DAYS, data);

        if (!res?.data?.success) {
            throw new Error("An Error occured, please try again later.");
        }

        toast.success(res?.data.message);

    } catch (err) {
        const message = err?.response?.data?.error || err?.message;
        res = { error: true, message };
        toast.error(message);
        console.log("🚀 ~ setSchedule ~ err:", err)

    }
    toast.dismiss(toastId)
    return res;
}