import { Check, ClipboardListIcon } from 'lucide-react'
import React, { useState } from 'react'

export const OpenAttendance = () => {
    console.log("open attendance redered")
    const [openAttendance, setOpenAttendance] = useState(false)
  return (
    <>
        <div className=' h-full w-full flex flex-row justify-center items-center'>
            <button onClick={() => setOpenAttendance(true)} className='p-3 bg-[#008000] hover:bg-[#005700] shadow-lg rounded-lg font-bold text-white text-xl flex items-center space-x-2 transition-all duration-300'>
            <ClipboardListIcon />
            <span>Open Attendance</span>
            </button>
        </div>
    </>
  )
}

export default OpenAttendance
