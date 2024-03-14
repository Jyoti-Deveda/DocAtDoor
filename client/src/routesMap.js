import Login from "./pages/authentication/login/Login"
import Register from "./pages/authentication/register/Register"
import DoctorSettings from "./pages/doctor/settings/Settings";
import { Home } from "./pages/home/Home"
import Dashboard from "./pages/patient/dashboard/Dashboard"
import DocSearch from "./pages/patient/docSearch/DocSearch"
import { VerifyEmailMessage } from "./pages/authentication/email-verification/VerifyEmailMessage"
import { EmailVerified } from "./pages/authentication/email-verified/EmailVerified";
import { CustomError } from "./components/Common/CustomError/CustomError";

export const routesMap = {
    '/': {
        protected: false,
        label: 'Home',
        path: '/',
        component: Home
    },
    //a component that simply asks user to check mail for email verification
    // '/verify-email': {
    //     // protected: true,
    //     label: 'Verify-email',
    //     path: '/verify-email',
    //     component: VerifyEmailMessage
    // },
    //the route to be reached when email is verified successfully
    '/email-verified/:token': {
        protected: true,
        label: 'Email-verified',
        path: '/email-verified/:token',
        component: EmailVerified
    },
    // '/login': {
    //     protected: false,
    //     label: 'Login',
    //     path: '/login',
    //     component: Login
    // },
    // '/register': {
    //     protected: false,
    //     label: 'Register',
    //     path: '/register',
    //     component: Register
    // },
    '/error': {
        protected: false,
        label: 'Error',
        path: '/error',
        component: CustomError
    }
}

export const protectedRoutesMap = {
    // routes for patient 
    '/dashboard': {
        protected: true,
        label: 'Dashboard',
        path: '/dashboard',
        component: Dashboard
    },
    '/search-doctor': {
        protected: true,
        label: 'Search Doctor',
        path: '/search-doctor',
        component: DocSearch
    },
    '/doc-list/:disease': {
        protected: true,
        label: 'Doctor List',
        path: '/doc-list/:disease',
        component: Home
    },
    '/settings': {
        protected: true,
        label: 'Settings',
        path: '/settings',
        component: Home
    },

    // route for doctor 
    '/doctor/settings': {
        protected: true,
        label: 'Settings',
        path: '/doctor/settings',
        component: DoctorSettings
    },
}