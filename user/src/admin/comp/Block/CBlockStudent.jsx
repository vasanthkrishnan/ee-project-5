import React, { useEffect, useState } from 'react'
import { Check, User, Search } from 'lucide-react'
import { deleteStudentData, editStudentData, getStudentData } from '../../../service/api'
import { Toaster, toast } from 'sonner'

export const CBlockStudent = () => {
  const [studentData, setStudentData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [selectedStudentId, setSelectedStudentId] = useState(null)

  const [studentFormData, setStudentFormData] = useState({
    firstName: '',
    lastName: '',
    department: '',
    year: '',
    block: '',
    room: '',
    macOne: '',
    macTwo: '',
    email: '',
    password: '',
    phone: '',
    role: '',
  })

  const fetchProject = async () => {
    try {
      const { data } = await getStudentData()
      const filtered = data.filter(
        (student) => student.role.toLowerCase() === 'student' && student.block.toUpperCase() === 'C')
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
        toast.success('Deleted!', {
          className: 'bg-green-500 rounded-lg shadow-lg text-white p-3 flex gap-5 text-lg font-bold',
          icon: <Check />,
          duration: 3000,
        });
        fetchProject()
      }
    } catch (error) {
      console.log(error.message)
    }
  };

  const handleEditClick = (student) => {
    setVisibleEdit(true)
    setSelectedStudentId(student._id)
    setStudentFormData({ ...student })
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setStudentFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleEdit = async (e) => {
    e.preventDefault()
    try {
      const response = await editStudentData(selectedStudentId, studentFormData)
      if (response.status === 200) {
        toast.success('Updated successfully', {
          className: 'bg-green-500 rounded-lg shadow-lg text-white p-3 flex gap-5 text-lg font-bold',
          icon: <Check />,
          duration: 3000,
        })
        fetchProject()
        setVisibleEdit(false)
      }
    } catch (error) {
      console.log(error.message)
    }
    setVisibleEdit(false)
  }

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase()
    setSearchTerm(value)
    const filtered = studentData.filter((student) => {
      const fullName = `${student.firstName} ${student.lastName}`.toLowerCase()
      return (
        fullName.includes(value) ||
        student.phone.toString().includes(value) ||
        student.room.toString().includes(value) ||
        student.year.toString().includes(value) ||
        student.department.toLowerCase().includes(value) ||
        student.email.toLowerCase().includes(value) ||
        `${student.macOne} ${student.macTwo}`.toLowerCase().includes(value)
      )
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
            filteredData.map((student, index) => (
            <div key={index} className='w-[320px] border border-gray-300 bg-white rounded-lg shadow-lg p-6 transition-transform duration-200 hover:scale-105'>
              <div className='flex items-center mb-4'>
                <div className='h-[80px] w-[80px] bg-gray-200 rounded-full flex items-center justify-center mr-4'>
                  <User className='h-[40px] w-[40px] text-gray-500' />
                </div>
                <h2 className='text-lg font-semibold text-gray-800'>
                  {student.firstName} {student.lastName}
                </h2>
              </div>
              <div className='w-full border-t border-gray-200 my-3'></div>
              <div className='flex flex-col w-full text-sm text-gray-700 gap-2'>
                <div className='text-[.96em]'>
                  <span className='font-medium'>User name :</span> {student.email}
                </div>
                <div className='text-[.96em]'>
                  <span className='font-medium'>Phone :</span> {student.phone}
                </div>
                <div className='text-[.96em]'>
                  <span className='font-medium'>Department :</span> {student.department}
                </div>
                <div className='text-[.96em]'>
                  <span className='font-medium'>Year :</span> {student.year}
                </div>
                <div className='text-[.96em]'>
                  <span className='font-medium'>Block :</span> {student.block}
                </div>
                <div className='text-[.96em]'>
                  <span className='font-medium'>Room No :</span> {student.room}
                </div>
                <div className='text-[.96em]'>
                  <span className='font-medium'>Mac Address 1 :</span> {student.macOne}
                </div>
                <div className='text-[.96em]'>
                  <span className='font-medium'>Mac Address 2 :</span> {student.macTwo}
                </div>
              </div>
              <div className='w-full border-t border-gray-200 my-3'></div>
              <div className='flex justify-between gap-3'>
                <button
                  className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'
                  onClick={() => handleEditClick(student)}
                >
                  Update
                </button>
                <button
                  className='px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600'
                  onClick={() => handleDelete(student._id)}
                >
                  Delete
                </button>
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

      {visibleEdit && (
  <div className="min-h-screen top-0 right-0 absolute w-screen mt-14 overflow-y-auto overflow-x-hidden flex justify-center items-start pt-10 bg-gradient-to-br from-gray-100 to-gray-300">
    <div className="w-full max-w-4xl bg-white shadow-2xl rounded-lg relative p-8">
      <button
        onClick={() => setVisibleEdit(false)}
        className="absolute top-4 right-4 text-gray-400 hover:text-red-600 transition-colors duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <form className="space-y-6" onSubmit={handleEdit}>
        <h3 className="text-2xl font-bold text-gray-700 text-center mb-4">
          Student Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="firstName"
            value={studentFormData.firstName}
            onChange={handleInputChange}
            placeholder="First Name"
            className="p-3 border rounded-lg focus:outline-none focus:border-green-500"
            required
          />
          <input
            type="text"
            name="lastName"
            value={studentFormData.lastName}
            onChange={handleInputChange}
            placeholder="Last Name"
            className="p-3 border rounded-lg focus:outline-none focus:border-green-500"
            required
          />
          <input
            type="text"
            name="department"
            value={studentFormData.department}
            onChange={handleInputChange}
            placeholder="Department"
            className="p-3 border rounded-lg focus:outline-none focus:border-green-500"
            required
          />
          <input
            type="number"
            name="year"
            value={studentFormData.year}
            onChange={handleInputChange}
            placeholder="Year"
            className="p-3 border rounded-lg focus:outline-none focus:border-green-500"
            required
          />
          <input
            type="text"
            name="block"
            value={studentFormData.block}
            onChange={handleInputChange}
            placeholder="Block"
            className="p-3 border rounded-lg focus:outline-none focus:border-green-500"
            required
          />
          <input
            type="number"
            name="room"
            value={studentFormData.room}
            onChange={handleInputChange}
            placeholder="Room No."
            className="p-3 border rounded-lg focus:outline-none focus:border-green-500"
            required
          />
          <input
            type="text"
            name="macOne"
            value={studentFormData.macOne}
            onChange={handleInputChange}
            placeholder="MAC Addr-1"
            className="p-3 border rounded-lg focus:outline-none focus:border-green-500"
            required
          />
          <input
            type="text"
            name="macTwo"
            value={studentFormData.macTwo}
            onChange={handleInputChange}
            placeholder="MAC Addr-2"
            className="p-3 border rounded-lg focus:outline-none focus:border-green-500"
            required
          />
          <input
            type="text"
            name="email"
            value={studentFormData.email}
            onChange={handleInputChange}
            placeholder="Username"
            className="p-3 border rounded-lg focus:outline-none focus:border-green-500"
            required
          />
          <input
            type="text"
            name="password"
            value={studentFormData.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="p-3 border rounded-lg focus:outline-none focus:border-green-500"
            required
          />
          <input
            type="number"
            name="phone"
            value={studentFormData.phone}
            onChange={handleInputChange}
            placeholder="Phone"
            className="p-3 border rounded-lg focus:outline-none focus:border-green-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#008000] text-white py-3 rounded-lg hover:bg-[#005700] transition duration-200"
        >
          Save Changes
        </button>
      </form>
    </div>
  </div>
)}

    </>
  )
}


export default CBlockStudent