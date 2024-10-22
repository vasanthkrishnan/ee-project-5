import React from 'react'
import { Toaster, toast } from 'sonner'
import { useEffect } from 'react';
import { Check, X } from 'lucide-react';
import StudentNavbar from './component/StudentNavbar';


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
    <StudentNavbar />
    </>
  )
}

export default Student
