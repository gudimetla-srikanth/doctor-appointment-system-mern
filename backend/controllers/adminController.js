const userModel = require('../models/userSchema')
const doctorModel = require('../models/doctorSchema')

const doctorAccepts = async (req, res) => {
    try {
        const isAdmiData = await userModel.findOne({ _id: req.body.authId })
        const doctorData = await doctorModel.find({})
        let checkDoctor = false
        let mapdc = doctorData?.map((item) => {
            if (item.email === isAdmiData.newDoctor[req.body.indexVal].email || item.userId === isAdmiData.newDoctor[req.body.indexVal].userId) {
                checkDoctor = true
            }
        })
        if (checkDoctor) {
            return res.status(200).send({ message: 'doctor existed with the details', success: false })
        }
        const doctorDataCreating = await doctorModel.create(isAdmiData.newDoctor[req.body.indexVal])
        if (!doctorDataCreating) {
            return res.status(200).send({ message: 'Doctor Registartion failed', success: false })
        }
        const current = new Date()
        await userModel.updateOne({ _id: isAdmiData.newDoctor[req.body.indexVal].userId }, {
            $push: {
                notifications: {
                    message: 'registration of your doctor proposal is successfull'
                }
            }
        })
        await userModel.updateOne({ _id: isAdmiData.newDoctor[req.body.indexVal].userId }, {
            isDoctor: true
        })
        const doctorDatadeletion = isAdmiData.newDoctor.filter((item, index) => {
            if (index !== req.body.indexVal) {
                return item
            }
        })
        await userModel.updateOne({ _id: req.body.authId }, { newDoctor: doctorDatadeletion })
        return res.status(200).send({ message: 'Doctor Registartion success', success: true })
    } catch (error) {
        return res.status(500).send({ message: error, success: false })
    }
}
const doctorRejects = async (req, res) => {
    try {
        const isAdmiData = await userModel.findOne({ _id: req.body.authId })
        const doctorDatadeletion = isAdmiData.newDoctor.filter((item, index) => {
            if (index !== (req.body.indexVal)) {
                return item
            }
        })
        const specificData = isAdmiData.newDoctor[req.body.indexVal].userId
        await userModel.updateOne({ _id: specificData }, {
            $push: {
                notifications: {
                    message: 'registration of your doctor proposal is rejected'
                }
            }
        })
        const isAdminUpdate = await userModel.updateOne({ _id: req.body.authId }, { newDoctor: doctorDatadeletion })
        if (!isAdminUpdate.modifiedCount) {
            return res.status(200).send({ message: 'Doctor deletion failed', success: false })
        }
        return res.status(200).send({ message: 'Doctor deletion success', success: true })
    } catch (error) {
        console.log("error occured")
        return res.status(500).send({ message: error, success: false })
    }
}

module.exports = { doctorAccepts, doctorRejects }