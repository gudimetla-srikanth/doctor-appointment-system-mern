const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isDoctor: {
        type: Boolean,
        default: false
    },
    notifications: {
        type: Array,
        default: []
    },
    seenNotifications: {
        type: Array,
        default: []
    },
    newDoctor: {
        type: Array,
        default: []
    }
})

const userModel = new mongoose.model('user', userSchema)

module.exports = userModel