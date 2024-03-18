import { BACKEND_URL } from "@/config/config"

export const authEndpoints = {
    REGISTER_API: `${BACKEND_URL}user/register`,
    LOGIN_API: `${BACKEND_URL}user/login`,
    RESEND_VERIFICATIONTOKEN_API: `${BACKEND_URL}user/generate-verification-token`,
    VERIFYEMAIL_API: `${BACKEND_URL}user/verify-email`,
    LOGOUT_API: `${BACKEND_URL}user/logout`,
    CHANGE_PASSWORD_API: `${BACKEND_URL}user/change-password`
}


export const doctorEndpoints = {
    CREATE_GENERAL_PROFILE: `${BACKEND_URL}doctor/create-general-profile`,
    GET_DOCTOR_DETAILS: `${BACKEND_URL}doctor/get-doctor-details`
}