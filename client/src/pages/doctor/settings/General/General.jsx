import SettingsFormContainer from '@/components/Common/settingsFormContainer/SettingsFormContainer'
import SettingsTabWrapper from '@/components/Common/settingsTabWrapper/SettingsTabWrapper'
import CustomButton from '@/components/CustomButton/CustomButton'
import StyledInput from '@/components/inputs/StyledInput/StyledInput'
import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import AcademicDetailsBox from './AcademicDetailsBox/AcademicDetailsBox'
import SearchSelect from '@/components/inputs/SearchSelect/SearchSelect'
import { experienceYears, symptoms } from '@/lib/constant'
import { createGenrealProfile } from '@/services/Operations/doctor/createProfile'
import Loading from '@/components/Common/Loading/Loading'
import { CustomError } from '@/components/Common/CustomError/CustomError'

const General = ({
    UserProfileBox,
    data,
    setData,
    loading,
    error,
}) => {

    // handle input change 
    const handleChange = (e, type) => {
        let name = e.target.name;
        let value;
        if (type === "file") {
            // currently saving only a string [name] for file but later have to save the whole file 
            value = e.target.files[0];
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
    console.log(data?.academic_details)

    // handles specialization changes 
    const handleSearchSelectChange = (selectedOptions, name) => {
        setData(prevState => {
            const newData = { ...prevState };
            let nestedObject = newData;

            nestedObject[name] = selectedOptions;

            return newData;
        })
    }

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
    //handles deletion of academic detail > certificate
    const removeCertificate = (index) => {
        setData(prevState => {
            const newAcademicDetails = [...prevState.academic_details];
            newAcademicDetails[index].certification = "";
            return {
                ...prevState,
                academic_details: newAcademicDetails
            }
        })
    }

    //handle save and submit
    const handleSubmit = async () => {
        const res = await createGenrealProfile(data);
    }


    // handeling data fecthing states like loading and error 
    if (loading) {
        return <Loading />
    }
    if (error) {
        return <CustomError message={error} />
    }

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

                        <StyledInput
                            select
                            options={experienceYears}
                            size={"small"}
                            onChange={handleChange}
                            name="personal_details.experience"
                            value={data?.personal_details?.experience}
                            label='Years of Experiance'
                        />

                        <StyledInput
                            multiline
                            label='Bio'
                            size={"small"}
                            placeholder='Bio'
                            name='personal_details.bio'
                            value={data?.personal_details?.bio}
                            onChange={handleChange}
                            maxCharacter={200}
                        />
                    </SettingsFormContainer>

                    <SettingsFormContainer title='Hospital Details'>
                        <StyledInput
                            label='Name'
                            size={"small"}
                            value={data?.hospital_details?.name}
                            name='hospital_details.name'
                            onChange={handleChange}
                        />
                        <div className={`grid sm:grid-cols-2 gap-4`}>
                            <StyledInput
                                label='City'
                                size={"small"}
                                value={data?.hospital_details?.city}
                                name='hospital_details.city'
                                onChange={handleChange}
                            />
                            <StyledInput
                                label='State'
                                size={"small"}
                                value={data?.hospital_details?.state}
                                name='hospital_details.state'
                                onChange={handleChange}
                            />
                            <StyledInput
                                label='Postal Code'
                                size={"small"}
                                value={data?.hospital_details?.postal_code}
                                name='hospital_details.postal_code'
                                onChange={handleChange}
                                type='number'
                            />
                            <StyledInput
                                label='Contact Number'
                                size={"small"}
                                value={data?.hospital_details?.contact_info}
                                name='hospital_details.contact_info'
                                onChange={handleChange}
                                type='number'
                            />
                        </div>

                        <StyledInput
                            name='hospital_details.appointment_fee'
                            value={data?.hospital_details?.appointment_fee}
                            onChange={handleChange}
                            label='Appointment Fee'
                            size={"small"}
                            type='number'
                            isPositive
                        />

                        {/* TODO-- change options to actual specialization list  */}
                        <div className={`flex flex-col gap-1`}>
                            <span className={`text-sm text-gray-700`}>Specialization</span>
                            <SearchSelect
                                value={data?.specialization}
                                onChange={(list) => handleSearchSelectChange(list, 'specialization')}
                                options={symptoms}
                                isMulti
                                placeholder='Select Specializations'
                            />
                        </div>

                        {/* TOTO-- add specializaed diseases to options  */}
                        <div className={`flex flex-col gap-1`}>
                            <span className={`text-sm text-gray-700`}>Specialized Diseases</span>
                            <SearchSelect
                                value={data?.specializedDiseases}
                                onChange={(list) => handleSearchSelectChange(list, 'specializedDiseases')}
                                options={symptoms}
                                isMulti
                                placeholder='Select Specialized Diseases'
                            />
                        </div>
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
                                removeCertificate={removeCertificate}
                            />
                        ))}
                    </SettingsFormContainer>

                    <SettingsFormContainer title='Verification Details'>
                        <div className={`grid grid-cols-2 gap-4`}>
                            <StyledInput
                                label='Registration Number'
                                size={"small"}
                                value={data?.verification_details?.reg_number}
                                name='verification_details.reg_number'
                                onChange={handleChange}
                            />
                            <StyledInput
                                label={"Registration Year/Date"}
                                size={"small"}
                                type='date'
                                value={data?.verification_details?.reg_year}
                                name='verification_details.reg_year'
                                onChange={handleChange}
                            />
                            <StyledInput
                                label='State Medical Council'
                                size={"small"}
                                value={data?.verification_details?.state_medical_council}
                                name='verification_details.state_medical_council'
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
                </>
            }
        </SettingsTabWrapper>

    )
}

export default General