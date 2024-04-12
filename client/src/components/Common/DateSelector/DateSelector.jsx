import { generateDateOptions, getFormatedDate } from '@/util/helpers';
import React from 'react'
import StatusChips from '../StatusChips/StatusChips';

const DateSelector = ({
    data,
    setData,
    availableData,
}) => {

    //array of dates
    // const datesOption = generateDateOptions(availableData);
    const value = data?.date;

    const getVariant = (currentDate, index) => {

        if (availableData[index]?.isHoliday === true || availableData[index]?.booked === true) return "disable";

        if (currentDate === value) return 'contained';

        return 'outlined';
    }


    //handles the chagne of date selection 
    const handleChange = (day) => {
        setData(prevstate => ({
            ...prevstate,
            slotId: day._id,
            date: day.date,
        }))
    }

    return (
        <div className={`flex flex-col gap-1 border border-dashed border-gray-400 rounded p-2`}>
            <p className={`text-xs sm:text-sm text-gray-600`}>Select Date of Appointment</p>
            <div className={`flex gap-3 mt-2`}>
                {availableData &&
                    availableData.map((day, index) => (
                        <StatusChips
                            status={getFormatedDate(day?.date)}
                            noMargin
                            key={index}
                            variant={getVariant(day.date, index)}
                            onClick={() => handleChange(day)}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default DateSelector