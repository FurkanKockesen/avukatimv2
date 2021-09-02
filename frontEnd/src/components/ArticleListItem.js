import React from 'react';
import Image from 'next/image';
import {
  StarIcon,
  ThumbUpIcon,
  ChatAlt2Icon,
  ClockIcon,
} from '@heroicons/react/outline';
import { VscLaw } from 'react-icons/vsc';

function ArticleListItem(props) {
  return (
    <div className='shadowExtraLight bg-white rounded-md border border-gray-300 w-full flex flex-col md:flex-row p-2 mb-4'>
      <div
        className='relative w-10/12 min-w h-60 md:h-full mx-auto md:w-3/12'
        style={{ minHeight: '150px' }}
      >
        <div className='flex items-center absolute h-full w-full min-h-full'>
          <Image
            alt='Mountains'
            src='/profile1.png'
            layout='fill'
            objectFit='contain'
          />
        </div>
      </div>
      <div className='md:w-9/12 w-full flex flex-col p-2 px-2'>
        <h1 className='text-avukatimKirmizi text-xl text-center font-semibold my-2 md:my-0'>
          {props.title}
        </h1>
        <p className='text-gray-800 text-md text-center border-b h-5/6'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a
          lobortis nulla. Suspendisse et felis dolor. Phasellus consequat nibh
          tortor, vitae mattis lacus semper quis. Proin consectetur dolor id leo
          sollicitudin, eu pharetra sem
        </p>
        <div className='w-full flex flex-col md:flex-row justify-between'>
          <div className='w-full md:w-2/6 inline-flex flex-row items-center justify-evenly my-1 text-avukatimKirmizi'>
            <div className='relative inline-flex flex-row items-center mr-2'>
              <p className='font-bold text-xl'>12</p>
              <StarIcon className='h-5 pl-1' />
              <p className='absolute -bottom-3 text-sm'>Favori</p>
            </div>
            <div className='relative inline-flex flex-row items-center mx-2'>
              <p className='font-bold text-xl'>7</p>
              <ChatAlt2Icon className='h-5 pl-1' />
              <p className='absolute -bottom-3 text-sm'>Yorum</p>
            </div>
            <div className='relative inline-flex flex-row items-center mx-2'>
              <p className='font-bold text-xl'>37</p>
              <ThumbUpIcon className='h-5 pl-1' />
              <p className='absolute -bottom-3 text-sm'>Beğeni</p>
            </div>
          </div>
          <div className='w-full md:w-4/6 inline-flex flex-row justify-center md:justify-end my-1'>
            <div className='mini-card h-full inline-flex flex-row items-center'>
              <ClockIcon className='h-4 m-1 text-avukatimKirmizi' />
              <p>23.01.2021</p>
            </div>
            <div className='mini-card h-full inline-flex flex-row items-center'>
              <VscLaw
                size={25}
                className='h-5 ml-1 mr-0 text-avukatimKirmizi'
              />

              <div className='relative'>
                <p className=' text-xl font-semibold'>{props.author}</p>
                <span className='absolute left-0 -bottom-3 text-avukatimKirmizi text-md font-extrabold'>
                  Avukat
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleListItem;
