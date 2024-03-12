import SettingsFormContainer from '@/components/Common/settingsFormContainer/SettingsFormContainer'
import SettingsTabWrapper from '@/components/Common/settingsTabWrapper/SettingsTabWrapper'
import CustomButton from '@/components/CustomButton/CustomButton'
import StyledInput from '@/components/inputs/StyledInput/StyledInput'
import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import AcademicDetailsBox from './AcademicDetailsBox/AcademicDetailsBox'

const General = ({
    UserProfileBox,
    data,
    setData
}) => {

    // handle input change 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevState => {
            // deep copy 
            const newData = { ...prevState };

            let nestedObject = newData;
            const fieldPath = name.split('.');
            for (let i = 0; i < fieldPath.length - 1; i++) {
                nestedObject = nestedObject[fieldPath[i]];
            }
            nestedObject[fieldPath[fieldPath.length - 1]] = value;

            return newData;
        });
    };

    // handles addition of new academic detail object 
    const addAcademicDetails = () => {
        const emptyObj = {
            university_name: "",
            course: "",
            certification: "",
        }

        setData(prevState => {
            const newData = { ...prevState };
            let nestedData = newData;
            nestedData["academic_details"].push(emptyObj);
            return newData;
        })
    }
    //handles deletion of a academic details
    const deleteAcademicDetails = (index) => {
        setData(prevState => {
            const newAcademicDetails = [...prevState.academic_details];
            newAcademicDetails.splice(index, 1);
            return {
                ...prevState,
                academic_details: newAcademicDetails,
            }
        })
    }

    //handle save and submit
    const handleSubmit = () => {

    }


    return (
        <SettingsTabWrapper
            UserProfileBox={UserProfileBox}
        >

            <SettingsFormContainer
                title='Personal Details'
            >
                <div className={`grid grid-cols-2 gap-4`}>
                    <StyledInput
                        label='First Name'
                        size={"small"}
                        name='personal_details.first_name'
                        value={data.personal_details.first_name}
                        onChange={handleChange}

                    />
                    <StyledInput
                        label='Last Name'
                        size={"small"}
                        name='personal_details.last_name'
                        value={data.personal_details.last_name}
                        onChange={handleChange}
                    />
                </div>
                <StyledInput
                    label='Email'
                    size={"small"}
                    disabled
                    name='personal_details.email'
                    value={data.personal_details.email}
                    onChange={handleChange}
                />
            </SettingsFormContainer>

            <SettingsFormContainer title='Hospital Details'>
                <StyledInput
                    label='Name'
                    size={"small"}
                    value={data.hospital_details.name}
                    name='hospital_details.name'
                    onChange={handleChange}
                />
                <div className={`grid sm:grid-cols-2 gap-4`}>
                    <StyledInput
                        label='City'
                        size={"small"}
                        value={data.hospital_details.city}
                        name='hospital_details.city'
                        onChange={handleChange}
                    />
                    <StyledInput
                        label='State'
                        size={"small"}
                        value={data.hospital_details.state}
                        name='hospital_details.state'
                        onChange={handleChange}
                    />
                    <StyledInput
                        label='Postal Code'
                        size={"small"}
                        value={data.hospital_details.postal_code}
                        name='hospital_details.postal_code'
                        onChange={handleChange}
                    />
                    <StyledInput
                        label='Contact Info'
                        size={"small"}
                        value={data.hospital_details.contact_info}
                        name='hospital_details.contact_info'
                        onChange={handleChange}
                    />
                </div>
                <StyledInput
                    label='Specialization'
                    size={"small"}
                    value={data.hospital_details.specialization}
                    name='hospital_details.specialization'
                    onChange={handleChange}
                />
            </SettingsFormContainer>

            <SettingsFormContainer
                title='Academic Details'
                action={
                    <CustomButton
                        variant='text-primary'
                        iconButton
                        size='small'
                        boxShadow={false}
                        rounded
                        onClick={addAcademicDetails}
                    >
                        <AddIcon />
                    </CustomButton>
                }
            >
                {data?.academic_details?.map((detail, index) => (
                    <AcademicDetailsBox
                        key={index}
                        data={detail}
                        index={index}
                        handleChange={handleChange}
                        onDelete={deleteAcademicDetails}
                    />
                ))}
            </SettingsFormContainer>

            <SettingsFormContainer title='Verification Details'>
                <div className={`grid grid-cols-2 gap-4`}>
                    <StyledInput
                        label='Registration Number'
                        size={"small"}
                        value={data.verification_details.reg_number}
                        name='verification_details.reg_number'
                        onChange={handleChange}
                    />
                    <StyledInput
                        label={"Registration Year"}
                        size={"small"}
                        value={data.verification_details.reg_year}
                        name='verification_details.reg_year'
                        onChange={handleChange}
                    />
                    <StyledInput
                        label='State Medical Council'
                        size={"small"}
                        value={data.verification_details.state_medial_council}
                        name='verification_details.state_medial_council'
                        onChange={handleChange}
                    />
                </div>
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
        </SettingsTabWrapper>

    )
}

export default General