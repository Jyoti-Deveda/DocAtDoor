import { CustomError } from '@/components/Common/CustomError/CustomError'
import Loading from '@/components/Common/Loading/Loading'
import SettingsFormContainer from '@/components/Common/settingsFormContainer/SettingsFormContainer'
import SettingsTabWrapper from '@/components/Common/settingsTabWrapper/SettingsTabWrapper'
import CustomButton from '@/components/CustomButton/CustomButton'
import StyledInput from '@/components/inputs/StyledInput/StyledInput'
import { setProfileDetails } from '@/services/Operations/patient/setProfileDetails'
import React from 'react'

const General = ({
    UserProfileBox,
    data,
    setData,
    loading,
    error
}) => {

    // handle input change 
    const handleChange = (e, type = "") => {
        let name = e.target.name;
        let value;
        if (type === "file") {
            value = e.target.files[0].name;
        } else {
            value = e.target.value;
        }

        setData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };



    // handles save and submit
    const handleSubmit = async () => {
        const res = await setProfileDetails(data);
    }


    if (loading) return <Loading />;
    if (error) return <CustomError message={error} />;

    return (
        <SettingsTabWrapper
            UserProfileBox={UserProfileBox}
        >
            {data &&
                <>
                    <SettingsFormContainer
                        title='Personal Details'
                    >
                        <div className={`grid grid-cols-2 gap-4`}>
                            <StyledInput
                                label='First Name'
                                size={"small"}
                                name='first_name'
                                value={data?.first_name}
                                onChange={handleChange}

                            />
                            <StyledInput
                                label='Last Name'
                                size={"small"}
                                name='last_name'
                                value={data?.last_name}
                                onChange={handleChange}
                            />
                        </div>
                        <StyledInput
                            label='Email'
                            size={"small"}
                            disabled
                            name='email'
                            value={data?.email}
                            onChange={handleChange}
                        />
                    </SettingsFormContainer>

                    <div className=''>
                        <CustomButton
                            variant='contained'
                            color='primary'
                            onClick={handleSubmit}
                        >
                            Save Changes
                        </CustomButton>
                    </div>
                </>
            }
        </SettingsTabWrapper>
    )
}

export default General