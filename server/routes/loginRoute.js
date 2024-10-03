const express = require ('express')
const User = require('../models/loginModel');
const { compare } = require('bcrypt');
const app = express();

app.use(express.json())
app.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
         if(!user) {
            return res.status(404).json({ message : "User not found"})
         } 

         const isMatch = await compare(password, user.password)
         if(!isMatch) {
            return res.status(404).json({ message : "Invalid Credentails !"})
         }

         if(user.role === 'admin') {
            res.status(200).json({ message : "Admin login Sucessfully", role : 'admin'})
         }
         else if(user.role === 'student') {
            res.status(200).json({ message : "Student login successfully", role : 'student'})
         }
         else {
            res.status(400).json({ message : "Invalid role"})
         }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message : "Server error" })
    }
})

