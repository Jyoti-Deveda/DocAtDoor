import CustomButton from '@/components/CustomButton/CustomButton';
import StyledInput from '@/components/inputs/StyledInput/StyledInput'
import { Delete } from '@mui/icons-material';
import React, { useState } from 'react'
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import Style from "./TimingSlot.module.css";

const TimingSlot = ({
    data,
    index,
    name = "",
    handleChange,
    handleDelete,
}) => {


    return (
        <div className={`flex gap-2 items-end justify-between`}>
            <div className='flex gap-4 items-end ml-2'>
                <span className={` lh-1 text-xs font-bold text-gray-500 mr-4 border border-gray-500 rounded-full w-[20px] h-[20px] flex items-center justify-center mb-2`}>{index + 1}</span>

                {/* start and end time inputs  */}
                <div className='flex flex-col'>
                    <p className={`text-xs text-gray-500`}>Start and End time</p>
                    <div className={`flex gap-2`}>
                        <StyledInput
                            type='time'
                            name={`${name}.start_time`}
                            onChange={handleChange}
                            value={data.start_time}
                            size={"small"}
                            className={Style.time_input}
                        />
                        <TrendingFlatIcon className='text-gray-300 mt-2' />
                        <StyledInput
                            type='time'
                            name={`${name}.end_time`}
                            onChange={handleChange}
                            value={data.end_time}
                            size={"small"}
                            className={Style.time_input}
                        />
                    </div>
                </div>

                <StyledInput
                    type='number'
                    size={"small"}
                    name={`${name}.avg_no_of_patients`}
                    value={data.avg_no_of_patients}
                    onChange={handleChange}
                    label='Average no of Patients'
                    isPositive
                />
            </div>

            <CustomButton
                iconButton
                size='small'
                variant='text'
                color='danger'
                boxShadow={false}
                className={`mb-2`}
                onClick={handleDelete}
            >
                <Delete fontSize='small' />
            </CustomButton>
        </div>
    )
}

export default TimingSlot