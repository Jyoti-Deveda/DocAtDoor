import { apiConnector } from "@/services/apiConnector";
import toast from "react-hot-toast"
import { doctorEndpoints } from "@/services/apiEndpoints";


export const getSchedule = async () => {

    let res = null;
    try {

        res = await apiConnector("GET", doctorEndpoints.GET_SCHEDULED_DAYS);



        if (!res?.data?.success) {
            throw new Error("Seomthing went wrong while fetching data.")
        }
        res = res.data;
        // console.log("🚀 ~ getSchedule ~ res:", res)
    } catch (err) {
        const message = err?.response?.data?.error || err?.message;
        res = { error: true, message };
        console.log("🚀 ~ getSchedule ~ err:", err)
    }
    return res;
}