
const express = require('express')
const { userRegistration, userLogin, userData, userUpdate, getAllUsers, bookingDoctor, seenNotifications } = require('../controllers/userController')
const auth = require('../middlewares/authMiddleware')
const router = express.Router()

router.post('/register', userRegistration)
router.post('/login', userLogin)
router.put('/update', auth, userUpdate)
router.get('/userdata', auth, userData)
router.get('/allusers', auth, getAllUsers)
router.post('/book', auth, bookingDoctor)
router.get('/notifications', auth, seenNotifications)

module.exports = router
