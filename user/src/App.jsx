import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './login/Login'
import Admin from './admin/Admin'
import Student from './student/Student'

export const App = () => {
  return (
    <>
    <div className='h-screen w-screen overflow-x-hidden overflow-y-auto'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Login /> } />
          <Route path='/admin/*' element={ <Admin /> } />
          <Route path="*" element={<Navigate to="/admin" replace />} />
          <Route path='/student/*' element= {<Student />} />
        </Routes>
      </BrowserRouter>
    </div>
    </>
  )
}

export default App
