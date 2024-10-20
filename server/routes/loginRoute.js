const express = require('express')
const fetch = require('node-fetch')
const os = require('os')
const router = express.Router()
const User = require('../models/loginModel')

const allowedWifiIp = "10.1.5.114"

router.post('/', async (req, res) => {
    try {
        const userIp = getPrivateIpAddress()
        console.log('User Private IP:', userIp)

        const { email, password, role } = req.body
        if (!role) {
            return res.status(400).json({ message: "Role is required" })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        // const isMatch = await user.comparePassword(password)
        // if (!isMatch) {
        //     return res.status(401).json({ message: "Invalid Credentials!" })
        // }

        if (role.toLowerCase() === 'student') {
         if (userIp === allowedWifiIp) {
             return res.status(200).json({ message: "Student login successful", role: user.role })
         } else {
             return res.status(403).json({ message: "Please Connect to Hostel Wifi" })
         }
     } 

        if (user.role && user.role.toLowerCase() === role.toLowerCase()) {
            return res.status(200).json({ message: `${role} login successful`, role: user.role })
        } else {
            return res.status(400).json({ message: "Invalid role" })
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Server error" })
    }
});

function getPrivateIpAddress() {
    const networkInterfaces = os.networkInterfaces()
    for (const interfaceKey in networkInterfaces) {
        const networkInterface = networkInterfaces[interfaceKey]
        for (const net of networkInterface) {
            if (net.family === 'IPv4' && !net.internal) {
                return net.address
            }
        }
    }
    return null;
}

module.exports = router;
