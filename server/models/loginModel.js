const mongoose = require('mongoose')

const loginSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true,
    },
    email : {
        type : String,
        required : true,
    },
    role : {
        type : String,
        enum : ['Student', 'Admin'],
        required : true,
    },
    firstName : {
        type: String,
    },
    lastName : {
        type: String,
    },
    mobile: {
        type: Number
    },
    macOne : {
        type : String,
    },
    macTwo: {
        type: String,
    },
    password : {
        type: String
    }
})


const login = mongoose.model("login", loginSchema)
module.exports = login
