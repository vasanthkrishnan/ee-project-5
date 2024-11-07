import React, { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';

export const Search = () => {

  return (
    <div className='h-full w-full mt-20 flex flex-col items-center'>
      <div className='relative w-full max-w-[800px] mb-10'>
        <input
          type='text'
          value=""
          placeholder='Search...'
          className='w-full p-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-500'
        />
        <SearchIcon className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
      </div>
    </div>
  );
};

export default Search
