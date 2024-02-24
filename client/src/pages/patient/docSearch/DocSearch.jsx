import React, { useState } from 'react';
import Style from "./DocSearch.module.css";
import { symptoms, initialSymptomState } from '@/lib/constant';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import CustomButton from '@/components/CustomButton/CustomButton';

const animatedComponents = makeAnimated();

const DocSearch = () => {

    const [selectedSymptoms, setSelectedSymptoms] = useState([]);

    const handleSymptomChange = (selectedOptions) => {
        setSelectedSymptoms(selectedOptions);
    };

    const handlePredict = () => {
        // predict disease then direct to doctor list page 
    }

    return (
        <div className={`${Style.container}`}>
            <div className={`${Style.main}`}>
                <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={symptoms}
                    value={selectedSymptoms}
                    onChange={handleSymptomChange}
                    placeholder="Select your symptoms"
                />

                <CustomButton
                    variant='contained'
                    color='primary'
                    onClick={handlePredict}
                >
                    Search
                </CustomButton>


            </div>
        </div>
    )
}

export default DocSearch