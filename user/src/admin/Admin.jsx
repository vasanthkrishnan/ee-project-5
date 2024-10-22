import { Check } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast, Toaster } from 'sonner'
import AdminNavbar from './component/AdminNavbar'
import { Routes, Route, Navigate } from 'react-router-dom'
import WebLayout from './layouts/WebLayout'
import RegisterStudent from './pages/RegisterStudent'
import StudentCompilents from './pages/StudentCompilents'
import Attendance from './pages/Attendance'
import Student from './pages/Student'
import ABlockStudent from './comp/Block/ABlockStudent'
import BBlockStudent from './comp/Block/BBlockStudent'
import CBlockStudent from './comp/Block/CBlockStudent'
import DBlockStudent from './comp/Block/DBlockStudent'
import OpenAttendance from './pages/OpenAttendance'

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
        <Routes>
          <Route element={ <WebLayout /> }>
            <Route path='openattendance' element= { <OpenAttendance />} />
            <Route  path='studentcomplients' element={ <StudentCompilents />} />
            <Route path='registerstudent' element={ <RegisterStudent />} />
            <Route path='attendance' element={ <Attendance />} />
            <Route path='student' element= { <Student />} />
            <Route path='ablockstudent' element= { <ABlockStudent />} />
            <Route path='bblockstudent' element= { <BBlockStudent />} />
            <Route path='cblockstudent' element= { <CBlockStudent />} />
            <Route path='dblockstudent' element= { <DBlockStudent />} />
            <Route path="/" element={<Navigate to="openattendance" replace />} />
          </Route>
        </Routes>
    </>
  )
}
export default Admin
