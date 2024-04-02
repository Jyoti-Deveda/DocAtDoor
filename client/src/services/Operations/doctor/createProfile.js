import { doctorEndpoints } from "@/services/apiEndpoints";
import { apiConnector } from "@/services/apiConnector";
import toast from "react-hot-toast";
import { objToStringArray } from "@/util/helpers";

export const createGenrealProfile = async (data) => {

    const modifiedData = { ...data };
    let res = null;

    // validation of the modifiedData (data) 
    if (!validateData(modifiedData)) return;

    modifiedData.specialization = objToStringArray(modifiedData.specialization);
    modifiedData.specializedDiseases = objToStringArray(modifiedData.specializedDiseases);

    const formData = new FormData();
    const { academic_details } = modifiedData;
    const certificationFiles = academic_details.map(item => item.certification);

    certificationFiles.forEach((file, index) => {
        formData.append(`certifications[${index}]`, file, file.name);
    });

    formData.append('data', JSON.stringify(modifiedData));

    // request to backend 
    const toastId = toast.loading("Loading..");
    try {
        const res = await apiConnector('POST', doctorEndpoints.CREATE_GENERAL_PROFILE, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log("CREATE GENERAL PROFILE API RESPONSE: ", res);
        if (!res?.data?.success) {
            throw new Error("Profile creation/updation failed!")
        }

        toast.success(res?.data.message);

    } catch (err) {
        res = err;
        const message = err?.response?.data?.error || err?.message;
        toast.error(message);
        console.log("Error in doctor general profile", err);
    }
    toast.dismiss(toastId)
    return res;
}


const validateData = (data) => {
    let res = false;
    const {
        personal_details,
        hospital_details,
        academic_details,
        verification_details,
        specialization,
        specializedDiseases
    } = data;

    // extract modifiedData 
    const {
        first_name, last_name, email, bio, experience
    } = personal_details;
    const {
        name, city, state, postal_code, contact_info, appointment_fee
    } = hospital_details;
    const {
        reg_number, reg_year, state_medical_council
    } = verification_details;

    // ---checks 
    if (!first_name || !last_name || !email || !bio || !experience) {
        toast.error("Please fill the personal details");
        return res;
    }
    if (!name ||
        !city ||
        !state ||
        !postal_code ||
        !contact_info ||
        !appointment_fee ||
        specializedDiseases.length == 0 ||
        specialization.length == 0
    ) {
        toast.error("Please fill the hospital details");
        return res;
    }
    if (academic_details.length == 0 || !academicDetailsCheck(academic_details)) {
        toast.error("Please fill the academic details");
        return res;
    }
    if (!reg_number || !reg_year || !state_medical_council) {
        toast.error("Please fill the verification details");
        return res;
    }
    const reg_date = new Date(reg_year);
    const currentDate = new Date();
    if (reg_date > currentDate) {
        toast.error("Please input the correct registration year");
        return res;
    }

    return true;
}

const academicDetailsCheck = (academic_details) => {
    if (academic_details.length > 0) {
        academic_details.map(item => {
            if (!item.university_name || !item.course || !item.certification) {
                return false;
            }
        })
        return true;
    }
    else {
        return false;
    }
}
