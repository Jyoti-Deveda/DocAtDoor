
import CustomTabs from '@/components/Tabs/Tabs'
import React, { useEffect, useState } from 'react'
import useAuth from '@/util/useAuth'
import { ChangePassword } from '@/pages/doctor/settings/ChangePassword/ChangePassword'
import UserProfileBox from '@/pages/doctor/settings/userProfileBox/UserProfileBox'
import General from './General/General'
import { getProfileDetails } from '@/services/Operations/patient/getProfileDetails'
import logo from "../../../assets/Images/default-avatar.webp";
import { getProfilePicture } from '@/services/Operations/DpService'

const Settings = () => {

    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [currentDp, setCurrentDp] = useState(logo);
    // console.log("🚀 ~ Settings ~ data:", data)

    // have to get the user details from backend as when we update the user details then we have to update the cookies too else there will be now change in the user details 

    useEffect(() => {

        ; (async () => {
            setLoading(true);
            const res = await getProfileDetails();
            const profileImage = await getProfilePicture();
            // console.log("🚀 ~ ; ~ res:", res)
            if (res.error) {
                setData(null);
                setError(res.message);
            }
            else {
                setData(res.userDetails.personal_details);
                setError(null);
            }

            if (profileImage) {
                setCurrentDp(profileImage.image)
            }
            setLoading(false);
        })();

    }, [])


    const tabs = [
        {
            label: "General",
            component: (
                <General
                    // UserProfileBox={<UserProfileBox />}
                    UserProfileBox={<UserProfileBox data={data} currentDp={currentDp} setCurrentDp={setCurrentDp} />}
                    data={data}
                    setData={setData}
                    loading={loading}
                    error={error}
                />
            )
        },
        {
            label: "Change Password",
            component: (
                <ChangePassword
                    // UserProfileBox={<UserProfileBox />}
                    UserProfileBox={<UserProfileBox data={data} currentDp={currentDp} setCurrentDp={setCurrentDp} />}
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