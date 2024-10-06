import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './login/Login'
import Admin from './admin/Admin'
import Student from './student/Student'

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Login /> } />
          <Route path='/admin/Admin.jsx' element={ <Admin /> } />
          <Route path='/student/Student.jsx' element= {<Student />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
