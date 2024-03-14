import React from 'react'
import Style from "./DocScheduler.module.css";
import SettingsTabWrapper from '@/components/Common/settingsTabWrapper/SettingsTabWrapper';
import ScheduleManager from './ScheduleManager/ScheduleManager';

const DocScheduler = ({
    UserProfileBox,
}) => {
    return (
        <SettingsTabWrapper hasProfileBox={false}>
            <ScheduleManager />
        </SettingsTabWrapper>
    )
}

export default DocScheduler