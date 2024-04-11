const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema(
    {
        diseaseNames: [
            {
                type: String,
                requred: true
            }
        ],
        //Doctors with whom appointment is booked
        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        //Patients who booked the appointment
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        scheduledDay: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ScheduledDays' 
        },
        timeslot:{},
        attended: {
            type: Boolean,
            default: false
        },
    },
    {timestamps: true}
)

module.exports = mongoose.model('Appointment', appointmentSchema)