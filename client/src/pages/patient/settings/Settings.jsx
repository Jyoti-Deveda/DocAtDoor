
import CustomTabs from '@/components/Tabs/Tabs'
import React, { useEffect, useState } from 'react'
import useAuth from '@/util/useAuth'
import { ChangePassword } from '@/pages/doctor/settings/ChangePassword/ChangePassword'
import UserProfileBox from '@/pages/doctor/settings/userProfileBox/UserProfileBox'
import General from './General/General'

const Settings = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const tabs = [
        {
            label: "General",
            component: (
                <General
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