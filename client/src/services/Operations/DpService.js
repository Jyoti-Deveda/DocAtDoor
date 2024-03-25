import { authEndpoints } from "@/services/apiEndpoints";
import { apiConnector } from "@/services/apiConnector";
import toast from "react-hot-toast";


// update profile picture 
export const changeDp = async (data) => {

    let res = null;

    const toastId = toast.loading();

    try {
        const formData = new FormData();
        formData.append('file', data?.file);

        res = await apiConnector('POST', authEndpoints.UPDATE_PROFILE_IMAGE, formData);

        if (res?.data?.success) {
            toast.success(res?.data?.message)
            toast.dismiss(toastId);
            return res?.data;
        }
        else {
            toast.error("An erorr occured");
        }

    } catch (error) {
        toast.error("Something went wrong");
        console.log("🚀 ~ changeDp ~ error:", error)
    }
    toast.dismiss(toastId)
    return res;
}

//get profile picture
export const getProfilePicture = async () => {
    let res = null;
    try {
        res = await apiConnector('GET', authEndpoints.GET_PROFILE_IMAGE);

        if (res?.data?.success) {
            return res.data;
        }

    } catch (error) {
        console.log(error);
    }

    return res;

}