import React from 'react'
import StatusChips from '../StatusChips/StatusChips';

const TimeSelector = ({
    data,
    setData,
    availableData,
}) => {

    let timeSlots = [];
    if (data?.date) {
        timeSlots = availableData?.find(item => item.date === data.date)?.slots;
    }


    const getVariant = (currentTime, index) => {
        if (
            timeSlots[index].isSlotFree === false ||
            timeSlots[index].appointmentsBooked === timeSlots[index].avg_no_of_patients
        ) return 'disable';

        if (currentTime == data?.time?.start_time) return 'contained';

        return 'outlined';
    }


    //handles the chagne of date selection 
    const handleChange = (newTime) => {
        setData(prevstate => ({
            ...prevstate,
            time: newTime
        }))
    }

    return (
        <>
            {data?.date &&
                <div className={`flex flex-col gap-1 border border-dashed border-gray-400 rounded p-2`}>
                    <p className={`text-xs sm:text-sm text-gray-600`}>Select Time</p>

                    <div className={`flex gap-3 mt-2`}>
                        {timeSlots?.map((item, index) => (
                            <StatusChips
                                status={item.start_time}
                                noMargin
                                key={index}
                                variant={getVariant(item.start_time, index)}
                                onClick={() => handleChange(item)}
                            />
                        ))}
                    </div>

                </div>
            }
        </>
    )
}

export default TimeSelector