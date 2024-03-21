import React from 'react';
import Style from "./SettingsFormContainer.module.css";
import SectionSubHeading from '@/components/Headings/SectionSubHeading/SectionSubHeading';

const SettingsFormContainer = ({ children, title = "", action, className }) => {
    return (
        <div className={`${Style.container} flex flex-col gap-5 p-4 rounded-xl border-2 border-black-500 w-full`}>
            {title &&
                <div className='flex justify-between items-center'>
                    <SectionSubHeading
                        title={title}
                    />
                    {/* for button in academic details to add or remove  */}
                    {action}
                </div>
            }
            {children}
        </div>
    )
}

export default SettingsFormContainer