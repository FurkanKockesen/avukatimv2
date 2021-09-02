import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ButtonPrimary from './ButtonPrimary';
import NotificationBell from './NotificationBell';

function Header() {
  return (
    <header className='bg-white shadowLight text-avukatimKirmizi font-semibold body-font border-solid border-b-2 border-gray-300 rounded-b-2xl'>
      <div className='container max-w-6xl mx-auto flex flex-wrap px-10 flex-col md:flex-row items-center justify-center'>
        <div className='my-2 md:my-0 md:mt-1'>
          <Link href='/'>
            <a>
              <Image
                src='/Logo-Kırmızı.png'
                height={55}
                width={240}
                objectFit='contain'
              />
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
