import React from 'react'
import Style from "./SettingsTabWrapper.module.css";

const SettingsTabWrapper = ({
    children,
    UserProfileBox
}) => {
    return (
        <div className={`${Style.container} relative gap-10 items-start pb-8`}>
            <div className={`sticky top-4 w-full flex flex-col`}>
                {UserProfileBox}
            </div>
            <div className={`${Style.scroller} flex flex-col gap-10 flex-1`}>
                {children}
            </div>
        </div>
    )
}

export default SettingsTabWrapper