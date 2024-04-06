import { patientEndpoints } from "@/services/apiEndpoints";
import { apiConnector } from "@/services/apiConnector";
import toast from "react-hot-toast";
import { objToStringArray } from "@/util/helpers";

export const predictDisease = async (data, setLoading) => {

    if (data.length === 0) {
        toast.error('Please select symptoms to predict disease');
        return;
    }

    const convertedData = objToStringArray(data);
    let res = null;
    try {
        setLoading(true);
        res = await apiConnector('POST', patientEndpoints.PREDICT_DISEASE, convertedData);
        console.log("PREDICT DISEASE API RESPONSE: ", res);

        if (!res?.data?.success) {
            throw new Error(res?.data?.message)
        }
        res = res?.data;
        setLoading(false);
        toast.success(res?.data?.message);
    } catch (err) {
        setLoading(false);
        const message = err?.response?.data?.error || err?.message;
        res = { error: true, message };
        toast.error(message);
        console.log("🚀 ~ predictDisease ~ err:", err);
    }

    return res;

}