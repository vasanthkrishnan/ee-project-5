import React from 'react'
import { Toaster, toast } from 'sonner'
import { useEffect } from 'react';
import { Check, X } from 'lucide-react';
import StudentNavbar from './component/StudentNavbar';
import { Navigate, Route, Routes } from 'react-router-dom';
import StudentWebLayout from './layouts/StudentWebLayout';
import Attendance from './pages/Attendance';


export const Student = () => {
  useEffect(() => {
    toast.success("Student Login Successful !", {
      className: 'bg-green-500 rounded-lg shadow-lg text-white p-3 flex gap-5 text-lg font-bold',
      icon: <Check />,
      duration: 1000,
    })
  },[])
  return (
    <>
    <Toaster position='top-right' richColors />
    <Routes>
      <Route element= { <StudentWebLayout /> }> 
        <Route path='attendance' element= { <Attendance /> } />
        <Route path="/" element={<Navigate to="attendance" replace />} />
      </Route>
    </Routes>
    </>
  )
}

export default Student
