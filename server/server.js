require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const dbConnection = require('./config/db')
const login = require('./routes/loginRoute')
const student = require('./routes/studentRegisterRoute')
const attendance = require('./routes/attendanceRoute')
const User = require('./models/loginModel')


app.use(express.json())
app.use(cors())

const port = process.env.PORT || 7777

app.use('/login', login)
app.use('/logins', student)
app.use('/attendance', attendance)


app.get('/', () => {
    console.log("Welcome !")
})


app.listen(port, () => {
    console.log(`Running in port ${port}`)
})