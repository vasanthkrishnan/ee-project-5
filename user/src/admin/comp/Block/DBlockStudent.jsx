import React, { useEffect, useState } from 'react'
import { Check, User, Search } from 'lucide-react'
import { deleteStudentData, getStudentData } from '../../../service/api'
import { Toaster, toast } from 'sonner'

export const DBlockStudent = () => {
    const [studentData, setStudentData] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredData, setFilteredData] = useState([])

    const fetchProject = async () => {
        try {
            const { data } = await getStudentData()
            const filtered = data.filter(student => 
                student.role.toLowerCase() === 'student' && student.block.toUpperCase() === 'D'
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

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase()
        setSearchTerm(value)
        const filtered = studentData.filter(student => {
            const fullName = `${student.firstName} ${student.lastName}`.toLowerCase()
            const phoneNumber = student.phone.toString()
            const roomNumber = student.room.toString()
            const year = student.year.toString()
            const department = student.department.toString()
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
                        filteredData.length !== 0 ? (
                        filteredData.map((data, index) => (
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
                                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Update</button>
                                    <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600" onClick={() => { handleDelete(data._id) }}>Delete</button>
                                </div>
                            </div>
                        ))
                    ) :(
                        <div className='text-gray-600 text-lg font-medium mt-10'>
                                No students found in D-Block
                            </div>
                    )
                    }
                </div>
            </div>
        </>
    )
}

export default DBlockStudent
