import { Check } from 'lucide-react'
import React, { useEffect } from 'react'
import { toast, Toaster } from 'sonner'

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
    <div>Admin</div>
    </>
  )
}
export default Admin
