import React from 'react';
import { BellIcon } from '@heroicons/react/outline';

function NotificationBell() {
  return (
    <div className='inline-flex cursor-pointer items-center mx-3'>
      <div className='h-6 md:h-8 max-w-md md:px-2 px-1 inline-flex items-center text-avukatimKirmizi rounded-full bg:white transition-colors duration-500 focus:shadow-outline hover:bg-avukatimKirmizi-dark hover:text-white'>
        <div className='relative'>
          <span className='absolute -top-2 -right-2 h-5 w-5 bg-avukatimKirmizi-dark text-center rounded-full text font-extrabold text-white'>
            5
          </span>
          <BellIcon className='h-7' />
        </div>
      </div>
    </div>
  );
}

export default NotificationBell;
