import SettingsFormContainer from '@/components/Common/settingsFormContainer/SettingsFormContainer'
import CustomTabs from '@/components/Tabs/Tabs'
import React, { useState } from 'react'
import General from './General/General'
import UserProfileBox from './userProfileBox/UserProfileBox'
import DocScheduler from './DocScheduler/DocScheduler'

const Settings = () => {

    // doctor's details 
    const [data, setData] = useState({
        personal_details: {
            first_name: "",
            last_name: "",
            email: "",
        },
        hospital_details: {
            name: "",
            city: "",
            state: "",
            postal_code: "",
            contact_info: "",
            specialization: [],
        },
        academic_details: [
            {
                universityName: "",
                course: "",
                certification: "",
            },
        ],
        verification_details: {
            registrationNum: "",
            registrationYear: "",
            stateMedicalCouncil: "",
        }
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
            component: "Change Password"
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