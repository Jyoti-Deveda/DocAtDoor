import Login from "./pages/authentication/login/Login"
import Register from "./pages/authentication/register/Register"
import { Home } from "./pages/home/Home"
import Dashboard from "./pages/patient/dashboard/Dashboard"
import DocSearch from "./pages/patient/docSearch/DocSearch"

export const routesMap = {
    '/': {
        protected: false,
        label: 'Home',
        path: '/',
        component: Home
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
}