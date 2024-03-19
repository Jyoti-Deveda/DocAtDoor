import Login from "./pages/authentication/login/Login"
import Register from "./pages/authentication/register/Register"
import DoctorSettings from "./pages/doctor/settings/Settings";
import { Home } from "./pages/home/Home"
import Dashboard from "./pages/patient/dashboard/Dashboard"
import DocSearch from "./pages/patient/docSearch/DocSearch"
import { VerifyEmailMessage } from "./pages/authentication/email-verification/VerifyEmailMessage"
import { EmailVerified } from "./pages/authentication/email-verified/EmailVerified";
import { CustomError } from "./components/Common/CustomError/CustomError";
import { userRoles } from "./config/config";
import PatientSettings from "./pages/patient/settings/Settings";

const PATIENT = userRoles.PATIENT
const DOCTOR = userRoles.DOCTOR

export const routesMap = {
    '/': {
        protected: false,
        label: 'Home',
        path: '/',
        component: Home
    },
    '/error': {
        protected: false,
        label: 'Error',
        path: '/error',
        component: CustomError
    }
}

export const protectedRoutesMap = {
    // routes for patient 
    '/patient/dashboard': {
        protected: true,
        allowed_roles: [PATIENT],
        label: 'Dashboard',
        path: '/patient/dashboard',
        component: Dashboard
    },
    '/search-doctor': {
        protected: true,
        allowed_roles: [PATIENT],
        label: 'Search Doctor',
        path: '/search-doctor',
        component: DocSearch
    },
    '/doc-list/:disease': {
        protected: true,
        allowed_roles: [PATIENT],
        label: 'Doctor List',
        path: '/doc-list/:disease',
        component: Home
    },
    '/patient/settings': {
        protected: true,
        allowed_roles: [PATIENT],
        label: 'Settings',
        path: '/patient/settings',
        component: PatientSettings
    },

    // route for doctor 
    '/doctor/dashboard': {
        protected: true,
        allowed_roles: [DOCTOR],
        label: 'Dashboard',
        path: '/doctor/dashboard',
        component: Dashboard
    },
    '/doctor/settings': {
        protected: true,
        allowed_roles: [DOCTOR],
        label: 'Settings',
        path: '/doctor/settings',
        component: DoctorSettings
    },
}