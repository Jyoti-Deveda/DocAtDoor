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
            required: true
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
        required: true,
        maxlength: 200
    },
    //will get user's experince by a dropdown of predefined experience periods e.g x<1, 1<x<5 , x>5 where x is years
    experience: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: true
    },
    educationalQualification: [
        {
            university_name: {
                type: String,
                required: true
            },
            course: {
                type: String,
                required: true,
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
            required: true,
        },
        reg_year: {
            type: Date,
            required: true,
        },
        state_medical_council: {
            type: String,
            required: true
        },
    },
    hospitalDetails: {
        name: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        postal_code: {
            type: Number,
            required: true
        },
        contact_info: {
            type: Number,
            trim: true,
        },
        appointment_fee: {
            type: Number,
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
doctorsProfileSchema.post('save', async function(doc) {
    if (doc.workingDays.length > 7) {
        // Remove the older entries to get only the recent 7 days' data
        const recentWorkingDays = doc.workingDays.slice(-7);
        doc.workingDays = recentWorkingDays;
        await doc.save(); // Save the document again to update the workingDays array
    }
});



module.exports = mongoose.model('DoctorsProfile', doctorsProfileSchema);