const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        personalDetails: {
            firstName: {
                type: String,
                required: true,
                trim: true,
            },
            lastName: {
                type: String,
                required: true,
                trim: true,
            },
            email: {
                type: String,
                required: true,
                trim: true,
            },
            password: {
                type: String,
                required: true,
            },
        },
        additionalDetails: {
            dateOfBirth: {
                type: Date,
            },
            gender: {
                type: String,
            },
            contactNumber: {
                type: String,
                // required: true,
                validate: {
                    validator: function (v) {
                        // Regular expression to match 10-digit phone numbers
                        return /^\d{10}$/.test(v);
                    },
                    message: props => `${props.value} is not a valid 10-digit phone number!`
                }
            },
            //this is users address, not needed during profile creation but can be added later
            address: {
                type: String,
                // required: true,
            }
        },
        //profile image
        image: {
            type: String,
            required: true
        },
        userType: {
            type: String,
            required: true,
            enum: ['patient', 'doctor']
        },
        //this indicates an array of appointments the patient booked
        patientsAppointments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Appointment'
            }
        ],
        //an array of appointments doctor has to attend
        doctorsAppointments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Appointment'
            }
        ],
        verified: {
            type: Boolean,
            default: false,
        },
        verificationToken: {
            type: String,
        },
        tokenExpiry: {
            type: Date,
        }
    },
    { timestamps: true }
)


module.exports = mongoose.model('User', UserSchema);

