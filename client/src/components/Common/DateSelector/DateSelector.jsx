import { generateDateOptions } from '@/util/helpers';
import React from 'react'
import StatusChips from '../StatusChips/StatusChips';

const DateSelector = ({
    data,
    setData,
}) => {

    const datesOption = generateDateOptions();
    const value = data?.date;

    const getVariant = (currentDate) => {

        // if the current date is off day or there is no slot available then make its variant disable
        if (currentDate === "26/03/2024") return "disable"

        if (currentDate == value) return 'contained';

        return 'outlined';
    }


    //handles the chagne of date selection 
    const handleChange = (newDate) => {
        setData(prevstate => ({
            ...prevstate,
            date: newDate
        }))
    }

    return (
        <div className={`flex flex-col gap-1 border border-dashed border-gray-400 rounded p-2`}>
            <p className={`text-xs sm:text-sm text-gray-600`}>Select Date of Appointment</p>
            {/* will use select on small screens and tab like chips on large screen  */}
            <div className={`hidden md:flex gap-3 mt-2`}>
                {datesOption &&
                    datesOption.map((date, index) => (
                        <StatusChips
                            status={date.label}
                            noMargin
                            key={index}
                            variant={getVariant(date.value)}
                            onClick={() => handleChange(date?.value)}
                        />
                    ))
                }
            </div>

            <div className={`flex md:hidden`}>
                this show on mobile
            </div>
        </div>
    )
}

export default DateSelector