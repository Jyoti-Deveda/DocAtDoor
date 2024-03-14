import CustomButton from '@/components/CustomButton/CustomButton'
import Add from '@mui/icons-material/Add'
import React from 'react'

const DayContainer = ({
    children,
    onAdd,
    onApplyToAll,
    index,
    date,
    data,
    setData,
    handleChange,
}) => {
    return (
        <div className={`flex flex-col gap-4 p-2 border border-dashed border-black-400`}>
            <div className={`flex justify-between gap-4 items-center`}>

                <p className={`text-md text-gray-500 `}>{date}</p>

                <div className={`flex gap-4 items-center`}>
                    <CustomButton
                        iconButton
                        size='small'
                        boxShadow={false}
                        rounded
                        variant='text-primary'
                        onClick={onAdd}
                    >
                        <Add fontSize='small' />
                    </CustomButton>
                    <CustomButton
                        variant='underline'
                        color='danger'
                        size='small'
                        boxShadow={false}
                    >
                        Apply to all days
                    </CustomButton>
                </div>

            </div>

            <div className={`flex flex-col gap-4`}>
                {children}
            </div>

        </div>
    )
}

export default DayContainer