const express = require('express')
const router = express.Router()
const Attendance = require('../models/attendanceModel')
const Student = require('../models/studentRegisterModel')

router.post('/check', async (req, res) => {
    const { name } = req.body; 

    const date = new Date().toDateString(); 
    try {
        const attendance = await Attendance.findOne({ name, date });
        if (attendance) {
            return res.status(400).json({ message: "Attendance is already recorded." });
        }
        return res.status(200).json({ message: "Attendance not recorded yet." });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.post('/add', async (req, res) => {
    const { name, date, isPresent, block, room, year, firstName, lastName } = req.body
    const timeStamp = new Date()

    try {
        let attendance = await Attendance.findOne({ name, date })
        if(attendance) {
            return res.status(400).json({message: 'Already Recorded'})
        }
        else {
            attendance = new Attendance({ name, date, isPresent, timeStamp, block, room, year, firstName, lastName })
            await attendance.save()
            return res.status(200).json({message: 'Attendance is Recorded'})
        }
    } catch (error) {
        return res.status(500).json(error.message)
    }
})


router.post('/get', async (req, res) => {
    const { email } = req.body
    if(!email) {
        return res.status(400).json({ message: "Email is required"})
    }
    try {
        const student = await Student.findOne({ email })
        if(!student) {
            return res.status(404).json({ message: "Student not found"})
        }
        return res.status(200).json({ block: student.block, room: student.room, year: student.year, firstName: student.firstName,lastName: student.lastName })
    } catch (error) {
        return res.status(500).json({ message: "Server error"})
    }
})

router.get('/get', async (req, res) => {
    try {
        const fetchedData = await Attendance.find()
        return res.status(200).json(fetchedData)
    } catch (error) {
        return res.status(500).json({ message: error.message})
    }
})

module.exports = router