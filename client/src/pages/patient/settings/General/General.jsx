import { CustomError } from '@/components/Common/CustomError/CustomError'
import Loading from '@/components/Common/Loading/Loading'
import SettingsFormContainer from '@/components/Common/settingsFormContainer/SettingsFormContainer'
import SettingsTabWrapper from '@/components/Common/settingsTabWrapper/SettingsTabWrapper'
import CustomButton from '@/components/CustomButton/CustomButton'
import StyledInput from '@/components/inputs/StyledInput/StyledInput'
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

        setData(prevState => {
            const newData = { ...prevState };
            let nestedObject = newData;
            const fieldPath = name.split('.');

            for (let i = 0; i < fieldPath.length - 1; i++) {
                nestedObject = nestedObject[fieldPath[i]];
                nestedObject[fieldPath[fieldPath.length - 1]] = value;
            }
            return newData;
        });
    };



    // handles save and submit
    const handleSubmit = () => {

    }


    if (loading) return <Loading />;
    if (error) return <CustomError message={error} />;

    // console.log("this is data", data);

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
                                name='personal_details.first_name'
                                value={data?.personal_details?.first_name}
                                onChange={handleChange}

                            />
                            <StyledInput
                                label='Last Name'
                                size={"small"}
                                name='personal_details.last_name'
                                value={data?.personal_details?.last_name}
                                onChange={handleChange}
                            />
                        </div>
                        <StyledInput
                            label='Email'
                            size={"small"}
                            disabled
                            name='personal_details.email'
                            value={data?.personal_details?.email}
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