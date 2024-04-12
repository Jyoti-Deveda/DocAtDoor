import { apiConnector } from "@/services/apiConnector";
import { authEndpoints } from "@/services/apiEndpoints";
import toast from 'react-hot-toast'

export const bookAppointment = async (data) => {
    let res = null;
    const toastId = toast.loading();
    try {
        res = await apiConnector('POST', authEndpoints.BOOK_APPOINTMENT, data)
        console.log("🚀 ~ bookAppointment ~ res:", res)
        if (!res.data.success) {
            throw new Error(res.data.message)
        }
        toast.success();
        res = res.data;
    } catch (error) {
        const message = error?.response?.data?.error || error?.message;
        res = { error: true, message };
        toast.error(message);
        console.log("🚀 ~ bookAppointment ~ error:", error)
    }
    toast.dismiss(toastId);
    return res;
}