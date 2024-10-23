import React from 'react'
import { Outlet } from 'react-router-dom'
import StudentNavbar from '../component/StudentNavbar'

export const StudentWebLayout = () => {
  return (
    <>
        <div className='h-screen w-screen overflow-x-hidden'>
        <StudentNavbar />
            <div className='h-[92vh] w-screen'>
                    <Outlet />
            </div>
        </div>
    </>
  )
}

export default StudentWebLayout
