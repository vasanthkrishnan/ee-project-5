const mongoose = require('mongoose')

const loginSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ['Student', 'Warden'],
        required : true
    }
})


const login = mongoose.model("users", loginSchema)
module.exports = login
