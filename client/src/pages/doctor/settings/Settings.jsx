import SettingsFormContainer from '@/components/Common/settingsFormContainer/SettingsFormContainer'
import CustomTabs from '@/components/Tabs/Tabs'
import React, { useEffect, useState } from 'react'
import General from './General/General'
import UserProfileBox from './userProfileBox/UserProfileBox'
import DocScheduler from './DocScheduler/DocScheduler'
import { ChangePassword } from './ChangePassword/ChangePassword'
import useAuth from '@/util/useAuth'
import { getDoctorDetails } from '@/services/Operations/doctor/getDoctorDetails'
import { getSchedule } from '@/services/Operations/doctor/getSchedule'

const Settings = () => {

    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [scheduleError, setScheduleError] = useState(null);
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
    const [scheduleDetails, setScheduleDetails] = useState({});

    useEffect(() => {

        const getDoctorInfo = async () => {
            setLoading(true);

            const [docDetailRes, scheduleRes] = await Promise.all([getDoctorDetails(), getSchedule()]);

            // const response = await getDoctorDetails();
            if (docDetailRes.error) {
                setData(null)
                setError(docDetailRes.message);
            }
            else {
                setData(docDetailRes);
                setError(null);
            }

            setLoading(false);

            // setting the schedule details 
            if (scheduleRes.error) {
                setScheduleDetails(null);
                setScheduleError(scheduleRes.message);
            }
            else {
                setScheduleDetails(scheduleRes.scheduledDays);
                setScheduleError(null);
            }
            // console.log("DATA: ", data);
        }

        getDoctorInfo();

    }, [])


    const MemoizedUserProfileBox = React.memo(UserProfileBox);


    const tabs = [
        {
            label: "General",
            component: (
                <General
                    data={data}
                    setData={setData}
                    UserProfileBox={MemoizedUserProfileBox}
                    loading={loading}
                    error={error}
                />
            )
        },
        {
            label: "Doc Scheduler",
            component: (
                <DocScheduler
                    data={scheduleDetails}
                    setData={setScheduleDetails}
                />
            )
        },
        {
            label: "Change Password",
            component: (
                <ChangePassword
                    data={data}
                    UserProfileBox={MemoizedUserProfileBox}
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