const express = require('express')
const router = express.Router()
const Attendance = require('../models/attendanceModel')

router.post('/attendance/add/:id', async (req, res) => {
    const { name, date, isPresent } = req.body
    const timeStamp = new Date()

    try {
        let attendance = await Attendance.findOne({ name, date })
        if(attendance) {
            return res.status(400).json({message: 'Already Recorded'})
        }
        else {
            attendance = new Attendance({ name, date, isPresent, timeStamp })
            await attendance.save()
            return res.status(200).json({message: 'Attendance is Recorded'})
        }
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

module.exports = router