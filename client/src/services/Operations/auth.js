import { BACKEND_URL } from "@/config/config";
import { apiConnector } from "../apiConnector";
import { authEndpoints } from "../apiEndpoints";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const { 
    REGISTER_API, 
    RESEND_VERIFICATIONTOKEN_API, 
    VERIFYEMAIL_API,
    LOGIN_API,
    LOGOUT_API
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
        const message = err?.response?.data?.error || err?.message;
        toast.error(message);
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
        const message = err?.response?.data?.error || err?.message;
        toast.error(message);
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
        const message = err?.response?.data?.error || err?.message;
        toast.error(message);
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

        if(!res?.data?.user) {
            throw new Error("User data is missing in login response")
        }

        Cookies.set('UserData', JSON.stringify(res?.data?.user), {expires: 3, path:'/'});
        const userData = Cookies.get('UserData')
        console.log("Userdata from cookie: ", JSON.parse(userData))
        toast.success("Login successfull")
        navigate("/dashboard") 
        
        // return res?.response?.data;
        

    }catch(err){
        res = err;
        console.log("ERROR IN LOGIN API: ", err.message);
        const message = err?.response?.data?.error || err?.message;
        toast.error(message);
    }
    toast.dismiss(toastId);
    // return res;

}


export const logout = async(navigate) => {
    const toastId = toast.loading();
    let res = null;
    try{
        res = await apiConnector("POST", LOGOUT_API);
        console.log("LOGOUT API RESPONSE: ", res);

        if(!res?.data?.success){
            throw new Error("Logout failed");
        }
        Cookies.remove('UserData');
        localStorage.removeItem('UserData')
        toast.success("Logout successfull")
        navigate("/");

    }catch(err){
        res = err;
        console.log("ERROR IN LOGOUT API: ", err);
        const message = err?.response?.data?.error || err?.message;
        toast.error(message);
    }
    toast.dismiss(toastId);
}