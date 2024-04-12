import { doctorEndpoints } from "@/services/apiEndpoints"
import { apiConnector } from "@/services/apiConnector"

export const getDocById = async (id) => {
    let res = null;
    try {
        res = await apiConnector('GET', `${doctorEndpoints.GET_DOC_BY_ID}${id}`);
        if (!res?.data?.success) {
            throw new Error("Something went wrong, please try agian later")
        }

        res = res?.data;
        console.log("🚀 ~ getDocById ~ res:", res)

    } catch (error) {
        const message = error?.response?.data?.error || error?.message;
        res = { error: true, message };
        console.log("🚀 ~ getDocById ~ error:", error)

    }
    return res;
}