import { BACKEND_URL } from "@/config/config"

export const authEndpoints = {
    REGISTER_API: `${BACKEND_URL}user/register`,
    GENERATEVERIFICATIONTOKEN_API: `${BACKEND_URL}user/generate-verification-token`,
    VERIFYEMAIL_API: `${BACKEND_URL}user/verify-email`
}