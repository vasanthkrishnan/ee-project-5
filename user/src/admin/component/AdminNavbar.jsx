import React, { useState } from 'react'
import SIET_logo from '../../assets/img/download.jpg'
import { Menu, X } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import '../../assets/css/style.css'

export const AdminNavbar = () => {
    const [sidebarOpen, setSideBarOpen] = useState(false)

    const sideBarTitle = [
        {
            title: "Open Attendance",
            url: "openattendance",
        },
        {
            title: "Student Complaints",
            url: "studentcomplients",
        },
        {
            title: "Register Students",
            url: "registerstudent",
        },
        {
            title: "Attendance",
            subtopics: [
                {
                    title: "Year",
                    url: "year",
                },
                {
                    title: "Block",
                    url: "block",
                }
            ]
        },
        {
            title: "Student",
            url: "student",
        },
        {
            title: "Search",
            url: "search",
        },
    ]

    return (
        <>
            <div className='h-[8vh] w-full fixed overflow-y-auto overflow-x-hidden flex flex-row gap-3 bg-[#F8F8F8] justify-start items-center shadow-md'>
                <div className='bg-[#E2DFD2] h-10 w-12 flex justify-center items-center ml-3 hover:cursor-pointer' onClick={() => setSideBarOpen(true)}>
                    <Menu className='h-6 w-6' />
                </div>
                <div className='h-[80%] w-[3.5rem] border-none flex justify-center items-center'>
                    <img className='h-9 w-10' src={SIET_logo} alt="SIET Logo" />
                </div>
                <div className='h-[80%] w-[16rem] flex justify-center text-gray-500 text-2xl items-center'>
                    SIET Hostel Attendance
                </div>
                <div className='h-[90%] w-[15rem] ml-auto mr-3'>
                    <div className='h-full w-full text-2xl text-gray-500 flex justify-center items-center'>
                        Admin Dashboard!
                    </div>
                </div>
            </div>
            
            <div className={`fixed top-[8vh] left-0 h-[calc(100vh-8vh)] mt-3 z-50 shadow-md bg-[#f8f8f8] text-gray-500 transform transition-transform duration-[1000ms] ease-in-out ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
                <div className='w-[15.2rem] flex flex-col p-4'>
                    <div className='flex justify-between items-center border-b border-gray-600 pb-2 mb-4'>
                        <X className='h-6 w-6 hover:cursor-pointer ml-auto' onClick={() => setSideBarOpen(false)} />
                    </div>
                    <ul className='space-y-1'>
                        {sideBarTitle.map((data, index) => (
                            <div key={index} className='relative group'>
                                {data.url ? (
                                    <NavLink to={data.url}>
                                        <li className='text-gray-700 text-[18px] hover:text-gray-700 py-2 px-2 rounded-md hover:bg-[#d3d3d3]'>
                                            {data.title}
                                        </li>
                                    </NavLink>
                                ) : (
                                    <li className='text-gray-700 text-[18px] py-2 px-2 rounded-md hover:bg-[#d3d3d3]'>
                                        {data.title}
                                    </li>
                                )}
                                {data.subtopics && (
                                    <ul className='absolute left-full top-0 ml-1 bg-white shadow-lg rounded-md border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'>
                                        {data.subtopics.map((subtopic, subIndex) => (
                                            <NavLink key={subIndex} to={subtopic.url} className='block text-gray-950 text-[18px] py-2 px-4 hover:bg-[#d3d3d3]'>
                                                {subtopic.title}
                                            </NavLink>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default AdminNavbar
