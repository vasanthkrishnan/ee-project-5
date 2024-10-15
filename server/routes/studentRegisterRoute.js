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

router.get('/all', async (req, res) => {
    try {
        const fetchedData = await Student.find()
        res.status(200).json(fetchedData)
    } catch (error) {
        res.status(400).json(error.message)
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id
        const currentData = await Student.findById({_id: id})
        if(!currentData) {
            res.status(500).json("No data Available")
        }
        const deleteData = await Student.findByIdAndDelete(id)
        res.status(200).json(deleteData)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

module.exports = router