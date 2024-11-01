import React, { useEffect, useState } from 'react'

export const Attendance = () => {
  const [userName, setUserName] = useState(null)
  const canOpenAttendance = localStorage.getItem('isOpen') === 'true'
  useEffect(() => {
    const storedUserName = localStorage.getItem('userName')
    if(storedUserName) {
      setUserName(storedUserName)
    }
  },[])
  return (
    <>
    {
      canOpenAttendance ? (
  <div className="h-full w-full mt-[8vh] flex justify-center items-center bg-gray-100">
    <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
      <div className="text-lg font-semibold text-gray-700">{ userName }</div>
      <input
        className="form-checkbox h-6 w-6 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
        type="checkbox"
        id="attendance"
      />
      <label htmlFor="attendance" className="text-gray-600">
        Present
      </label>
    </div>
  </div>
  ) :(
    <div className="h-full w-full mt-[8vh] flex justify-center items-center bg-gray-100">
          <div className="bg-white rounded-lg shadow-md p-6 text-lg font-semibold text-gray-700">
            Attendance is currently closed.
          </div>
        </div>
  )
}
</>

  )
}

export default Attendance
