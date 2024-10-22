import React from 'react'
import  SIET_logo  from '../../assets/img/download.jpg'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'


export const StudentNavbar = () => {
    const [sidebarOpen, setSideBarOpen] = useState(false)

    const sideBarTitle = [
        {
            title:"one",
            url: "one",
        },
        {
            title:"Two",
            url: "tow",
        },
        {
            title:"Three",
            url: "three",
        },
        {
            title:"Four",
            url: "four",
        },
        {
            title:"Five"
        },
        {
            title:"Six"
        }
    ]
  return (
    <>
        <div className='h-[8vh] w-full fixed overflow-y-auto overflow-x-hidden flex flex-row gap-3 bg-[#F8F8F8] justify-start items-center shadow-md'>
            <div className='bg-[#E2DFD2] h-10 w-12 flex justify-center items-center ml-3 hover:cursor-pointer' onClick={() => setSideBarOpen(true)}><Menu className='h-6 w-6' /></div>
            <div className='h-[80%] w-[3.5rem] border-none flex justify-center items-center'><img className='h-9 w-10' src={ SIET_logo } alt="" /></div>
            <div className='h-[80%] w-[16rem] flex justify-center text-gray-500 text-2xl items-center'>SIET Hostel Attendance</div>
            <div className='h-[90%] w-[15rem] ml-auto mr-3'>
                <div className='h-full w-full text-2xl text-gray-500 flex justify-center items-center'>Student Dashboard !</div>
            </div>
        </div>
        
        <div
            className={`fixed top-[8vh] left-0 h-[calc(100vh-8vh)] mt-3 z-50 shadow-md bg-[#f8f8f8] text-gray-500 transform transition-transform duration-[1000ms] ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className='w-[15.2rem] flex flex-col p-4'>
                <div className='flex justify-between items-center border-b border-gray-600 pb-2 mb-4'>
                    <X className='h-6 w-6 hover:cursor-pointer ml-auto' onClick={() => setSideBarOpen(false)}/>
                </div>
                <ul className='space-y-4'>
                    {
                        sideBarTitle.map((data, index) => (
                            <NavLink key={ index } to={ data.url } >
                                <li className= ' text-gray-700  text-[18px] hover:text-gray-700 py-2 px-2 rounded-md hover:bg-[#d3d3d3]'>{data.title}</li>
                            </NavLink>
                        ))
                    }
                </ul>
            </div>
        </div>
    </>
  )
}

export default StudentNavbar
