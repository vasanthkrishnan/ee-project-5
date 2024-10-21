const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    block: {
        type: String,
        required: true,
    },
    room: {
        type: Number,
        required: true,
    },
    macOne: {
        type: String,
        required: true,
        unique: true,
    },
    macTwo: {
        type: String,
        required: false,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ['student', 'admin'],
        required: true,
    }
})

const student = mongoose.model('logins', studentSchema)
module.exports = student