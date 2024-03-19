import Loading from '@/components/Common/Loading/Loading'
import SettingsTabWrapper from '@/components/Common/settingsTabWrapper/SettingsTabWrapper'
import React from 'react'

const General = ({
    UserProfileBox,
    data,
    setData
}) => {
    return (
        <SettingsTabWrapper
            UserProfileBox={UserProfileBox}
        >
            {data &&
                <>
                    data will be here
                </>
            }
        </SettingsTabWrapper>
    )
}

export default General