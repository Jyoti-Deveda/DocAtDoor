import ConfirmDialog from '@/components/ConfirmDialog/ConfirmDialog'
import CustomButton from '@/components/CustomButton/CustomButton'
import Add from '@mui/icons-material/Add'
import React, { useState } from 'react'

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

    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <div className={`flex flex-col gap-4 p-2 border-2 border-dashed border-black-600`}>
            <div className={`flex justify-between gap-4 items-center`}>

                <p className={`text-md font-bold ${data[date]?.isHoliday ? 'text-red-500' : 'text-gray-500'}`}>{date}</p>

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
                        onClick={() => setShowConfirm(true)}
                    >
                        Apply to all days
                    </CustomButton>

                    <label className={`flex gap-2 items-center text-gray-500 text-sm`}>
                        <input
                            onChange={(e) => handleChange(e, true)}
                            name={`${date}.isHoliday`}
                            checked={data[date]?.isHoliday}
                            type="checkbox"
                            value={data[date]?.isHoliday}
                        />
                        is off day?
                    </label>
                </div>

            </div>

            <div className={`flex flex-col gap-4`}>
                {children}
            </div>

            <ConfirmDialog
                open={showConfirm}
                setOpen={setShowConfirm}
                question={'Are you sure you want to apply this day\'s slots to all days?'}
                heading='Confirm Apply To All'
                action={onApplyToAll}
            />

        </div>
    )
}

export default DayContainer