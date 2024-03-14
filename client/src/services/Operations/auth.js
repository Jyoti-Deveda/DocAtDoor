import { BACKEND_URL } from "@/config/config";
import { apiConnector } from "../apiConnector";
import { authEndpoints } from "../apiEndpoints";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const { 
    REGISTER_API, 
    RESEND_VERIFICATIONTOKEN_API, 
    VERIFYEMAIL_API,
    LOGIN_API
 } = authEndpoints

export const register = async(data, navigate) => {
    const toastId = toast.loading();
    let res = null;
    try{

        res = await apiConnector("POST", REGISTER_API, data);

        console.log("REGISTER API RESPONSE: ", res);

        if(!res?.data?.success){
            throw new Error("Registration failed")
        }

        toast.success("Signup successfull")
        sessionStorage.setItem("User", JSON.stringify(data));
        navigate("/verify-email") 

        // return res?.response?.data;
        

    }catch(err){
        res = err;
        console.log("ERROR IN REGISTER API: ", err);
        toast.error(err?.response?.data?.error);
    }
    toast.dismiss(toastId);
    return res;
}

export const resendVerificationToken = async(email) => {

    
    const toastId = toast.loading();
    let res = null;
    try{
        if(!email){
            throw new Error("Email is required");
        }
        res = await apiConnector("POST", RESEND_VERIFICATIONTOKEN_API, {email: email});
        console.log("RESENT VERIFICATION TOKEN API RESPONSE: ", res);

        if(!res?.data?.success){
            throw new Error("Verification token resend failed")
        }

        toast.success("Resend successfull")
        //todo: remove or let it stay
        // sessionStorage.removeItem("User");

    }catch(err){
        res = err;
        console.log("ERROR IN RESEND API: ", err);
        toast.error(err?.response?.data?.error);
    }
    toast.dismiss(toastId);
    return res;

}


export const verifyEmail = async(token) => {

    const toastId = toast.loading();
    if(!token){
        throw new Error("Email and token are required for veryfing email")
    }
    let res = null;
    try{

        res = await apiConnector("POST", VERIFYEMAIL_API, {token});
        console.log("EMAIL VERIFICATION API RESPONSE: ", res);

        if(!res?.data?.success){
            throw new Error("Token verification failed")
        }

        toast.success("Verification successfull")
        //todo: remove or let it stay
        // sessionStorage.removeItem("User");

    }catch(err){
        res = err;
        console.log("ERROR IN TOKEN VERIFICATION API: ", err);
        toast.error(err?.response?.data?.error);
    }
    toast.dismiss(toastId);
    console.log("reached end")
    return res;

}
 


export const login = async (data, navigate) => {
    
    const toastId = toast.loading();
    let res = null;
    try{

        res = await apiConnector("POST", LOGIN_API, data);

        console.log("LOGIN API RESPONSE: ", res);

        if(!res?.data?.success){
            throw new Error("Registration failed")
        }

        toast.success("Login successfull")
        // localStorage.setItem("authToken", res.data.authToken);
        Cookies.set('authToken', res.data.authToken, {expires: 3, path:'/'});
        navigate("/dashboard") 

        // return res?.response?.data;
        

    }catch(err){
        res = err;
        console.log("ERROR IN LOGIN API: ", err);
        toast.error(err?.response?.data?.error);
    }
    toast.dismiss(toastId);
    return res;

}
