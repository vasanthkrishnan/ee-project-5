const mongoose = require('mongoose')

const attendanceSchema = new mongoose.Schema({
    name : String,
    firstName: String,
    lastName: String,
    date : String,
    isPresent : Boolean,
    timeStamp : Date,
    block: String,
    room: String,
    year: Number,
})

const attendance = mongoose.model("attendance", attendanceSchema)
module.exports = attendance