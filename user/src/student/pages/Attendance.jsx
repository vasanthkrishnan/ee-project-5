import React, { useEffect, useState } from 'react';
import { addAttendance, checkAttendance, getStudentDetails } from '../../service/api';
import { toast, Toaster } from 'sonner';
import { AlertTriangle } from 'lucide-react';

export const Attendance = () => {
    const [userName, setUserName] = useState(null)
    const [isPresent, setIsPresent] = useState(false)
    const [attendanceMessage, setAttendanceMessage] = useState('')
    const [attendanceRecorded, setAttendanceRecorded] = useState(false)
    const [block, setBlock] = useState(null)
    const [room, setRoom] = useState(null)
    const [year, setYear] = useState(null)
    const [firstName, setFirstName] = useState(null)
    const [lastName, setLastName] = useState(null)
    const canOpenAttendance = localStorage.getItem('isOpen') === 'true'

    useEffect(() => {
        const storedUserName = localStorage.getItem('userName')
        if (storedUserName) {
            setUserName(storedUserName)
            fetchStudentDetails(storedUserName)
            checkIfAttendanceRecorded(storedUserName)
        }
    }, []);

    const fetchStudentDetails = async (name) => {
        try {
            const response = await getStudentDetails({ email: name })
            setBlock(response.data.block)
            setRoom(response.data.room)
            setYear(response.data.year)
            setFirstName(response.data.firstName)
            setLastName(response.data.lastName)
        } catch (error) {
            console.log(error.message)
        }
    }

    const checkIfAttendanceRecorded = async (name) => {
        try {
            const response = await checkAttendance({ name })
            setAttendanceMessage(response.data.message)
            if (response.data.recorded) { 
                setAttendanceRecorded(true)
                localStorage.setItem('attendanceRecorded', 'true')
            } else {
                setAttendanceRecorded(false)
                localStorage.removeItem('attendanceRecorded');
            }
        } catch (error) {
            setAttendanceMessage(error.response.data.message)
        }
    }

    const handleAttendance = async () => {
        if (!userName) {
            return
        }

        const attendanceData = {
            name: userName,
            date: new Date().toDateString(),
            isPresent: isPresent,
            block: block,
            room: room,
            year: year,
            firstName: firstName,
            lastName: lastName,
        }

        try {
            const response = await addAttendance(attendanceData)
            setAttendanceMessage('')
            setAttendanceRecorded(true)
            localStorage.setItem('attendanceRecorded', 'true')
            setIsPresent(false)
        } catch (error) {
            toast.error(error.message, {
                className: 'bg-green-500 rounded-lg shadow-lg text-white p-3 flex gap-5 text-lg font-bold',
                icon: <AlertTriangle />,
                duration: 1000,
              })
        }
    };

    useEffect(() => {
        const recorded = localStorage.getItem('attendanceRecorded');
        if (recorded === 'true') {
            setAttendanceRecorded(true)
        }
    }, [])

    return (
        <>
        <Toaster position='top-right' richColors />
        <div className="flex items-center justify-center h-screen bg-gray-200">
            {
                canOpenAttendance ? (
                    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Attendance Record</h2>
                        <div className="text-lg font-semibold text-gray-700 text-center mb-6">{userName}</div>
                        
                        {!attendanceRecorded ? (
                            <>
                                <div className="flex items-center justify-center mb-6">
                                    <input
                                        className="form-checkbox h-6 w-6 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-400 mr-2"
                                        type="checkbox"
                                        id="attendance"
                                        checked={isPresent}
                                        onChange={(e) => setIsPresent(e.target.checked)}
                                    />
                                    <label htmlFor="attendance" className="text-gray-600">Present</label>
                                </div>
                                <button
                                    className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
                                    onClick={handleAttendance}
                                >
                                    Submit
                                </button>
                            </>
                        ) : (
                            <div className="mt-4 text-red-500 text-center">{attendanceMessage}</div>
                        )}
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                        <h2 className="text-2xl font-bold text-center text-gray-800">Attendance Closed</h2>
                        <p className="text-lg text-gray-600 text-center">Attendance is currently closed.</p>
                    </div>
                )
            }
        </div>
        </>
    );
}

export default Attendance
