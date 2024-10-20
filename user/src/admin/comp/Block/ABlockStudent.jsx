import React, { useEffect, useState } from 'react'
import { Check, User, Search } from 'lucide-react'
import { deleteStudentData, editStudentData, getStudentData } from '../../../service/api'
import { Toaster, toast } from 'sonner'

export const ABlockStudent = () => {
    const [studentData, setStudentData] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const [visibleEdit, setVisibleEdit] = useState(false)

    const [firstNameState, setFirstNameState] = useState(null)
    const [lastNameState, setLastNameState] = useState(null)
    const [departmentState, setDepartmentState] = useState(null)
    const [yaerState, setYearState] = useState(null)
    const [blockState, setBlockState] = useState(null)
    const [roomState, setRoomState] = useState(null)
    const [macOneState, setMacOneState] = useState(null)
    const [macTwoState, setMacTwoState] = useState(null)
    const [emailState, setEmailState] = useState(null)
    const [passwordState, setPasswordState] = useState(null)
    const [phoneState, setPhoneState] = useState(null)
    const [roleState, setRoleState] = useState(null)

    const fetchProject = async () => {
        try {
            const { data } = await getStudentData()
            const filtered = data.filter(student => 
                student.role.toLowerCase() === 'student' && student.block.toUpperCase() === 'A'
            )
            setStudentData(filtered)
            setFilteredData(filtered)
        } catch (error) {
            toast.error(error.message, {
                className: 'bg-red-500 rounded-lg shadow-lg text-white p-3 flex gap-5 text-lg font-bold',
                icon: <Check />,
                duration: 3000,
            })
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await deleteStudentData(id)
            if (response.status === 200) {
                toast.success("Deleted!", {
                    className: 'bg-green-500 rounded-lg shadow-lg text-white p-3 flex gap-5 text-lg font-bold',
                    icon: <Check />,
                    duration: 3000,
                })
                fetchProject()
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const handelEdit = async (e) => {
        e.preventDefault()
        const studentData = {
            firstName: firstNameState,
            lastName: lastNameState,
            department: departmentState,
            year: yaerState,
            block: blockState,
            room: roomState,
            macOne: macOneState,
            macTwo: macTwoState,
            email: emailState,
            password: passwordState,
            phone: phoneState,
            role: roleState
        }
        try {
            const response = await editStudentData(id, studentData)
            if(response.status === 200) {
                console.log("Updated")
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase()
        setSearchTerm(value)
        const filtered = studentData.filter(student => {
            const fullName = `${student.firstName} ${student.lastName}`.toLowerCase()
            const phoneNumber = student.phone.toString()
            const roomNumber = student.room.toString()
            const year = student.year.toString()
            const department = student.department.toLowerCase()
            const email = student.email.toLowerCase()
            const mac = `${student.macOne} ${student.macTwo}`.toLowerCase()
            return fullName.includes(value) || phoneNumber.includes(value) || roomNumber.includes(value)
                || year.includes(value) || department.includes(value) || email.includes(value) || mac.includes(value)
        })
        setFilteredData(filtered)
    }

    useEffect(() => {
        fetchProject()
    }, [])

    return (
        <>
            <Toaster position='top-right' richColors />
            <div className='h-full w-full mt-20 flex flex-col items-center'>
                <div className='w-full max-w-[800px] mb-10'>
                    <div className='relative'>
                        <input
                            type='text'
                            value={searchTerm}
                            onChange={handleSearch}
                            placeholder='Search...'
                            className='w-full p-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-500'
                        />
                        <Search className='absolute right-3 top-3 text-gray-400' />
                    </div>
                </div>
                <div className='w-full flex gap-5 flex-wrap justify-center items-start'>
                    {
                        filteredData?.map((data, index) => (
                            <div key={index} className="w-[320px] border border-gray-300 bg-white rounded-lg shadow-lg p-6 transition-transform duration-200 hover:scale-105">
                                <div className="flex items-center mb-4">
                                    <div className="h-[80px] w-[80px] bg-gray-200 rounded-full flex items-center justify-center mr-4">
                                        <User className="h-[40px] w-[40px] text-gray-500" />
                                    </div>
                                    <h2 className="text-lg font-semibold text-gray-800">{ data.firstName + " " + data.lastName }</h2>
                                </div>
                                <div className="w-full border-t border-gray-200 my-3"></div>
                                <div className="flex flex-col w-full text-sm text-gray-700 gap-2">
                                    <div className='text-[.96em]'>
                                        <span className="font-medium">Email:</span> { data.email }
                                    </div>
                                    <div className='text-[.96em]'>
                                        <span className="font-medium">Phone:</span> { data.phone }
                                    </div>
                                    <div className='text-[.96em]'>
                                        <span className="font-medium">Department:</span> { data.department }
                                    </div>
                                    <div className='text-[.96em]'>
                                        <span className="font-medium">Year:</span> { data.year }
                                    </div>
                                    <div className='text-[.96em]'>
                                        <span className="font-medium">Block:</span> { data.block }
                                    </div>
                                    <div className='text-[.96em]'>
                                        <span className="font-medium">Room No:</span> { data.room }
                                    </div>
                                    <div className='text-[.96em]'>
                                        <span className="font-medium">Mac Address 1:</span> { data.macOne }
                                    </div>
                                    <div className='text-[.96em]'>
                                        <span className="font-medium">Mac Address 2:</span> { data.macTwo }
                                    </div>
                                </div>
                                <div className="w-full border-t border-gray-200 my-3"></div>
                                <div className="flex justify-between gap-3">
                                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={() => setVisibleEdit(true)}>Update</button>
                                    <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600" onClick={() => { handleDelete(data._id) }}>Delete</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            {
                visibleEdit &&  (
                    <div className='min-h-screen w-screen mt-20 overflow-y-auto overflow-x-hidden flex justify-center items-start pt-10'>
        <div className='w-full max-w-4xl bg-[#f5f5f5] shadow-lg rounded-md flex justify-center items-center'>
          <form className='w-[90%] py-10 flex flex-col justify-start items-center' onSubmit={handelEdit}>
            <h3 className='text-3xl font-semibold mb-8'>Student Information</h3>
            <div className='w-full mb-6 flex flex-col md:flex-row gap-6'>
              <input 
                value={firstNameState}
                onChange={(e) => setFirstNameState(e.target.value)}
                className='w-full md:w-1/2 p-3 border border-gray-400 rounded-md placeholder-gray-500 placeholder:text-lg hover:border-green-700' 
                type="text" 
                placeholder='First Name' 
                required
              />
              <input 
                value={lastNameState}
                onChange={(e) => setLastNameState(e.target.value)}
                className='w-full md:w-1/2 p-3 border border-gray-400 rounded-md placeholder-gray-500 placeholder:text-lg hover:border-green-700' 
                type="text" 
                placeholder='Last Name' 
                required
              />
            </div>
            <div className='w-full mb-6 flex flex-col md:flex-row gap-6'>
              <input 
                value={departmentState}
                onChange={(e) => setDepartmentState(e.target.value)}
                className='w-full md:w-1/2 p-3 border border-gray-400 rounded-md placeholder-gray-500 placeholder:text-lg hover:border-green-700' 
                type="text" 
                placeholder='Department' 
                required
              />
              <input 
                value={yaerState}
                onChange={(e) => setYearState(e.target.value)}
                className='w-full md:w-1/2 p-3 border border-gray-400 rounded-md placeholder-gray-500 placeholder:text-lg hover:border-green-700' 
                type="number" 
                placeholder='Year' 
                required
              />
            </div>
            <div className='w-full mb-6 flex flex-col md:flex-row gap-6'>
              <input 
                value={blockState}
                onChange={(e) => setBlockState(e.target.value)}
                className='w-full md:w-1/2 p-3 border border-gray-400 rounded-md placeholder-gray-500 placeholder:text-lg hover:border-green-700' 
                type="text" 
                placeholder='Block' 
                required
              />
              <input 
                value={roomState}
                onChange={(e) => setRoomState(e.target.value)}
                className='w-full md:w-1/2 p-3 border border-gray-400 rounded-md placeholder-gray-500 placeholder:text-lg hover:border-green-700' 
                type="number" 
                placeholder='Room No.' 
                required
              />
            </div>
            <div className='w-full mb-6 flex flex-col md:flex-row gap-6'>
              <input 
               
                className='w-full md:w-1/2 p-3 border border-gray-400 rounded-md placeholder-gray-500 placeholder:text-lg hover:border-green-700' 
                type="text" 
                placeholder='MAC Addr.-1' 
                required
              />
              <input 
                
                className='w-full md:w-1/2 p-3 border border-gray-400 rounded-md placeholder-gray-500 placeholder:text-lg hover:border-green-700' 
                type="text" 
                placeholder='MAC Addr.-2' 
                required
              />
            </div>
            <div className='w-full mb-6 flex flex-col md:flex-row gap-6'>
              <input 
                
                className='w-full md:w-1/2 p-3 border border-gray-400 rounded-md placeholder-gray-500 placeholder:text-lg hover:border-green-700' 
                type="email" 
                placeholder='Email' 
                required
              />
              <input 
                
                className='w-full md:w-1/2 p-3 border border-gray-400 rounded-md placeholder-gray-500 placeholder:text-lg hover:border-green-700' 
                type="text" 
                placeholder='Password' 
                required
              />
            </div>
            <div className='w-full mb-6 flex flex-col md:flex-row gap-6'>
              <input 
                
                className='w-full md:w-1/2 p-3 border border-gray-400 rounded-md placeholder-gray-500 placeholder:text-lg hover:border-green-700' 
                type="tel" 
                placeholder='Phone' 
                required
              />
              <select className='w-full md:w-1/2 p-3 border border-gray-400 rounded-md text-gray-700 placeholder-gray-500 placeholder:text-lg hover:border-green-700' required >
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
                )
            }
        </>
    )
}

export default ABlockStudent
