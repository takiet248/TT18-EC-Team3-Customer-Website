const express = require('express')
const User = require('../models/user')
const auth = require('../middlewares/auth')
const jwt = require('jsonwebtoken')
const config = require('../config')
const { send } = require('process')

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
        res.status(400).send({error})
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
            const access = jwt.sign({_id : user._id, session : token}, config.secret, {
                expiresIn : config.tokenLife,
            })
            res.status(201).send({access})
        }
    } catch (error) {
        res.status(400).send({error})
    }
})

router.post('/api/customer/log-out', auth, async(req, res) => {
    try {
        console.log(req)
        req.user.sessions = req.user.sessions.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.status(201).send({"message" : "Success"})
    } catch (error){
        res.status(500).send({error})
    }
})

router.post('/api/customer/log-in', async(req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.findByCredentials(email, password)
        if (!user){
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const [access, session] = await user.generateAuthToken()
        res.status(201).send({ access, session })
    } catch (error){
        console.log(error)
        res.status(400).send({error : 'Login failed! Check authentication credentials'})
    }
})

module.exports = router;