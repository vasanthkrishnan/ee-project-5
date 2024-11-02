import React, { useEffect, useState } from 'react'
import { Check, User, Search } from 'lucide-react'
import { deleteStudentData, editStudentData, getStudentData } from '../../../service/api'
import { Toaster, toast } from 'sonner'

export const ABlockStudent = () => {
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
        (student) => student.role.toLowerCase() === 'student' && student.block.toUpperCase() === 'A')
      setStudentData(filtered)
      setFilteredData(filtered)
    } catch (error) {
      toast.error(error.message, {
        className: 'bg-red-500 rounded-lg shadow-lg text-white p-3 flex gap-5 text-lg font-bold',
        icon: <Check />,
        duration: 3000,
      });
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
    }));
  };

  const handelEdit = async (e) => {
    e.preventDefault()
    try {
      const response = await editStudentData(selectedStudentId, studentFormData)
      if (response.status === 200) {
        toast.success('Updated successfully', {
          className: 'bg-green-500 rounded-lg shadow-lg text-white p-3 flex gap-5 text-lg font-bold',
          icon: <Check />,
          duration: 3000,
        });
        fetchProject()
        setVisibleEdit(false)
      }
    } catch (error) {
      console.log(error.message)
    }
    setVisibleEdit(false)
  };

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
          {filteredData.map((student, index) => (
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
          ))}
        </div>
      </div>

      {visibleEdit && (
        <div className='min-h-screen top-0 right-0 absolute w-screen mt-14 overflow-y-auto overflow-x-hidden flex justify-center items-start pt-10 bg-[#fff]'>
          <div className='w-full max-w-4xl bg-[#f5f5f5] shadow-lg rounded-md relative flex justify-center items-center'>
            <button
              onClick={() => setVisibleEdit(false)}
              className='absolute top-4 right-4 text-gray-500 hover:text-red-600 transition-colors duration-200'
            >
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='w-6 h-6'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>

            <form className='w-[90%] py-10 flex flex-col justify-start items-center' onSubmit={handelEdit}>
              <h3 className='text-3xl font-semibold mb-8'>Student Information</h3>
              <div className='w-full mb-6 flex flex-col md:flex-row gap-6'>
                <input
                  type='text'
                  name='firstName'
                  value={studentFormData.firstName}
                  onChange={handleInputChange}
                  placeholder='First Name'
                  className='w-full md:w-1/2 p-3 border border-gray-400 rounded-md placeholder-gray-500 placeholder:text-lg hover:border-green-700'
                  required
                />
                <input
                  type='text'
                  name='lastName'
                  value={studentFormData.lastName}
                  onChange={handleInputChange}
                  placeholder='Last Name'
                  className='w-full md:w-1/2 p-3 border border-gray-400 rounded-md placeholder-gray-500 placeholder:text-lg hover:border-green-700'
                  required
                />
              </div>
              <button type='submit' className='px-5 py-3 bg-[#008000] text-white rounded-md hover:bg-[#007500]'>
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};


export default ABlockStudent