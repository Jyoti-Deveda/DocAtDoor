import React from 'react';
import Style from "./SettingsFormContainer.module.css";
import SectionSubHeading from '@/components/Headings/SectionSubHeading/SectionSubHeading';

const SettingsFormContainer = ({ children, title = "", action }) => {
    return (
        <div className={`${Style.container} flex flex-col gap-5 p-4 rounded-xl border-2 border-black-500 w-full`}>
            <div className='flex justify-between items-center'>
                <SectionSubHeading
                    title={title}
                />
                {action}
            </div>
            {children}
        </div>
    )
}

export default SettingsFormContainer