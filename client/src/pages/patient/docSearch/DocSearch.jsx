import React, { useState } from 'react';
import Style from "./DocSearch.module.css";
import { symptoms, initialSymptomState } from '@/lib/constant';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import CustomButton from '@/components/CustomButton/CustomButton';
import SettingsFormContainer from '@/components/Common/settingsFormContainer/SettingsFormContainer';
import { getRemainingSymptoms } from '@/util/helpers';
import StatusChips from '@/components/Common/StatusChips/StatusChips';

const animatedComponents = makeAnimated();

const DocSearch = () => {

    const [selectedSymptoms, setSelectedSymptoms] = useState([]);

    const handleSymptomChange = (selectedOptions) => {
        setSelectedSymptoms(selectedOptions);
    };

    const handleAddSymptom = (data) => {
        setSelectedSymptoms(prev => [
            ...prev,
            data
        ])
    }

    const remainingSymptoms = getRemainingSymptoms(selectedSymptoms);
    // console.log("🚀 ~ DocSearch ~ remainingSymptoms:", remainingSymptoms)


    const handlePredict = () => {
        // predict disease then direct to doctor list page 
    }

    return (
        <div className={`flex flex-col gap-6 sm:pt-4`}>
            <SettingsFormContainer title='Select Symptoms'>
                <div className={`flex flex-col sm:flex-row gap-4 items-start w-full`}>
                    <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        options={symptoms}
                        value={selectedSymptoms}
                        onChange={handleSymptomChange}
                        placeholder="Select your symptoms"
                        className='flex-1'
                    />

                    <CustomButton
                        variant='contained'
                        color='primary'
                        onClick={handlePredict}
                    >
                        Search
                    </CustomButton>
                </div>
            </SettingsFormContainer>

            {/* common recommanded symptoms  */}
            {remainingSymptoms.length > 0 &&
                <SettingsFormContainer title='Common Symptoms'>
                    <div className={`flex gap-2 flex-wrap`}>
                        {remainingSymptoms?.slice(0, 15).map((item, index) => (
                            <StatusChips
                                key={`${item.label}-${item.value}`}
                                onClick={() => { handleAddSymptom(item) }}
                                noMargin
                                rounded
                                status={item.label}
                            />
                        ))}

                    </div>
                </SettingsFormContainer>
            }


            {/* more about how our model works  */}
            <SettingsFormContainer title='How It Works?'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto accusamus, id doloremque itaque voluptates ut aliquid nulla quas! Blanditiis delectus perferendis velit sint nobis harum eum in nisi impedit recusandae.
            </SettingsFormContainer>
        </div>
    )
}

export default DocSearch