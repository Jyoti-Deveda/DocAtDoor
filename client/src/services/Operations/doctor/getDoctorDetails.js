import { apiConnector } from "@/services/apiConnector";
import toast from "react-hot-toast";
import { doctorEndpoints } from "@/services/apiEndpoints";

//change to specialization constant
import { diseases, specializations, symptoms } from "@/lib/constant";
import { convertToObjectArray } from "@/util/helpers";

export const getDoctorDetails = async () => {
  const toastId = toast.loading();
  let res = null;
  try {
    res = await apiConnector("GET", doctorEndpoints.GET_DOCTOR_DETAILS);
    // console.log("GET DOCTORS DETAILS API RESPONSE: ", res);

    if (!res?.data?.success) {
      throw new Error("Profile creation/updation failed!");
    }

    toast.success(res?.data?.message);
    res = res?.data?.doctor;

    const newData = { ...res };

    // converting the string array to Object array
    newData["specialization"] = convertToObjectArray(newData?.specialization, specializations);
    newData["specializedDiseases"] = convertToObjectArray(newData?.specializedDiseases, diseases);

    res = newData;

    // toast.success();
    // if (res?.data?.new_doctor) {
    //     res = res.data;
    // }
    // else {
    //     res = res?.data?.doctor

    //     const newData = { ...res };

    //     // converting the string array to Object array
    //     newData["specialization"] = convertToObjectArray(newData?.specialization, symptoms);
    //     newData["specializedDiseases"] = convertToObjectArray(newData?.specializedDiseases, symptoms);

    //     res = newData
    // }
  } catch (err) {
    const message = err?.response?.data?.error || err?.message;
    res = { error: true, message };
    toast.error(message);
    console.log("Error in doctor general profile", err);
  }
  toast.dismiss(toastId);
  return res;
};
