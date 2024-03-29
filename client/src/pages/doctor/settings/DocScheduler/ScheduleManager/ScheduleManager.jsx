import React, { useState } from 'react'
import Style from "./ScheduleManager.module.css";
import SettingsFormContainer from '@/components/Common/settingsFormContainer/SettingsFormContainer';
import DayContainer from './DayContainer/DayContainer';
import TimingSlot from './TimingSlot/TimingSlot';
import CustomButton from '@/components/CustomButton/CustomButton';
import ConfirmDialog from '@/components/ConfirmDialog/ConfirmDialog';
import { setSchedule } from '@/services/Operations/doctor/setSchedule';

const ScheduleManager = ({
    data,
    setData
}) => {

    const [showConfirm, setShowConfirm] = useState(false);

    // this handles the changes in data 
    const handleChange = (e, index, isCheckbox) => {
        let { name, value } = e.target;

        if (isCheckbox) {
            value = e.target.checked;
        }

        setData(prevState => {
            const newData = { ...prevState };
            let nestedObject = newData;
            const fieldPath = name.split('.');

            for (let i = 0; i < fieldPath.length - 1; i++) {
                nestedObject = nestedObject[fieldPath[i]];
                nestedObject[fieldPath[fieldPath.length - 1]] = value;
            }
            return newData;
        });

    };


    // handle addition of new slot on specific date 
    const handleAddition = (index) => {
        const tempObj = {
            start_time: "",
            end_time: "",
            avg_no_of_patients: 0
        };

        setData(prevState => {
            const newData = { ...prevState }
            let nestedData = newData;
            nestedData[index].slots.push(tempObj);
            return newData;
        });
    }


    /**
     * Handles the deletion of a slot from the data.
     *
     * @param {number} parentIndex - The index of the parent element in the data array.
     * @param {number} index - The index of the slot to be deleted in the parent element's slots array.
     */
    const handleDeletion = (parentIndex, index) => {
        setData(prevState => {
            const updatedSlots = [...prevState[parentIndex].slots];
            updatedSlots.splice(index, 1);
            return {
                ...prevState,
                [parentIndex]: {
                    ...prevState[parentIndex],
                    slots: updatedSlots
                }
            }
        })
    }


    /**
     * Applies the slots of a specific index to all other data objects.
     *
     * @param {number} index - The index of the data object whose slots will be applied to others.
     */
    const handleApplyToAll = (index) => {
        const slots = data[index].slots;

        if (slots.length > 0) {
            setData(prevState => {
                const newData = { ...prevState };
                Object.values(newData).forEach((item, i) => {
                    if (i != index) {
                        const copiedSlots = slots.map(slot => ({ ...slot }));
                        newData[i] = {
                            ...newData[i],
                            slots: copiedSlots
                        };
                    }
                });
                return newData;
            });
        }
    }


    const handleSubmit = () => {
        const res = setSchedule(data);
    }


    console.log("🚀 ~ data:", data)

    return (
        <>
            {data &&
                <SettingsFormContainer title='Manage Schedule' >
                    {Object.values(data)?.map((item, index) => (
                        <DayContainer
                            key={`${index}-${item.date}`}
                            index={index}
                            date={item.date}
                            data={data}
                            onAdd={() => handleAddition(index)}
                            handleChange={handleChange}
                            onApplyToAll={() => handleApplyToAll(index)}
                        >
                            {
                                item?.slots?.map((slot, idx) => (
                                    <TimingSlot
                                        index={idx}
                                        parentIndex={index}
                                        data={slot}
                                        key={`${index}-${idx}`}
                                        handleChange={handleChange}
                                        name={`${index}.slots.${idx}`}
                                        handleDelete={() => handleDeletion(index, idx)}
                                    />
                                ))
                            }
                        </DayContainer>
                    ))}

                    <div className='mt-3'>
                        <CustomButton
                            variant='contained'
                            color='primary'
                            onClick={() => setShowConfirm(true)}
                        >
                            Submit
                        </CustomButton>
                    </div>
                    <ConfirmDialog
                        open={showConfirm}
                        question='Are you sure you want to submit changes?'
                        heading={'Confirm Submission'}
                        setOpen={setShowConfirm}
                        action={handleSubmit}
                    />
                </SettingsFormContainer>
            }
        </>
    )
}

export default ScheduleManager