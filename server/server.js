require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const dbConnection = require('./config/db')
const login = require('./routes/loginRoute')
const student = require('./routes/studentRegisterRoute')
const User = require('./models/loginModel')
const twilio = require('twilio')

const accoundSID = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = new twilio(accoundSID, authToken)

app.use(express.json())
app.use(cors())

const port = process.env.PORT || 7777

app.use('/login', login)
app.use('/logins', student)


app.get('/', () => {
    console.log("Welcome !")
})


app.listen(port, () => {
    console.log(`Running in port ${port}`)
})