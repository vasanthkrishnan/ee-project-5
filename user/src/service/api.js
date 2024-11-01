import axios from "axios"

const Api = "http://localhost:5555"

const addStudentData = (studentData) => axios.post(`${Api}/logins/add`, studentData)
const getStudentData = () => axios.get(`${Api}/logins/all`)
const deleteStudentData = (id) => axios.delete(`${Api}/logins/delete/${id}`)
const editStudentData = (id, studentData) => axios.put(`${Api}/logins/edit/${id}`, studentData)
const addAttendance = (id, attendanceData) => axios.post(`${Api}/attendance/add/${id}`, attendanceData)

export { addStudentData, getStudentData, deleteStudentData, editStudentData, addAttendance }