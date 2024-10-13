import React from 'react'

export const Student = () => {

    const studentBlock = [
        {
            block: "A",
        },
        {
            block: "B",
        },
        {
            block: "C",
        },
        {
            block: "D",
        },
        {
            block: "E"
        },
        {
            block: "F"
        },
        {
            block: "G"
        }
    ]
  return (
    <div className='h-full w-full mt-28 flex gap-8 flex-wrap justify-center items-start'>
        {
            studentBlock.map((data, index) => (
                <div className='w-[250px] h-[250px] bg-gradient-to-br from-[#e0f5e0] to-[#f8f8f8] border-[6px] border-[#008000] rounded-md shadow-xl font-bold text-4xl text-center flex flex-col items-center justify-center gap-2 transition-all duration-300 transform hover:scale-110 hover:border-[#005700] hover:text-[#005700] hover:bg-clip-text hover:bg-gradient-to-br hover:from-[#008000] hover:to-[#005700]'>
                    <div className='text-9xl'>{data.block}</div>
                    <div className='text-lg'>Total Rooms: 10</div>
                    <div className='text-lg'>Total Students: 50</div>
                </div>
            ))
        }
        {/* <div className='w-[250px] h-[250px] bg-gradient-to-br from-[#e0f5e0] to-[#f8f8f8] border-[6px] border-[#008000] rounded-md shadow-xl font-bold text-4xl text-center flex flex-col items-center justify-center gap-2 transition-all duration-300 transform hover:scale-110 hover:border-[#005700] hover:text-[#005700] hover:bg-clip-text hover:bg-gradient-to-br hover:from-[#008000] hover:to-[#005700]'>
            <div className='text-9xl'>B</div>
            <div className='text-lg'>Total Rooms: 10</div>
            <div className='text-lg'>Total Students: 50</div>
        </div>
        <div className='w-[250px] h-[250px] bg-gradient-to-br from-[#e0f5e0] to-[#f8f8f8] border-[6px] border-[#008000] rounded-md shadow-xl font-bold text-4xl text-center flex flex-col items-center justify-center gap-2 transition-all duration-300 transform hover:scale-110 hover:border-[#005700] hover:text-[#005700] hover:bg-clip-text hover:bg-gradient-to-br hover:from-[#008000] hover:to-[#005700]'>
            <div className='text-9xl'>C</div>
            <div className='text-lg'>Total Rooms: 10</div>
            <div className='text-lg'>Total Students: 50</div>
        </div> */}
    </div>
  )
}

export default Student
