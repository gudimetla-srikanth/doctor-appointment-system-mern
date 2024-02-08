const JWT = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const userModel = require('../models/userSchema')
const doctorModel = require('../models/doctorSchema')
const nodemailer = require("nodemailer")

const userRegistration = async (req, res) => {
    try {
        const userFound = await userModel.findOne({ email: req.body.email })
        if (!userFound) {
            const salt = await bcrypt.genSalt(8)
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            req.body.password = hashedPassword
            await userModel.create(req.body)
            return res.status(200).send({ message: 'user created', success: true })
        }
        return res.status(200).send({ message: 'user exists', success: false })
    } catch (error) {
        console.log('error occured')
        return res.status(500).send({ message: error, success: false })
    }
}
const userLogin = async (req, res) => {
    try {
        const userFound = await userModel.findOne({ email: req.body.email })
        if (!userFound) {
            return res.status(200).send({ message: 'no such user! register yourself', success: false })
        }
        const decodePassword = await bcrypt.compare(req.body.password, userFound.password)
        if (!decodePassword) {
            return res.status(200).send({ message: 'email or password is invalid' })
        }
        const JWTtoken = JWT.sign({ id: userFound._id }, 'srikanth', { expiresIn: '1h' })
        return res.status(200).send({ message: 'user logined', token: JWTtoken, success: true })
    } catch (error) {
        console.log('error occured')
        return res.status(500).send({ message: error, success: false })
    }
}
const userData = async (req, res) => {
    try {
        const userData = await userModel.findOne({ _id: req.body.authId })
        if (!userData) {
            return res.status(200).send({ message: 'there is no data', success: false })
        }
        return res.status(200).send({ message: 'userdata fteched', data: userData, success: true })
    } catch (error) {
        console.log('error occured')
        return res.status(500).send({ message: error, success: false })
    }
}
const userUpdate = async (req, res) => {
    try {
        const userAc = await userModel.updateOne({ _id: req.body.authId }, { $set: { name: req.body.name, email: req.body.email, notifications: req.body.notifications, seenNotifications: req.body.seenNotifications, newDoctor: req.body.newDoctor } })
        if (!userAc.modifiedCount) {
            return res.status(200).send({ message: 'user not updated', success: false })
        }
        return res.status(200).send({ message: 'user updated', success: true })

    } catch (error) {
        console.log('user update error')
        return res.status(500).send({ message: err, success: false })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const allUserData = await userModel.find({})
        if (!allUserData) {
            return res.status(200).send({ message: 'empty data', success: false })
        }
        allUserData.password = undefined
        return res.status(200).send({ message: 'data is fetched', data: allUserData, success: true })
    } catch (error) {
        console.log("error occured")
        return res.status(500).send({ message: error, success: false })
    }
}

const bookingDoctor = async (req, res) => {
    try {
        const { doctorEmail, userEmail, timings, userName } = req.body
        const doctorAp = await doctorModel.updateOne({ email: doctorEmail }, { $push: { appointments: { message: `your appointment booked with patient name ${userName} with gmail ${userEmail} on timings ${timings}`, date: timings } } })
        const userNotification = await userModel.updateOne({ email: userEmail }, { $push: { notifications: { message: `your appointment booked with doctor email ${doctorEmail} on ${timings}` } } })

        if (!userNotification.modifiedCount && !doctorAp.modifiedCount) {
            return res.status(200).send({ message: 'booking is not done', success: false })
        }
        // var transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         user: `${userEmail}`,
        //         pass: 'user password'
        //     }
        // })
        // var mailOptions = {
        //     from: `${userEmail}`,
        //     to: `${doctorEmail}`,
        //     subject: 'Appointment',
        //     text: 'your appointment is booked'
        // }
        // transporter.sendMail(mailOptions, function (error, info) {
        //     if (error) {
        //         console.log(error);
        //     } else {
        //         console.log('Email sent: ' + info.response);
        //     }
        // })
        return res.status(200).send({ message: 'Booking done', success: true })


    } catch (error) {
        console.log("error occured")
        return res.status(500).send({ message: error, success: false })
    }
}

const seenNotifications = async (req, res) => {
    try {
        const userData = await userModel.findOne({ _id: req.body.authId })
        if (userData.notifications.length === 0) {
            return res.status(200).send({ message: 'Notifications already empty', success: false })
        }
        const userChange = await userModel.updateOne({ _id: req.body.authId }, { notifications: [], seenNotifications: userData.notifications })
        console.log(userData.notifications)
        if (!userChange.modifiedCount) {
            return res.status(200).send({ message: 'notifications are not changed', success: false })
        }
        return res.status(200).send({ message: 'notifications changed', success: true })
    } catch (error) {
        console.log("error occured")
        return res.status(500).send({ message: error, success: false })
    }
}
module.exports = { userRegistration, userLogin, userData, userUpdate, getAllUsers, bookingDoctor, seenNotifications }