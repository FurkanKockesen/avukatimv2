import React from 'react';
import Image from 'next/image';
import { ThumbUpIcon, EyeIcon, PencilAltIcon } from '@heroicons/react/outline';
import { VscLaw, VscLocation, VscQuote } from 'react-icons/vsc';
import { RiUserVoiceLine } from 'react-icons/ri';

function LawyerListItem(props) {
  return (
    <div className='relative shadowExtraLight bg-white rounded-md border border-gray-300 w-full flex flex-col md:flex-row p-4 mb-4'>
      <img
        src='/profile1.png'
        className='rounded-lg h-40 w-40 object-cover border-4 border-avukatimKirmizi-dark self-center'
      />

      <div className='flex flex-col'>
        <div className='inline-flex flex-row mt-5 mx-2'>
          <p className='text-3xl font-semibold'>{props.author}</p>
          <VscLaw size={28} className=' mr-0 text-avukatimKirmizi' />
        </div>
        <div className='inline-flex flex-row mx-5 items-center'>
          <p className='leading-none'>İstanbul</p>
          <VscLocation
            size={24}
            className='h-7 mr-0 p-0 m-0 text-avukatimKirmizi'
          />
        </div>
      </div>
      <div className='md:absolute md:h-5/6 md:right-10 inline-flex flex-col items-center justify-evenly text-avukatimKirmizi'>
        <div className='relative inline-flex flex-row items-center'>
          <p className='font-bold text-xl'>12</p>
          <RiUserVoiceLine size={25} className='h-7 text-avukatimKirmizi' />
          <p className='mx-2 text-xl'>Cevap</p>
        </div>
        <div className='relative inline-flex flex-row items-center'>
          <p className='font-bold text-xl'>72</p>
          <PencilAltIcon className='h-7' />
          <p className='mx-2 text-xl'>Makale</p>
        </div>
        <div className='relative inline-flex flex-row items-center'>
          <p className='font-bold text-xl'>37</p>
          <ThumbUpIcon className='h-7' />
          <p className='mx-2 text-xl'>Beğeni</p>
        </div>
      </div>
    </div>
  );
}

export default LawyerListItem;
