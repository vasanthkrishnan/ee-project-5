import React, { useRef } from 'react'
import Logo from '../assets/img/logo.png'

export const Login = () => {
  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const roleRef = useRef(null)

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const loginData = {
      name : nameRef.current.value,
      email : emailRef.current.value,
      role : roleRef.current.value
    }
    try {
      const response = await fetch('/login', {
        method : 'POST',
        headers : { 'Content-Type': 'application/json'},
        body : JSON.stringify(loginData)
      })

      const data = await response.json()
      if(data.role === 'admin') {
        console.log("Admin login successful")
      }
      else if(data.role === 'student') {
        console.log("Student login successful")
      }
    } catch (error) {
      console.log("login error" + error.message)
    }
  }
  return (
    <>
        <div className='h-screen w-screen flex justify-center items-start mt-[4rem]'>
            <div className='h-[50%] w-[47%] flex flex-col border border-gray-300 '>
                <div className='h-[30%] w-full bg-[#f5f5f5] border-b border-gray-300'>
                    <img src= { Logo } alt="logo" />
                </div>
                <div className='h-[70%] w-full flex justify-center items-center'>
                  <form onSubmit={ handleFormSubmit } className='h-full w-[50%] flex flex-col mt-[3rem] gap-5 justify-start items-center'>
                    <input ref={ nameRef } className='border-gray-500 border p-[.5rem] h-[2.5rem] w-[20rem]' type="text" name="" placeholder='Username' id="" />
                    <input ref={ emailRef  } className='border-gray-500 border p-[.5rem] h-[2.5rem] w-[20rem]' type="password" name="" placeholder='Password' id="" />
                    <select ref={ roleRef } className='border-gray-500 border p-[.5rem] h-[2.5rem] w-[20rem]'>
                      <option>Select Role</option>
                      <option>Student</option>
                      <option>Warden</option>
                    </select>
                    <button className='p-[.5rem] h-[3rem] w-[20rem] bg-[#008000] text-white font-bold text-lg'>Log in</button>
                  </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default Login
