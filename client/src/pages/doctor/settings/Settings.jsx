import SettingsFormContainer from '@/components/Common/settingsFormContainer/SettingsFormContainer'
import CustomTabs from '@/components/Tabs/Tabs'
import React from 'react'
import General from './General/General'

const Settings = () => {

    const tabs = [
        {
            label: "General",
            component: <General />
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