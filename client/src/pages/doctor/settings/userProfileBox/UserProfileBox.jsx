import React from 'react';
import Style from "./UserProfileBox.module.css";
import logo from '../../../../assets/Logo/logo.png'

const UserProfileBox = () => {
    return (
        <div className={`${Style.container} flex flex-col gap-5 p-4 rounded-xl border-2 border-black-500 w-full`}>
            <div className={`flex justify-center`}>
                <img src={logo} alt="" className={`h-10 w-10 md:h-16 md:w-16 rounded-full`} />
            </div>

            <p className={`text-center text-lg font-mediam`}>
                Akshay Mundra
            </p>

        </div>
    )
}

export default UserProfileBox