import axios from "axios"

const Api = "http://localhost:5555"

const addStudentData = (studentData) => axios.post(`${Api}/logins/add`, studentData)

export { addStudentData }