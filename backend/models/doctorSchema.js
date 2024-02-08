const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phNo: {
        type: String,
        required: true
    },
    specilization: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    feeForConsultation: {
        type: String,
        required: true
    },
    timings: {
        type: String,
        required: true
    },
    appointments: {
        type: Array,
        default: []
    }
})

const doctorModel = new mongoose.model('doctor', doctorSchema)

module.exports = doctorModel