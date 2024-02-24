import Login from "./pages/authentication/login/Login"
import Register from "./pages/authentication/register/Register"
import { Home } from "./pages/home/Home"

export const routesMap = {
    '/': {
        protected: false,
        label: 'Home',
        path: '/',
        component: Home
    },
    '/login': {
        protected: false,
        label: 'Login',
        path: '/login',
        component: Login
    },
    '/register': {
        protected: false,
        label: 'Register',
        path: '/register',
        component: Register
    },
}

export const protectedRoutesMap = {
    '/user': {
        protected: true,
        label: 'user',
        path: '/user',
        component: Home
    }
}