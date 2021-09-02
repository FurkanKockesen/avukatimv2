import React from 'react';
import { SearchIcon } from '@heroicons/react/solid';
import { useDispatch } from 'react-redux';
import { searchArticleData } from '../slices/searchSlice';
import { useState, useEffect } from 'react';

function Search() {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('');

  useEffect(() => {
    console.log(filter);
    dispatch(searchArticleData(filter));
  }, [filter]);

  return (
    <div className='shadowLight flex flex-row text-avukatimKirmizi text-xl font-semibold'>
      <div className='relative w-full'>
        <input
          className='w-full p-2 rounded-l-lg placeholder-avukatimKirmizi placeholder-opacity-50 transition-all transition-500 focus:outline-none focus:ring-2 focus:ring-avukatimKirmizi'
          type='text'
          placeholder='Tüm Avukatlar Listeleniyor...'
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
      </div>

      <button className='bg-avukatimKirmizi rounded-r-lg w-auto flex justify-end items-center text-gray-200 p-2 hover:text-white hover:bg-avukatimKirmizi-dark transition-colors duration-500'>
        <SearchIcon className='h-7' />
      </button>
    </div>
  );
}

export default Search;
