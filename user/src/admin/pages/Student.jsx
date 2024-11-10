import React from 'react';
import { Link } from 'react-router-dom';

export const Student = () => {
    const studentBlock = [
        {
            block: "A",
            url: "ablockstudent",
            totalRooms: "10",
            totalStudent: "100"
        },
        {
            block: "B",
            url: "bblockstudent",
            totalRooms: "10",
            totalStudent: "100"
        },
        {
            block: "C",
            url: "cblockstudent",
            totalRooms: "10",
            totalStudent: "100"
        },
        {
            block: "D",
            url: "dblockstudent",
            totalRooms: "10",
            totalStudent: "100"
        }
    ];

    return (
        <div className='h-full w-full mt-28 flex gap-8 flex-wrap justify-center items-start'>
            {studentBlock.map((block, index) => (
                <div key={index} className="mt-20 w-[320px] h-[200px] bg-white border border-gray-300 rounded-lg shadow-lg p-5 transition-transform duration-300 hover:scale-105">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <div className="h-[50px] w-[50px] bg-[#008000] hover:bg-[#005700] hover:cursor-pointer text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-md" onClick={() => window.location.href = `/admin/${block.url}`} >
                                {block.block}
                            </div>
                            <h2 className="ml-4 text-xl font-semibold text-gray-800">Block Info</h2>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 text-sm text-gray-600">
                        <div className="flex justify-between">
                            <span className="font-medium">Total Rooms:</span>
                            <span>{block.totalRooms}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">Total Students:</span>
                            <span>{block.totalStudent}</span>
                        </div>
                    </div>
                    <div className="flex justify-end mt-5">
                        <Link to={`/admin/${block.url}`}>
                            <button className="px-4 py-2 text-sm font-medium text-white bg-[#008000] rounded-md hover:bg-[#005700]">
                                Details
                            </button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Student;
