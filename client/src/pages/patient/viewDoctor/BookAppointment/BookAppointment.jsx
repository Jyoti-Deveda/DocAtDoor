import DateSelector from '@/components/Common/DateSelector/DateSelector'
import SettingsFormContainer from '@/components/Common/settingsFormContainer/SettingsFormContainer'
import CustomButton from '@/components/CustomButton/CustomButton'
import React, { useState } from 'react'

const BookAppointment = () => {

    const [data, setData] = useState({
        date: "",
        time: ""
    })

    return (
        <SettingsFormContainer title='Book Appointment'>

            <DateSelector
                data={data}
                setData={setData}
            />

            {/* time selector  */}
            <p>Time selection will be here </p>

            <div>
                <CustomButton
                    variant='contained'
                    color='primary'
                    size='small'
                >
                    Book Appointment
                </CustomButton>
            </div>
        </SettingsFormContainer>
    )
}

export default BookAppointment