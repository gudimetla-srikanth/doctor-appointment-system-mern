const mongoose = require('mongoose')

const db = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/doc').then(console.log('database connected')).catch(err => console.log(err))
}
module.exports = db