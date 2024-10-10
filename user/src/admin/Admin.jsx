import { Check, Menu } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast, Toaster } from 'sonner'
import AdminNavbar from './component/AdminNavbar'

export const Admin = () => {


  useEffect(() => {
    toast.success("Admin Login Successful !",{
      className: 'bg-green-500 rounded-lg shadow-lg text-white p-3 flex gap-5 text-lg font-bold',
      icon: <Check />,
      duration: 1000,
    }
    )
  },[])
  return (
    <>
    <Toaster position='top-right' richColors />
    <AdminNavbar />
    </>
  )
}
export default Admin
