const express = require ('express')
const router = express.Router()
const User = require('../models/loginModel');




router.post('/', async (req, res) => {
   console.log("Login route hit")
    const { email, password, role } = req.body
    if(!role) {
      return res.status(400).json({message : "Role is required"})
    }
    try {
        const user = await User.findOne({ email })
         if(!user) {
            return res.status(404).json({ message : "User not found"})
         } 
         console.log("User found:", user);
         console.log("Password from request:", password);
         // const isMatch = password === user.password
         // if(!isMatch) {
         //    return res.status(401).json({ message : "Invalid Credentails !"})
         // }

         if( user.role && user.role.toLowerCase() === role.toLowerCase()) {
            return res.status(200).json({ message: `${role} login successful`, role: user.role });
         }
         else {
            return res.status(400).json({ message : "Invalid role"})
         }
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message : "Server error" })
    }
})

module.exports = router

