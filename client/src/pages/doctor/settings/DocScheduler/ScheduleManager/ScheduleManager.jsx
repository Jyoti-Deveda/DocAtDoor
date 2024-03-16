import React, { useState } from 'react'
import Style from "./ScheduleManager.module.css";
import SettingsFormContainer from '@/components/Common/settingsFormContainer/SettingsFormContainer';
import DayContainer from './DayContainer/DayContainer';
import TimingSlot from './TimingSlot/TimingSlot';

const ScheduleManager = () => {

    const [data, setData] = useState({
        '01/01/2024': {
            isHoliday: false,
            slots: [
                { start_time: "", end_time: "", avg_no_of_patients: 0 },
            ]
        },
        '02/01/2024': {
            isHoliday: false,
            slots: [
                { start_time: "", end_time: "", avg_no_of_patients: 0 },
            ]
        },
        '03/01/2024': {
            isHoliday: false,
            slots: [
                { start_time: "", end_time: "", avg_no_of_patients: 0 },
            ]
        },
        '04/01/2024': {
            isHoliday: false,
            slots: [
                { start_time: "", end_time: "", avg_no_of_patients: 0 },
            ]
        },
        '05/01/2024': {
            isHoliday: false,
            slots: [
                { start_time: "", end_time: "", avg_no_of_patients: 0 },
            ]
        },
        '06/01/2024': {
            isHoliday: false,
            slots: [
                { start_time: "", end_time: "", avg_no_of_patients: 0 },
            ]
        },
        '07/01/2024': {
            isHoliday: false,
            slots: [
                { start_time: "", end_time: "", avg_no_of_patients: 0 },
            ]
        },
    })

    // this handles the changes in data 
    const handleChange = (e, isCheckbox) => {
        let { name, value } = e.target;
        if (isCheckbox) {
            value = e.target.checked;
        }
        setData(prevState => {
            // deep copy 
            const newData = { ...prevState };

            let nestedObject = newData;
            const fieldPath = name.split('.');
            for (let i = 0; i < fieldPath.length - 1; i++) {
                nestedObject = nestedObject[fieldPath[i]];
            }
            nestedObject[fieldPath[fieldPath.length - 1]] = value;

            return newData;
        });
    };

    // handle addition of new slot on specific date 
    const handleAddition = (date) => {
        const tempObj = {
            start_time: "",
            end_time: "",
            avg_no_of_patients: 0
        };

        setData(prevState => {
            const newData = { ...prevState }
            let nestedData = newData;
            nestedData[date].slots.push(tempObj);
            return newData;
        });
    }
    //handles deletion of a slot on specific date
    const handleDeletion = (date, index) => {
        setData(prevState => {
            const updatedSlots = [...prevState[date].slots];
            updatedSlots.splice(index, 1);
            return {
                ...prevState,
                [date]: {
                    ...prevState[date],
                    slots: updatedSlots
                }
            }
        })
    }

    // handles the apply to all 
    const handleApplyToAll = (key) => {
        const day = data[key];
        if (day) {
            const newData = {};
            Object.keys(data).forEach((item) => {
                newData[item] = JSON.parse(JSON.stringify(day));
            });
            setData(newData);
        }
    }

    return (
        <SettingsFormContainer title='Manage Schedule' >
            {data && Object.keys(data).map((item, index) => (
                <DayContainer
                    key={item}
                    index={index}
                    date={item}
                    data={data}
                    onAdd={() => handleAddition(item)}
                    handleChange={handleChange}
                    onApplyToAll={() => handleApplyToAll(item)}
                >
                    {data[item] && data[item].slots?.map((slot, idx) => (
                        <TimingSlot
                            index={idx}
                            data={slot}
                            key={`${index}-${idx}`}
                            handleChange={handleChange}
                            name={`${item}.slots.${idx}`}
                            handleDelete={() => handleDeletion(item, idx)}
                        />
                    ))}
                </DayContainer>
            ))}
        </SettingsFormContainer>
    )
}

export default ScheduleManager