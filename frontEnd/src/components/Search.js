import React from 'react';
import { useState } from 'react';
import { SearchIcon } from '@heroicons/react/solid';
import SearchBarList from './SearchBarList';

const data = {
  cardData: [
    {
      id: 1,
      img: '',
      title: 'Furkan Koçkesen',
      desc: 'decs 1',
    },
    {
      id: 2,
      img: '',
      title: 'Berke Karataş',
      desc: 'decs 2',
    },
    {
      id: 3,
      img: '',
      title: 'Ahmet Melih',
      desc: 'decs 3',
    },
    {
      id: 4,
      img: '',
      title: 'Brad Traversy',
      desc: 'decs 4',
    },
    {
      id: 5,
      img: '',
      title: 'Cem Yılmaz',
      desc: 'decs 5',
    },
    {
      id: 6,
      img: '',
      title: 'Sedat Peker',
      desc: 'decs 6',
    },
    {
      id: 7,
      img: '',
      title: 'Hakan Şen',
      desc: 'decs 7',
    },
    {
      id: 8,
      img: '',
      title: 'Oğuz Kurtuluş',
      desc: 'decs 8',
    },
    {
      id: 9,
      img: '',
      title: 'Furkan Gül',
      desc: 'decs 9',
    },
    {
      id: 10,
      img: '',
      title: 'Furkan Sevinç',
      desc: 'decs 10',
    },
    {
      id: 11,
      img: '',
      title: 'Furkan Ateş',
      desc: 'decs 11',
    },
    {
      id: 12,
      img: '',
      title: 'Furkan Karaca',
      desc: 'decs 12',
    },
    {
      id: 13,
      img: '',
      title: 'Furkan Pala',
      desc: 'decs 13',
    },
  ],
};

function Search() {
  const [filter, setFilter] = useState('');
  const SearchText = event => {
    setFilter(event.target.value);
  };
  let searchData = data.cardData.filter(item => {
    return Object.keys(item).some(key =>
      item['title']
        .toString()
        .toLowerCase()
        .includes(filter.toString().toLowerCase())
    );
  });

  if (searchData.length > 5) {
    searchData = searchData.slice(0, 5);
  }
  return (
    <div className='flex flex-row text-avukatimKirmizi text-xl font-semibold'>
      {/*<Select options={cities} className='w-1/2'/>*/}
      <div className='relative w-full'>
        <input
          className='w-full p-2 rounded-l-lg placeholder-avukatimKirmizi placeholder-opacity-50 transition-all transition-500 focus:outline-none focus:ring-2 focus:ring-avukatimKirmizi'
          type='text'
          placeholder='Search...'
          value={filter}
          onChange={SearchText.bind(this)}
        />

        <SearchBarList filter={filter} searchData={searchData} />
      </div>

      <button className='bg-avukatimKirmizi rounded-r-lg w-auto flex justify-end items-center text-gray-200 p-2 hover:text-white hover:bg-avukatimKirmizi-dark transition-colors duration-500'>
        <SearchIcon className='h-7' />
      </button>
    </div>
  );
}

export default Search;
