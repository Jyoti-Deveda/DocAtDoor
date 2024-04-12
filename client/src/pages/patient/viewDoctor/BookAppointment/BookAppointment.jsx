import DateSelector from '@/components/Common/DateSelector/DateSelector'
import TimeSelector from '@/components/Common/TimeSelector/TimeSelector'
import SettingsFormContainer from '@/components/Common/settingsFormContainer/SettingsFormContainer'
import CustomButton from '@/components/CustomButton/CustomButton'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import { bookAppointment } from '@/services/Operations/patient/bookAppointment'

const BookAppointment = ({
    doctorDetails,
    doctorId,
}) => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const diseases = searchParams.get('diseases').split(',');
    // this will be selected by patient 
    const [data, setData] = useState({
        slotId: "",
        date: "",
        time: ""
    });
    const availableData = doctorDetails?.scheduledDays;

    const handleBookAppointment = async () => {

        if (!doctorId || !diseases || diseases.length < 1 || !data.slotId || !data.date || !data.time) {
            toast.error("All fields are required");
            return;
        }

        const dataToSend = {
            doctorId,
            diseases: diseases,
            scheduledDay: data.slotId,
            timeslot: data.time,
        }

        const res = await bookAppointment(dataToSend);

        // navigate to history of appointments where the user can see the appointment details and manage the appintment 
    }

    console.log("🚀 ~ doctordetails:", doctorDetails)
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
                    disabled={!data.slotId || !data.date || !data.time}
                    onClick={handleBookAppointment}
                >
                    Book Appointment
                </CustomButton>
            </div>
        </SettingsFormContainer>
    )
}

export default BookAppointment