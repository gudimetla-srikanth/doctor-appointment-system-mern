const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./config/db')
app.use(cors())
app.use(express.json())
db()
app.use('/doc/user', require('./routes/userRoutes'))
app.use('/doc/doctor', require('./routes/doctorRoutes'))
app.use('/doc/admin', require('./routes/adminRoutes'))
const port = 5000
app.listen(port, () => {
    console.log(`Server connected at port no ${port}`)
})