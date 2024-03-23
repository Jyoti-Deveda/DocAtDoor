import DateSelector from '@/components/Common/DateSelector/DateSelector'
import TimeSelector from '@/components/Common/TimeSelector/TimeSelector'
import SettingsFormContainer from '@/components/Common/settingsFormContainer/SettingsFormContainer'
import CustomButton from '@/components/CustomButton/CustomButton'
import React, { useState } from 'react'
import { dummyData } from './dummyData'

const BookAppointment = () => {


    // this will be selected by patient 
    const [data, setData] = useState({
        date: "",
        time: ""
    })

    // dates and time slots data fetched from the doctor 
    const availableData = dummyData;

    return (
        <SettingsFormContainer title='Book Appointment'>

            <DateSelector
                data={data}
                setData={setData}
                availableData={availableData}
            />

            {/* time selector  */}
            <TimeSelector
                data={data}
                setData={setData}
                availableData={availableData}
            />

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