const mongoose = require('mongoose');

//created a separate schema for additional details of doctor 
//docsProfile contains doctors details and hospital related info

const doctorsProfileSchema = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    specialization:[
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
    bio:{
        type: String,
        required: true,
        maxlength: 200
    },
    //will get user's experince by a dropdown of predefined experience periods e.g x<1, 1<x<5 , x>5 where x is years
    experience:{
        type: String,
        required: true
    },
    educationalQualification:[
        {
            universityName: {
                type:String,
                required: true
            },
            course: {
                type: String,
                required: true,
            },
            certificate: {
                type: String,
                required: true
            }
        },

    ],
    verificationDetails: {
        registrationNum: {
            type: String,
            required: true,
        },
        registrationYear: {
            type: Date,
            required: true,
        },
        stateMedicalCouncil:{
            type: String,
            required: true
        },
    },
    officeDetails:{
        hospitalName: {
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
        postalCode: {
            type: Number,
            required: true
        },
        contact:{
            type: Number,
            maxlength: 10
        },
        // address: {
        //     hospitalName: {
        //         type: String,
        //         required: true
        //     },
        //     city: {
        //         type: String,
        //         required: true
        //     },
        //     state: {
        //         type: String,
        //         required: true
        //     },
        //     postalCode: {
        //         type: Number,
        //         required: true
        //     },
        // },
        // treatments:[
        //     {
        //         name: {
        //             type: String,
        //             required: true
        //         },
        //         desc: {
        //             type: String,
        //             required: true,
        //         },
        //         fees: {
        //             type: Number,
        //             required: true
        //         }

        //     }
        // ],
        offDays: [
            {
                date: Date
            }
        ],
        timeSlots: [
            {
                time: String
            }
        ]
    }

})

module.exports = mongoose.model('DoctorsProfile', doctorsProfileSchema);