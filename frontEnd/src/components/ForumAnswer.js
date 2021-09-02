import { ClockIcon, ThumbUpIcon } from '@heroicons/react/outline';
import React from 'react';
import { VscLaw } from 'react-icons/vsc';
import ForumMiniAnswer from './ForumMiniAnswer';

function ForumAnswer() {
  return (
    <div className='w-11/12 mx-auto flex flex-col border-b border-avukatimKirmizi my-3'>
      <h1 className='text-avukatimKirmizi text-2xl text-left font-bold mx-3'>
        Cevap:
      </h1>
      <div className='flex flex-row w-full'>
        <div className='inline-flex flex-col items-center justify-center self-start mt-5 text-avukatimKirmizi'>
          <ThumbUpIcon className='h-10 pl-1' />
          <p className='font-bold text-xl'>37</p>
        </div>
        <div className='flex flex-col m-3'>
          <div className='border-b-2 pb-2 mb-2'>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
              ad quae dolorem deleniti veniam corrupti harum beatae, dignissimos
              eveniet animi cupiditate sequi maxime sint vitae repudiandae
              accusamus tempore repellat perspiciatis? Laudantium doloribus
              ullam quo perferendis ut perspiciatis modi. Mollitia blanditiis
              quasi, distinctio suscipit quis similique ab excepturi cum
              repellendus laboriosam magnam corrupti voluptate laudantiu
              incidunt? Necessitatibus doloremque maxime incidunt culpa.
            </p>
            <div className='flex flex-row justify-end items-center'>
              <div className='mr-2'>
                <div className='flex flex-row justify-center items-center'>
                  <ClockIcon className='h-4 mx-1 text-avukatimKirmizi' />
                  <p>23.01.2021</p>
                </div>
                <p className='text-center'>14:32</p>
              </div>

              <div className='inline-flex flex-row justify-center items-center mx-1'>
                <div className='flex flex-col mx-1'>
                  <h1 className='mx-1 text-lg font-semibold leading-none whitespace-nowrap'>
                    Furkan Koçkesen
                  </h1>
                  <div className='inline-flex flex-row self-end'>
                    <p className='text-lg text-avukatimKirmizi font-semibold'>
                      Avukat
                    </p>
                    <VscLaw size={24} className=' mr-0 text-avukatimKirmizi' />
                  </div>
                </div>
                <img
                  src='/profile1.png'
                  className='rounded-lg h-14 w-14 object-cover shadowLight'
                />
              </div>
            </div>
          </div>
          <ForumMiniAnswer />
        </div>
      </div>
    </div>
  );
}

export default ForumAnswer;
