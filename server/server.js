require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const dbConnection = require('./config/db')
const login = require('./routes/loginRoute')
const student = require('./routes/studentRegisterRoute')

app.use(express.json())
app.use(cors())

const port = process.env.PORT || 7777

app.use('/login', login)
app.use('/logins', student)

app.get('/', (req, res) => {
    res.status(200).json("Welcome")
})

app.listen(port, () => {
    console.log(`Running in port ${port}`)
})