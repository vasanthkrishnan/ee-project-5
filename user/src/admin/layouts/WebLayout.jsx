import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavbar from '../component/AdminNavbar'


export const WebLayout = () => {
  return (
    <>
        <div className='h-screen w-screen overflow-x-hidden'>
        <AdminNavbar />
            <div className='h-[92vh] w-screen'>
                <Suspense fallback={"loading..."}>
                    <Outlet />
                </Suspense>
            </div>
        </div>
    </>
  )
}

export default WebLayout
