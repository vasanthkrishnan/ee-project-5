import React, { useRef } from 'react'
import { addStudentData } from '../../service/api'
import { Toaster, toast } from 'sonner'
import { Check } from 'lucide-react'

export const RegisterStudent = () => {

  const firstNameRef = useRef(null)
  const lastNameRef = useRef(null)
  const deptRef = useRef(null)
  const yearRef = useRef(null)
  const blockRef = useRef(null)
  const roomRef = useRef(null)
  const macOneRef = useRef(null)
  const macTwoRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const phoneRef = useRef(null)
  const roleRef = useRef(null)

  const handleStudentData = async (e) => {
    e.preventDefault()
    const studentData = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      department: deptRef.current.value,
      year: yearRef.current.value,
      block: blockRef.current.value,
      room: roomRef.current.value,
      macOne: macOneRef.current.value,
      macTwo: macTwoRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      phone: phoneRef.current.value,
      role: roleRef.current.value
    }
    try {
      const response = await addStudentData(studentData)
      if(response.status === 200) {
        toast.success("Student Added Successfully !", {
          className: 'bg-green-500 rounded-lg shadow-lg text-white p-3 flex gap-5 text-lg font-bold',
          icon: <Check />,
          duration: 1000,
        })
      }
    } catch (error) {
      toast.error(error.message, {
        className: 'bg-red-500 rounded-lg shadow-lg text-white p-3 flex gap-5 text-lg font-bold',
        // icon: <AlertTriangle />,
        duration: 1000,
      })
    }
  }

  return (
    <>
    <Toaster position='top-right' richColors />
        <div className='min-h-screen w-screen mt-20 overflow-y-auto overflow-x-hidden flex justify-center items-start pt-10'>
        <div className='w-full max-w-4xl bg-[#f5f5f5] shadow-lg rounded-md flex justify-center items-center'>
          <form className='w-[90%] py-10 flex flex-col justify-start items-center' onSubmit={handleStudentData}>
            <h3 className='text-3xl font-semibold mb-8'>Student Information</h3>
            <div className='w-full mb-6 flex flex-col md:flex-row gap-6'>
              <input 
                ref={ firstNameRef }
                className='w-full md:w-1/2 p-3 border border-gray-400 rounded-md placeholder-gray-500 placeholder:text-lg hover:border-green-700' 
                type="text" 
                placeholder='First Name' 
                required
              />
              <input 
                ref={ lastNameRef }
                className='w-full md:w-1/2 p-3 border border-gray-400 rounded-md placeholder-gray-500 placeholder:text-lg hover:border-green-700' 
                type="text" 
                placeholder='Last Name' 
                required
              />
            </div>
            <div className='w-full mb-6 flex flex-col md:flex-row gap-6'>
              <input 
                ref={ deptRef }
                className='w-full md:w-1/2 p-3 border border-gray-400 rounded-md placeholder-gray-500 placeholder:text-lg hover:border-green-700' 
                type="text" 
                placeholder='Department' 
                required
              />
              <input 
                ref={ yearRef }
                className='w-full md:w-1/2 p-3 border border-gray-400 rounded-md placeholder-gray-500 placeholder:text-lg hover:border-green-700' 
                type="number" 
                placeholder='Year' 
                required
              />
            </div>
            <div className='w-full mb-6 flex flex-col md:flex-row gap-6'>
              <input 
                ref={ blockRef }
                className='w-full md:w-1/2 p-3 border border-gray-400 rounded-md placeholder-gray-500 placeholder:text-lg hover:border-green-700' 
                type="text" 
                placeholder='Block' 
                required
              />
              <input 
                ref={ roomRef }
                className='w-full md:w-1/2 p-3 border border-gray-400 rounded-md placeholder-gray-500 placeholder:text-lg hover:border-green-700' 
                type="number" 
                placeholder='Room No.' 
                required
              />
            </div>
            <div className='w-full mb-6 flex flex-col md:flex-row gap-6'>
              <input 
                ref={ macOneRef }
                className='w-full md:w-1/2 p-3 border border-gray-400 rounded-md placeholder-gray-500 placeholder:text-lg hover:border-green-700' 
                type="text" 
                placeholder='MAC Addr.-1' 
                required
              />
              <input 
                ref={ macTwoRef }
                className='w-full md:w-1/2 p-3 border border-gray-400 rounded-md placeholder-gray-500 placeholder:text-lg hover:border-green-700' 
                type="text" 
                placeholder='MAC Addr.-2' 
                required
              />
            </div>
            <div className='w-full mb-6 flex flex-col md:flex-row gap-6'>
              <input 
                ref={ emailRef }
                className='w-full md:w-1/2 p-3 border border-gray-400 rounded-md placeholder-gray-500 placeholder:text-lg hover:border-green-700' 
                type="text" 
                placeholder='User name' 
                required
              />
              <input 
                ref={ passwordRef }
                className='w-full md:w-1/2 p-3 border border-gray-400 rounded-md placeholder-gray-500 placeholder:text-lg hover:border-green-700' 
                type="text" 
                placeholder='Password' 
                required
              />
            </div>
            <div className='w-full mb-6 flex flex-col md:flex-row gap-6'>
              <input 
                ref={ phoneRef }
                className='w-full md:w-1/2 p-3 border border-gray-400 rounded-md placeholder-gray-500 placeholder:text-lg hover:border-green-700' 
                type="tel" 
                placeholder='Phone' 
                required
              />
              <select ref={ roleRef } className='w-full md:w-1/2 p-3 border border-gray-400 rounded-md text-gray-700 placeholder-gray-500 placeholder:text-lg hover:border-green-700' required >
                <option value="" hidden>Role</option>
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button 
              className='w-full md:w-1/2 mt-6 p-3 bg-[#008000] text-white rounded-md hover:bg-[#005700] transition-colors duration-300' type="submit">
              Register
            </button>
          </form>
        </div>
      </div>

    </>
  )
}

export default RegisterStudent
