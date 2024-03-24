import React, { useEffect, useState } from 'react';
import Style from "./UserProfileBox.module.css";
import logo from '../../../../assets/Logo/logo.png'
import { userRoles } from '@/config/config';
import { Edit } from '@mui/icons-material';
import CustomButton from '@/components/CustomButton/CustomButton';
import useAuth from '@/util/useAuth';
import { toDataURL } from '@/util/helpers';
import { changeDp, getProfilePicture } from '@/services/Operations/DpService';

const UserProfileBox = ({
    data
}) => {

    const { role } = useAuth();
    const [currentDp, setCurrentDp] = useState(logo);
    const [dp, setDp] = useState({
        image: "",
        file: ""
    });

    if (!role) return "UnAuthorized";

    // handles the change in dp 
    const handleDpChange = async (e) => {
        const file = e.target.files[0];

        if (file) {
            const dataUrl = await toDataURL(file);
            setDp(prevState => ({
                ...prevState,
                image: dataUrl,
                file: file
            }))
        }
    }

    // handles the submition of new dp 
    const handleSubmit = async () => {
        const res = await changeDp(dp);
    }

    useEffect(() => {
        ; (async () => {
            const res = await getProfilePicture();

            if (res) {
                setCurrentDp(res.image);
            }
        })();
    }, []);

    console.log(currentDp);

    return (
        <div className={`${Style.container} flex flex-col gap-5 p-4 rounded-xl border-2 border-black-500 w-full`}>
            <div className={`flex flex-col gap-3`}>
                {/* image container  */}
                <div className={`flex items-center justify-center`}>
                    <div className={`border-2 border-black-600 rounded-full relative`}>

                        <img
                            src={dp?.image ? dp?.image : currentDp}
                            // src={`https://api.dicebear.com/7.x/shapes/svg?seed=A`}
                            alt="Image"
                            className={`h-10 w-10 md:h-20 md:w-20 rounded-full`} />

                        <label
                            className={`absolute bottom-0 right-0 `}
                            htmlFor="edit-dp"
                        >
                            <CustomButton
                                variant='contained'
                                color='danger'
                                iconButton
                                roundedFull
                                onClick={() => document.getElementById(`edit-dp`).click()}
                            >
                                <Edit fontSize='small' />
                            </CustomButton>
                        </label>
                        <input
                            type="file"
                            id='edit-dp'
                            style={{ display: 'none' }}
                            onChange={handleDpChange}
                            accept="image/jpeg, image/png, image/svg+xml"
                        />
                    </div>
                </div>

                {dp?.image &&
                    <div className='flex justify-center'>
                        <CustomButton
                            variant='underline'
                            color='danger'
                            size='small'
                            boxShadow={false}
                            onClick={handleSubmit}
                        >
                            Submit
                        </CustomButton>
                    </div>
                }
            </div>

            <p className={`text-center text-sm sm:text-lg font-mediam`}>
                {data?.personal_details?.first_name} {' '}
                {data?.personal_details?.last_name}
            </p>

        </div>
    )
}

export default UserProfileBox