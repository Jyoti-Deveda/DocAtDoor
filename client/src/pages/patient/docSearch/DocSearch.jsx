import React, { useContext, useEffect, useState } from 'react';
import Style from "./DocSearch.module.css";
import { symptoms, initialSymptomState } from '@/lib/constant';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import CustomButton from '@/components/CustomButton/CustomButton';
import SettingsFormContainer from '@/components/Common/settingsFormContainer/SettingsFormContainer';
import { getRemainingSymptoms } from '@/util/helpers';
import StatusChips from '@/components/Common/StatusChips/StatusChips';
import { predictDisease } from '@/services/Operations/patient/predictDisease';
import { DocListContext } from '@/globalStates/DocListProvider';
import Loading from '@/components/Common/Loading/Loading';
import { useNavigate } from 'react-router-dom';

const animatedComponents = makeAnimated();

const DocSearch = () => {

    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const docListManage = useContext(DocListContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [diseaseList, setDiseaseList] = useState([]);

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


    /**
     * Handles the prediction of disease based on selected symptoms.
     */
    const handlePredict = async () => {
        const res = await predictDisease(selectedSymptoms, setLoading);
        if (res.error) {
            console.log(res.message);
        } else {
            docListManage.setDocList(res?.doctorsList);
            setDiseaseList(res?.diseases);
        }
    }

    useEffect(() => {
        if (diseaseList.length > 0 && !loading) {
            const diseaseListString = diseaseList.join(',');
            navigate(`/search-doctor/list?diseases=${diseaseListString}`);
        }
    }, [diseaseList]);

    if (loading) return <Loading />

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