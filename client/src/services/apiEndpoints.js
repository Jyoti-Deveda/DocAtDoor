import { BACKEND_URL } from "@/config/config"

export const authEndpoints = {
    REGISTER_API: `${BACKEND_URL}user/register`,
    LOGIN_API: `${BACKEND_URL}user/login`,
    RESEND_VERIFICATIONTOKEN_API: `${BACKEND_URL}user/generate-verification-token`,
    VERIFYEMAIL_API: `${BACKEND_URL}user/verify-email`,
    LOGOUT_API: `${BACKEND_URL}user/logout`,
    CHANGE_PASSWORD_API: `${BACKEND_URL}user/change-password`,
    UPDATE_PROFILE_IMAGE: `${BACKEND_URL}user/update-profile-image`,
    GET_PROFILE_IMAGE: `${BACKEND_URL}user/get-profile-image`,
    BOOK_APPOINTMENT: `${BACKEND_URL}user/book-appointment`,
}


export const doctorEndpoints = {
    CREATE_GENERAL_PROFILE: `${BACKEND_URL}doctor/create-general-profile`,
    GET_DOCTOR_DETAILS: `${BACKEND_URL}doctor/get-doctor-details`,
    GET_SCHEDULED_DAYS: `${BACKEND_URL}doctor/get-scheduled-days`,
    SET_SCHEDULED_DAYS: `${BACKEND_URL}doctor/set-scheduled-days`,
    GET_DOC_BY_ID: `${BACKEND_URL}doctor/get-doctors-info/`,
    GET_DOC_APPOINTMENTS: `${BACKEND_URL}doctor/doctors-appointments`,
    MARK_APPOINTMENT_ATTENDED: `${BACKEND_URL}doctor/mark-appointment-attended`,
}


export const patientEndpoints = {
    PATIENT_DETAILS: `${BACKEND_URL}patient/details`,
    PREDICT_DISEASE: `${BACKEND_URL}patient/get-disease-doctor`,
    GET_DOC_LIST: `${BACKEND_URL}patient/get-doc-list`,
    GET_APPOINTMENTS: `${BACKEND_URL}patient/patients-appointments`
}