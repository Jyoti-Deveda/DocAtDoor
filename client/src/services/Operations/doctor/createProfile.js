import { doctorEndpoints } from "@/services/apiEndpoints";
import { apiConnector } from "@/services/apiConnector";
import toast from "react-hot-toast";

export const createGenrealProfile = async (data) => {

    console.log(data)

    const {
        personal_details,
        hospital_details,
        academic_details,
        verification_details,
        specialization,
        specializedDiseases
    } = data;

    // extract data 
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
        return null;
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
        return null;
    }
    if (academic_details.length == 0 || !academicDetailsCheck(academic_details)) {
        toast.error("Please fill the academic details");
        return null;
    }
    if (!reg_number || !reg_year || !state_medical_council) {
        toast.error("Please fill the verification details");
        return null;
    }


    // request to backend 

    try {
        const res = await apiConnector('POST', doctorEndpoints.CREATE_GENERAL_PROFILE, data);

    } catch (error) {
        console.log(error);
    }




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