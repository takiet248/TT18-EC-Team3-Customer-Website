const jwt = require('jsonwebtoken')
const User = require('../models/user')
const config = require('../config')


const auth = async(req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '')
    try {
        console.log(token)
        const data = jwt.verify(token, config.secret)
        console.log(data)
        const user = await User.findOne({ _id: data._id, 'sessions.token': data.session })
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = data.session
        next()
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }

}


module.exports = auth
