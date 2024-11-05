const mongoose = require('mongoose')

const attendanceSchema = new mongoose.Schema({
    name : String,
    date : String,
    isPresent : Boolean,
    timeStamp : Date,
    block: String,
    room: String,
})

const attendance = mongoose.model("attendance", attendanceSchema)
module.exports = attendance