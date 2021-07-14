const express = require('express')
const User = require('../models/user')
const auth = require('../middlewares/auth')
const jwt = require('jsonwebtoken')
const config = require('../config')

const router = express.Router()

router.post('/api/customer/register', async (req, res) => {
    // Create a new user
    console.log("User called");
    try {
        const user = new User(req.body)
        await user.save()
        const [access, session] = await user.generateAuthToken()
        res.status(201).send({ access, session })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/api/customer/user-me', auth, async(req, res) => {
    // View logged in user profile
    res.send(req.user)
})

router.post('/api/customer/refresh-token', async(req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '')
    try{
        const data = jwt.verify(token, config.refreshTokenSecret)
        const user = await User.findOne({ _id: data._id, 'sessions.token': token })
        if (!user) {
            res.status(401).send({'message' : 'Unauthorized'})
        } else {
            const token = jwt.sign({_id : user._id}, config.secret, {
                expiresIn : config.tokenLife,
            })
            res.status(201).send({token})
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router;