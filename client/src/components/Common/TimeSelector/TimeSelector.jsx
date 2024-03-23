import React from 'react'
import StatusChips from '../StatusChips/StatusChips';

const TimeSelector = ({
    data,
    setData,
    availableData,
}) => {

    let timeSlots = [];
    if (data?.date) {
        timeSlots = availableData[data.date]?.slots;
    }


    const getVariant = (currentTime) => {

        // if the current time slot is not available or is full then disable it
        //for no available slot on that time 
        //here

        //selected
        if (currentTime == data?.time) return 'contained';

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
                                variant={getVariant(item.start_time)}
                                onClick={() => handleChange(item.start_time)}
                            />
                        ))}
                    </div>

                </div>
            }
        </>
    )
}

export default TimeSelector