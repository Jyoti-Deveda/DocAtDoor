import SettingsFormContainer from '@/components/Common/settingsFormContainer/SettingsFormContainer'
import SettingsTabWrapper from '@/components/Common/settingsTabWrapper/SettingsTabWrapper'
import CustomButton from '@/components/CustomButton/CustomButton'
import StyledInput from '@/components/inputs/StyledInput/StyledInput'
import { updatePassword } from '@/services/Operations/auth'
import React, { useState } from 'react'
// import UserProfileBox from '../userProfileBox/UserProfileBox'

export const ChangePassword = ({
    UserProfileBox,
    data
}) => {

    const [passdata, setPassdata] = useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    })

    const handleChange = (e) => {

        const { name, value } = e.target;
        setPassdata(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleOnSubmit = async () => {

        await updatePassword(passdata);

    }

    return (
        <SettingsTabWrapper
            UserProfileBox={UserProfileBox}
            userProfileData={data}
        >

            <SettingsFormContainer
                title='Change Password'
            >
                <div className={`flex flex-col gap-4`}>

                    <StyledInput
                        label='Current Password'
                        name='oldPassword'
                        type='text'
                        size={"small"}
                        value={passdata.oldPassword}
                        onChange={handleChange}
                    />

                    <StyledInput
                        label='New Password'
                        name='newPassword'
                        type='text'
                        size={"small"}
                        value={passdata.newPassword}
                        onChange={handleChange}
                    />

                    <StyledInput
                        label='Confirm new Password'
                        name='confirmNewPassword'
                        type='text'
                        size={"small"}
                        value={passdata.confirmNewPassword}
                        onChange={handleChange}
                    />

                    <div className='flex justify-start'>
                        <CustomButton
                            variant='contained'
                            // size='small'
                            className={'flex justify-start'}
                            color='primary'
                            onClick={handleOnSubmit}
                            rounded
                        >
                            Reset Password
                        </CustomButton>
                    </div>
                </div>


            </SettingsFormContainer>

        </SettingsTabWrapper>
    )
}
