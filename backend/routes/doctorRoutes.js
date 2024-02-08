const express = require('express')
const { doctorRegistration, getAllDoctors, getDoctor } = require('../controllers/doctorController')
const auth = require('../middlewares/authMiddleware')
const router = express.Router()

router.post('/register', auth, doctorRegistration)
router.get('/alldoctors', auth, getAllDoctors)
router.get('/getdoctor', auth, getDoctor)

module.exports = router