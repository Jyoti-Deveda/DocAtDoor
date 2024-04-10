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
        if (res.doctorsList.length === 0) {
            toast.error("No doctors found for the selected symptoms");
        } 
        else 
            toast.success(res?.data?.message);
        
    } catch (err) {
        console.log("🚀 ~ predictDisease ~ err:", err);
        const message = res?.data?.error || err?.message;
        res = { error: true, message };
        toast.error(message);
    }
    setLoading(false);

    return res;

}