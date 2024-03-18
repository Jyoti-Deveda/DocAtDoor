import SettingsFormContainer from '@/components/Common/settingsFormContainer/SettingsFormContainer'
import CustomTabs from '@/components/Tabs/Tabs'
import React, { useState } from 'react'
import General from './General/General'
import UserProfileBox from './userProfileBox/UserProfileBox'
import DocScheduler from './DocScheduler/DocScheduler'
import { ChangePassword } from './ChangePassword/ChangePassword'
import useAuth from '@/util/useAuth'

const Settings = () => {

    const { user } = useAuth();

    // doctor's details 
    const [data, setData] = useState({
        personal_details: {
            first_name: "",
            last_name: "",
            email: user.email,
            bio: "",
            experience: "",
        },
        hospital_details: {
            name: "",
            city: "",
            state: "",
            postal_code: "",
            contact_info: "",
            appointment_fee: 0
        },
        academic_details: [
            {
                university_name: "",
                course: "",
                certification: "",
            },
        ],
        verification_details: {
            reg_number: "",
            reg_year: "",
            state_medical_council: "",
        },
        specialization: [],
        specializedDiseases: []
    })


    const tabs = [
        {
            label: "General",
            component: (
                <General
                    data={data}
                    setData={setData}
                    UserProfileBox={<UserProfileBox />}
                />
            )
        },
        {
            label: "Doc Scheduler",
            component: (
                <DocScheduler
                    UserProfileBox={<UserProfileBox />}
                />
            )
        },
        {
            label: "Change Password",
            component: (
                <ChangePassword
                    UserProfileBox={<UserProfileBox />}
                />
            )
        },
    ]

    return (
        <div className={``}>
            <CustomTabs
                tabs={tabs}
            />
        </div>
    )
}

export default Settings