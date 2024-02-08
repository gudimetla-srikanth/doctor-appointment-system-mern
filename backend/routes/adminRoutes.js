const express = require('express')
const { doctorAccepts, doctorRejects } = require('../controllers/adminController')
const auth = require('../middlewares/authMiddleware')
const router = express.Router()

router.post('/accept', auth, doctorAccepts)
router.post('/reject', auth, doctorRejects)

module.exports = router
