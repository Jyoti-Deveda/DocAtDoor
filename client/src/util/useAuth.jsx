import Cookies from 'js-cookie'
import React from 'react'

const useAuth = () => {

    let user = null;

    try {
        user = Cookies.get('UserData');
        if (user) {
            user = JSON.parse(user);
        }
        else {
            console.log('User is not logged in')
        }
    } catch (error) {
        console.log(error);
    }

    return {
        user: user,
        role: user ? user.userType : null,
    }

}

export default useAuth