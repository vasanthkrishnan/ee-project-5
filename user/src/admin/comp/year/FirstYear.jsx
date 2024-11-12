import React, { useState, useEffect } from 'react'
import { AlertTriangle, Check, User } from 'lucide-react'
import { getAttendanceData } from '../../../service/api'
import { Toaster, toast } from 'sonner'

const FirstYear = () => {
  const [studentData, setStudentData] = useState([])
  const [filteredData, setFilteredData] = useState([])

  const fetchStudentData = async () => {
    try {
      const { data } = await getAttendanceData()
      const today = new Date().toDateString()

      const filtered = data.filter((student) => {
        return (
          student.block && 
          student.year === 1 && 
          new Date(student.date).toDateString() === today
        )
      })

      setFilteredData(filtered)
      setStudentData(filtered)
    } catch (error) {
      toast.error(error.message, {
        className: 'bg-red-500 rounded-lg shadow-lg text-white p-3 flex gap-5 text-lg font-bold',
        icon: <AlertTriangle />,
        duration: 1000,
      })
    }
  }

  useEffect(() => {
    fetchStudentData()
  }, [])

  return (
    <>
      <Toaster position='top-right' richColors />
      <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
        {
          filteredData.length !== 0 ? (
            filteredData.map((student, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md flex flex-col items-center m-4">
                <User className="text-gray-500" size={64} />
                
                <div className="text-center mt-4">
                  <h2 className="text-2xl font-semibold text-gray-800">{ student.name}</h2>
                  <p className="text-gray-600">{student.firstName + " " + student.lastName}</p>
                </div>
                
                <div className="w-full mt-6">
                  <div className="flex justify-between border-b py-2">
                    <span className="text-gray-500">Block</span>
                    <span className="text-gray-800 font-medium">{student.block}</span>
                  </div>
                  <div className="flex justify-between border-b py-2">
                    <span className="text-gray-500">Room Number</span>
                    <span className="text-gray-800 font-medium">{student.room}</span>
                  </div>
                  <div className="flex justify-between border-b py-2">
                    <span className="text-gray-500">Year</span>
                    <span className="text-gray-800 font-medium">{student.year}</span>
                  </div>
                  <div className="flex justify-between border-b py-2">
                    <span className="text-gray-500">Date</span>
                    <span className="text-gray-800 font-medium">{student.date}</span>
                  </div>
                  <div className="flex justify-between border-b py-2">
                    <span className="text-gray-500">Time</span>
                    <span className="text-gray-800 font-medium">
                      {new Date(student.timeStamp).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                      })}
                    </span>
                  </div>
                  
                  <div className="flex justify-between py-2 items-center">
                    <span className="text-gray-500">Status</span>
                    <span className="text-gray-800 font-medium flex items-center">
                      {student.isPresent ? (
                        <>
                          <Check className="text-green-500 mr-1" size={16} /> Present
                        </>
                      ) : (
                        'Absent'
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='text-gray-600 text-lg font-medium mt-10'>
              No Attendance Recorded in First Year
            </div>
          )
        }
      </div>
    </>
  )
}

export default FirstYear
