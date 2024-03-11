import React from 'react';
import Style from "./SettingsFormContainer.module.css";
import SectionSubHeading from '@/components/Headings/SectionSubHeading/SectionSubHeading';

const SettingsFormContainer = ({ children, title = "" }) => {
    return (
        <div className={`${Style.container} flex flex-col gap-5 p-4 rounded-xl border-2 border-black-500 w-full`}>
            <SectionSubHeading
                title={"Hello world"}
            />
            {children}
        </div>
    )
}

export default SettingsFormContainer