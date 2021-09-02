import Image from 'next/image';
import React from 'react';

function SearchBarList(props) {
  return (
    <div>
      <div className='absolute bg-white mt-1 w-full flex flex-col shadow-2xl'>
        {props.filter ? (
          props.searchData.map((item, index) => {
            return (
              <div
                key={index}
                className='p-0 overflow-hidden h-100 shadow-md inline-flex flex-row justify-between items-center transition-all transition-500 hover:cursor-pointer hover:shadow-lg hover:font-bold'
              >
                <h5 className='my-5 text-left px-4 w-2/4'>{item.title}</h5>

                <div className='relative top-1 h-full'>
                  <Image
                    alt='Mountains'
                    src='/profile1.png'
                    objectFit='cover'
                    height={100}
                    width={100}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default SearchBarList;
