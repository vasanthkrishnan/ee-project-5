import axios from "axios"

const Api = "http://localhost:5555"

const addStudentData = (studentData) => axios.post(`${Api}/logins/add`, studentData)
const getStudentData = () => axios.get(`${Api}/logins/all`)
const deleteStudentData = (id) => axios.delete(`${Api}/logins/delete/${id}`)
const editStudentData = (id, studentData) => axios.put(`${Api}/logins/edit/${id}`, studentData)
const getStudentDetails = (email) => axios.post(`${Api}/attendance/get`, email)

const checkAttendance = (attendanceData) => axios.post(`${Api}/attendance/check`, attendanceData)
const addAttendance = (attendanceData) => axios.post(`${Api}/attendance/add`, attendanceData)
const getAttendanceData = () => axios.get(`${Api}/attendance/get`)

export { addStudentData, getStudentData, deleteStudentData, editStudentData, addAttendance, checkAttendance, getStudentDetails, getAttendanceData }