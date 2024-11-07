import React from 'react'
import { Toaster, toast } from 'sonner'
import { useEffect } from 'react';
import { Check, X } from 'lucide-react';
import StudentNavbar from './component/StudentNavbar';
import { Navigate, Route, Routes } from 'react-router-dom';
import StudentWebLayout from './layouts/StudentWebLayout';
import Attendance from './pages/Attendance';


export const Student = () => {

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
