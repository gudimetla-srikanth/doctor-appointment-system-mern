const doctorModel = require('../models/doctorSchema')
const userModel = require('../models/userSchema')




const getDoctor = async (req, res) => {
    try {
        const doctorData = await doctorModel.findOne({ userId: req.body.authId })
        if (!doctorData) {
            return res.status(200).send({ message: 'there is no data', success: false })
        }
        return res.status(200).send({ message: 'doctor is in database', data: doctorData, success: true })

    } catch (error) {
        console.log("erro occured")
        return res.status(200).send({ message: error, success: false })
    }
}


const getAllDoctors = async (req, res) => {
    try {
        const doctorData = await doctorModel.find({})
        if (!doctorData) {
            return res.status(200).send({ message: 'there is no data', success: false })
        }
        return res.status(200).send({ message: "all doctors", data: doctorData, success: true })

    } catch (error) {
        console.log("error occured")
        return res.status(200).send({ message: error, success: false })
    }
}
const doctorRegistration = async (req, res) => {
    try {
        const isAdmin = await userModel.findOne({ isAdmin: true })
        if (!isAdmin) {
            return res.status(200).send({ message: 'there is no admin', success: false })
        }
        const userId = req.body.authId
        const { fullName, email, phNo, specilization, experience, feeForConsultation, timings } = req.body
        let checkUser = false
        const doctorData = await doctorModel.find({})
        let mapping = doctorData?.map((item) => {
            if (item.userId === userId || item.email === email) {
                checkUser = true
            }
        })
        if (checkUser) {
            return res.status(200).send({ message: 'doctor already registered with this email id', success: false })
        }
        await userModel.updateOne({ isAdmin: true }, {
            $push: {
                newDoctor: {
                    userId, fullName, email, phNo, specilization, experience, feeForConsultation, timings
                }
            }
        })
        await userModel.updateOne({ isAdmin: true }, {
            $push: {
                notifications: {
                    message: 'New Doctor request Raised with this email id ' + email
                }
            }
        })
        return res.status(200).send({ message: 'Pending for acceptol', success: true })
    } catch (error) {
        console.log("error occured at registration")
        console.log(error)
        return res.status(500).send({ message: error, success: false })
    }
}


module.exports = { getAllDoctors, doctorRegistration, getDoctor }