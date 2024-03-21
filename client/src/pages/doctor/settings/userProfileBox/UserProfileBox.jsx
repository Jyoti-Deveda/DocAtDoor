import React from 'react';
import Style from "./UserProfileBox.module.css";
import logo from '../../../../assets/Logo/logo.png'
import { userRoles } from '@/config/config';
import { Edit } from '@mui/icons-material';
import CustomButton from '@/components/CustomButton/CustomButton';

const UserProfileBox = ({
    userRole = userRoles.PATIENT,
    data
}) => {



    return (
        <div className={`${Style.container} flex flex-col gap-5 p-4 rounded-xl border-2 border-black-500 w-full`}>
            <div className={`flex items-center justify-center`}>
                <div className={`border-2 border-black-600 rounded-full relative`}>
                    <img src={logo} alt="" className={`h-10 w-10 md:h-20 md:w-20 rounded-full`} />
                    <label
                        className={`absolute bottom-0 right-0 `}
                        htmlFor="change-dp"
                    >
                        <CustomButton
                            variant='contained'
                            color='danger'
                            iconButton
                            roundedFull
                            onClick={() => document.getElementById(`change-dp`).click()}
                        >
                            <Edit fontSize='small' />
                        </CustomButton>
                    </label>
                    <input
                        type="file"
                        id='change-dp'
                        style={{ display: 'none' }}
                    />
                </div>
            </div>

            <p className={`text-center text-sm sm:text-lg font-mediam`}>
                {data?.name}
            </p>

        </div>
    )
}

export default UserProfileBox