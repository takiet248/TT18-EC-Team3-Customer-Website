const express = require('express')
const userRouter = require('./routers/user')
const port = process.env.PORT
require('./database/data')


const app = express()

app.use(express.json())

app.use(userRouter)

app.get('/', function (req, res){
    res.send("hello")
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})