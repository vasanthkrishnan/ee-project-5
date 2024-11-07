import React from 'react';
import { Link } from 'react-router-dom';

export const Year = () => {
  const yearData = [
    {
      year: "1st Year",
      url: "firstyear",
      totalStudents: "100"
    },
    {
      year: "2nd Year",
      url: "secondyear",
      totalStudents: "120"
    },
    {
      year: "3rd Year",
      url: "thirdyear",
      totalStudents: "110"
    },
    {
      year: "4th Year",
      url: "fourthyear",
      totalStudents: "90"
    }
  ];

  return (
    <section className='min-h-screen flex justify-center items-start py-16 mt-20 bg-white'>
      <div className='container flex flex-wrap justify-center gap-6'>
        {yearData.map((year, index) => (
          <div
            key={index}
            className='bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200 w-[250px]'
          >
            <h2 className='text-xl font-bold text-gray-700 mb-2 text-center'>{year.year}</h2>
            <p className='text-gray-600 mb-4 text-center'>
              <span className='font-medium'>Total Students:</span> {year.totalStudents}
            </p>
            <Link to={`/admin/${year.url}`}>
              <button className='w-full py-2 text-white bg-[#008000] rounded-md hover:bg-[#057000] transition-colors'>
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Year;
