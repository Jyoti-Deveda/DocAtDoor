const mongoose = require('mongoose')

const ScheduledDaysSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    isHoliday: {
        type: Boolean,
        default: false,
    },
    slots: [
        {
            start_time: {
                type: Date,
                required: true
            },
            end_time: {
                type: Date,
                required: true
            },
            avg_no_of_patients: {
                type: Number,
                required: true
            },
            appointmentsBooked: {
                type: Number,
                default: 0
            },
            isSlotFree: {
                type: Boolean,
                default: true
            }
        }
    ],
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    booked: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('ScheduledDays', ScheduledDaysSchema)