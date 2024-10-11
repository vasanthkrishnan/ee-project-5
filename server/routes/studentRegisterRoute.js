const express = require('express')
const router = express.Router()
const Student = require('../models/studentRegisterModel')

router.post('/add', async (req, res) => {
    try {
        const newStudentRegisterData = new Student(req.body)
        const { firstName, lastName, department, year, block, room, macOne, macTwo, email, password, phone, role } = newStudentRegisterData
        const saveStudentRegisterData = await newStudentRegisterData.save()
        res.status(200).json(saveStudentRegisterData)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

module.exports = router