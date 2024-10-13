import { Check } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast, Toaster } from 'sonner'
import AdminNavbar from './component/AdminNavbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import WebLayout from './layouts/WebLayout'
import RegisterStudent from './pages/RegisterStudent'
import StudentCompilents from './pages/StudentCompilents'
import Attendance from './pages/Attendance'
import Student from './pages/Student'

export const Admin = () => {


  useEffect(() => {
    toast.success("Admin Login Successful !",{
      className: 'bg-green-500 rounded-lg shadow-lg text-white p-3 flex gap-5 text-lg font-bold',
      icon: <Check />,
      duration: 1000,
    })
  },[])
  return (
    <>
      <Toaster position='top-right' richColors />
      <AdminNavbar />
        <Routes>
          <Route element={ <WebLayout /> }>
            <Route  path='studentcomplients' element={ <StudentCompilents />} />
            <Route path='registerstudent' element={ <RegisterStudent />} />
            <Route path='attendance' element={ <Attendance />} />
            <Route path='student' element= { <Student />} />
          </Route>
        </Routes>
    </>
  )
}
export default Admin
