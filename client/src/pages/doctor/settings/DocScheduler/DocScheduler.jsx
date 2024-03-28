import React from 'react'
import Style from "./DocScheduler.module.css";
import SettingsTabWrapper from '@/components/Common/settingsTabWrapper/SettingsTabWrapper';
import ScheduleManager from './ScheduleManager/ScheduleManager';

const DocScheduler = ({
    UserProfileBox,
    data,
    setData
}) => {
    return (
        <SettingsTabWrapper hasProfileBox={false}>
            <ScheduleManager
                data={data}
                setData={setData}
            />
        </SettingsTabWrapper>
    )
}

export default DocScheduler