const mongoose = require('mongoose');

//created a separate schema for additional details of doctor 
//docsProfile contains doctors details and hospital related info

const doctorsProfileSchema = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    specialization: [
        {
            type: String,
        }
    ],
    specializedDiseases: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Disease'
        }
    ],
    bio: {
        type: String,
        default: '',
        maxlength: 200
    },
    //will get user's experince by a dropdown of predefined experience periods e.g x<1, 1<x<5 , x>5 where x is years
    experience: {
        type: String,
    },
    verified: {
        type: Boolean,
        default: true
    },
    educationalQualification: [
        {
            university_name: {
                type: String,
            },
            course: {
                type: String,
            },
            certification: {
                type: String,
                // required: true
            }
        },

    ],
    verificationDetails: {
        reg_number: {
            type: String,
        },
        reg_year: {
            type: Date,
        },
        state_medical_council: {
            type: String,
        },
    },
    hospitalDetails: {
        name: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        postal_code: {
            type: Number,
        },
        contact_info: {
            type: Number,
            trim: true,
        },
        appointment_fee: {
            type: Number,
            default: 0,
            required: true
        },
    },
    workingDays: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ScheduledDays'
        }
    ],
    rating: {
        value: {
            type: Number,
            min: 0,
            max: 5,
            default: 0
        },
        count: {
            type: Number,
            default: 0
        },
        ratedBy: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
                },
                rating: {
                    type: Number,
                    min: 0,
                    max: 5
                }
            }
        ]
    }

})

// Post-save middleware to limit workingDays array to only 7 elements
// doctorsProfileSchema.post('save', async function(doc) {
//     if (doc.workingDays.length > 7) {
//         // Remove the older entries to get only the recent 7 days' data
//         const recentWorkingDays = doc.workingDays.slice(-7);
//         doc.workingDays = recentWorkingDays;
//         await doc.save(); // Save the document again to update the workingDays array
//     }
// });


module.exports = mongoose.model('DoctorsProfile', doctorsProfileSchema);