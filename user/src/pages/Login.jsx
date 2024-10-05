import React, { useRef } from 'react'
import Logo from '../assets/img/logo.png'

export const Login = () => {
  const nameRef = useRef(null)
  const passwordRef = useRef(null)
  const roleRef = useRef(null)

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const role = roleRef.current.value

    if(role === "Select Role") {
      console.log("Role is required")
      return
    }
    const loginData = {
      email : nameRef.current.value,
      password : passwordRef.current.value,
      role : role,
    }
    console.log(loginData.email)
    console.log(loginData.password)
    console.log(loginData.role)
    try {
      const response = await fetch('http://localhost:5555/login', {
        method : 'POST',
        headers : { 'Content-Type': 'application/json'},
        body : JSON.stringify(loginData)
      })
      if(response.ok) {
        const data = await response.json()
        console.log(`${data.role} login successful`)
      }
    else {
      const errorDate = await response.json()
      console.log("Login failed " + errorDate.message)
    }
    } catch (error) {
      console.log("login error" + error)
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
                    <input ref={ nameRef } className='border-gray-500 border p-[.5rem] h-[2.5rem] w-[20rem]' type="text" name="" placeholder='Username' required />
                    <input ref={ passwordRef  } className='border-gray-500 border p-[.5rem] h-[2.5rem] w-[20rem]' type="password" name="" placeholder='Password' required />
                    <select ref={ roleRef } className='border-gray-500 border p-[.5rem] h-[2.5rem] w-[20rem]'>
                      <option>Select Role</option>
                      <option value="student">Student</option>
                      <option value="admin">Admin</option>
                    </select>
                    <button type='submit' className='p-[.5rem] h-[3rem] w-[20rem] bg-[#008000] text-white font-bold text-lg'>Log in</button>
                  </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default Login
