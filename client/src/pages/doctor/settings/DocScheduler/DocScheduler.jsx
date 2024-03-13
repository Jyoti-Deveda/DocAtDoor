import React from 'react'
import Style from "./DocScheduler.module.css";
import SettingsTabWrapper from '@/components/Common/settingsTabWrapper/SettingsTabWrapper';

const DocScheduler = ({
    UserProfileBox,
}) => {
    return (
        <SettingsTabWrapper
            UserProfileBox={UserProfileBox}
        >
            Manage timing slots and all
        </SettingsTabWrapper>
    )
}

export default DocScheduler