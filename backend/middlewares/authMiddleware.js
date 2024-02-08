const JWT = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1]
        const tokenData = JWT.verify(token, 'srikanth')
        if (!tokenData) {
            return res.status(200).send({ message: 'not authorized', success: false })
        }
        req.body.authId = tokenData.id
        next()

    } catch (error) {
        console.log('error occured at middleware')
        return res.status(500).send({ message: error, success: false })
    }
}

module.exports = auth