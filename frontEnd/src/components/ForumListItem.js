import React from 'react';
import {
  EyeIcon,
  ThumbUpIcon,
  ChatAlt2Icon,
  ClockIcon,
} from '@heroicons/react/outline';
import { RiUserVoiceLine } from 'react-icons/ri';
import { UserIcon } from '@heroicons/react/solid';

function ForumListItem(props) {
  return (
    <div className='shadowExtraLight bg-white rounded-md border border-gray-300 w-full flex flex-col md:flex-row p-2 mb-4'>
      <div className='w-full flex flex-col p-1 px-2'>
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
              <RiUserVoiceLine
                size={25}
                className='h-5 mr-0 text-avukatimKirmizi'
              />
              <p className='absolute -bottom-3 text-sm'>Cevap</p>
            </div>
            <div className='relative inline-flex flex-row items-center mx-2'>
              <p className='font-bold text-xl'>7</p>
              <EyeIcon className='h-5 pl-1' />
              <p className='absolute -bottom-3 text-sm'>inceleme</p>
            </div>
            <div className='relative inline-flex flex-row items-center mx-2'>
              <p className='font-bold text-xl'>37</p>
              <ThumbUpIcon className='h-5 pl-1' />
              <p className='absolute -bottom-3 text-sm'>Beğeni</p>
            </div>
          </div>
          <div className='w-full md:w-4/6 inline-flex flex-row justify-center md:justify-end my-2'>
            <div className='mini-card h-full inline-flex flex-row items-center'>
              <ClockIcon className='h-4 m-1 text-avukatimKirmizi' />
              <p>23.01.2021</p>
            </div>
            <div className='mini-card h-full inline-flex flex-row items-center'>
              <UserIcon className='h-5 ml-1 mr-0 text-avukatimKirmizi' />

              <div className='relative'>
                <p className=' text-xl font-semibold'>{props.author}</p>
                <span className='absolute left-0 -bottom-3 text-avukatimKirmizi text-md font-extrabold'>
                  Kullanıcı
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForumListItem;
