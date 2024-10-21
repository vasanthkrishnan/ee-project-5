import React, { useRef, useState } from 'react'
import Logo from '../assets/img/logo.png'
import { useNavigate } from 'react-router-dom'
import { Loader, Check, AlertTriangle } from 'lucide-react'
import { toast, Toaster } from 'sonner'


export const Login = () => {

  const navigate = useNavigate()
  const nameRef = useRef(null)
  const passwordRef = useRef(null)
  const roleRef = useRef(null)

  const [loader, setLoader] = useState(false)
  
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const role = roleRef.current.value

    if(role === "Select Role") {
      toast.error("Role is Required !", {
        className: 'bg-green-500 rounded-lg shadow-lg text-white p-3 flex gap-5 text-lg font-bold',
        icon: <AlertTriangle />,
        duration: 1000,
      })
      return
    }
    const loginData = {
      email : nameRef.current.value,
      password : passwordRef.current.value,
      role : role,
    }
    try {
      const response = await fetch('http://localhost:5555/login', {
        method : 'POST',
        headers : { 'Content-Type': 'application/json'},
        body : JSON.stringify(loginData)
      })

      const ADMIN_ROLE = 'admin'
      const STUDENT_ROLE = 'student'
        if(response.ok) {
        const data = await response.json()
        if(data.role.toLowerCase() === ADMIN_ROLE.toLowerCase()) {
          setLoader(true)
          setTimeout(() => {
            setLoader(false)
            navigate('../admin/Admin.jsx')
          },1000)
        }
        else if(data.role.toLowerCase() === STUDENT_ROLE.toLowerCase()) {
          setLoader(true)
          setTimeout(() => {
            setLoader(false)
            navigate('../student/Student.jsx')
          }, 1000);
        }
      }
    else {
      const errorDate = await response.json()
      toast.error(errorDate.message, {
        className: 'bg-green-500 rounded-lg shadow-lg text-white p-3 flex gap-5 text-lg font-bold',
        icon: <AlertTriangle />,
        duration: 1000,
      })
    }
    } catch (error) {
      toast.error("Login Error !", {
        className: 'bg-green-500 rounded-lg shadow-lg text-white p-3 flex gap-5 text-lg font-bold',
        icon: <AlertTriangle />,
        duration: 1000,
      })
    }
  }
  return (
    <>
      <Toaster position='top-right' richColors />
        <div className='h-screen w-screen flex justify-center items-start mt-[4rem]'>
            <div className='h-[55%] w-[47%] flex flex-col border border-gray-300 '>
                <div className='h-[30%] w-full bg-[#f5f5f5] border-b border-gray-300'>
                    <img src= { Logo } alt="logo" />
                </div>
                <div className='h-[70%] w-full flex justify-center items-center'>
                  <form onSubmit={ handleFormSubmit } className='h-full w-[50%] flex flex-col mt-[3rem] gap-5 justify-start items-center'>
                    <input ref={ nameRef } className='border-gray-500 border p-[.5rem] h-[2.5rem] w-[20rem]' type="text" name="" placeholder='Username' required />
                    <input ref={ passwordRef  } className='border-gray-500 border p-[.5rem] h-[2.5rem] w-[20rem]' type="password" name="" placeholder='Password' required />
                    <select ref={ roleRef } className='border-gray-500 border p-[.5rem] h-[2.5rem] w-[20rem]'>
                      <option>Select Role</option>
                      <option value="student">Student</option>
                      <option value="admin">Admin</option>
                    </select>
                    <button type='submit' className='p-[.5rem] h-[3rem] w-[20rem] bg-[#008000] hover:bg-[#005700] text-white font-bold text-lg'>Log in</button>
                  </form>
                </div>
            </div>
        </div>
        {
          loader && (
            <div className='fixed top-5 left-1/2 transform -translate-x-1/2'>
              <Loader className='animate-spin text-gray-700' size={32} />
            </div>
          )
        }
    </>
  )
}

export default Login
