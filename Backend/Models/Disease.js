const mongoose = require('mongoose')

const diseaseSchema = new mongoose.Schema({
    diseaseName: {
        type: String,
        requred: true
    },
    //list of doctors specialized in the disease
    doctors: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    //list of patients suffering the disease
    patients: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
})

module.exports = mongoose.model('Disease', diseaseSchema)