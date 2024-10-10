require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect(process.env.mongodb)

const connection = mongoose.connection
connection.on('connected', () => {
    console.log("Connected")
})

connection.on('error', () => {
    console.log("Error")
})

module.exports = mongoose