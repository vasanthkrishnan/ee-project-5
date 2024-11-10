const express = require('express')
const fetch = require('node-fetch')
const os = require('os')
const router = express.Router()
const User = require('../models/loginModel')

// const allowedWifiIp_A = "10.1.5.114"
const allowedWifiIp_A = "10.1.13.204"
// const allowedWifiIp_C = "10.1.2.238"
const allowedWifiIp_C = "192.168.168.43"

router.post('/', async (req, res) => {
    try {
        const { userIp, mac } = getNetworkInfo()
        const formattedMac = formatMacAddress(mac)

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
            if(user.password === password) {
                if (userIp === allowedWifiIp_C || userIp === allowedWifiIp_A) {
                   if(user.macOne && user.macOne.includes(formattedMac) || user.macTwo && user.macTwo.includes(formattedMac)) {
                       return res.status(200).json({ message: "Student login successful", firstName: user.firstName, lastName: user.lastName, role: user.role, email: user.email })
                   }
                   else {
                       return res.status(403).json({message: "Device is not registered"})
                   }
                } else {
                    return res.status(403).json({ message: "Please Connect to Hostel Wifi" })
                }
            }
            else {
                return res.status(300).json({ message: "Password is wrong !"})
            }
     } 

        if (user.role && user.role.toLowerCase() === role.toLowerCase()) {
            if(user.password === password) {
            return res.status(200).json({ message: `${role} login successful`, role: user.role })
            }
            else {
                return res.status(300).json({ message: "Passwrod is Wrong !"})
            }
        } else {
            return res.status(400).json({ message: "Invalid role" })
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Server error" })
    }
});

function getNetworkInfo() {
    const networkInterfaces = os.networkInterfaces()
    let privateIp = null
    let macAddress = null

    for(const interfaceKey in networkInterfaces) {
        const netInterface = networkInterfaces[interfaceKey]
        for(const net of netInterface) {
            if(net.family === 'IPv4' && !net.internal) {
                privateIp = net.address
                macAddress = net.mac;
                return { userIp : privateIp, mac : macAddress }
            }
        }
    }
    return { userIp : privateIp, mac: macAddress }
}

function formatMacAddress(mac) {
    return mac.split(":").map(segment => segment.toUpperCase()).join('-')
}



module.exports = router;
