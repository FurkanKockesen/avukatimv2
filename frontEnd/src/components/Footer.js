import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';

function Footer() {
  return (
    <section className='shadowLight bg-avukatimKirmizi text-gray-100 text-sm w-full mt-32 font-light'>
      <div className='max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center md:items-baseline md:justify-between pt-10  px-10'>
        <div className='inline-flex flex-col md:w-3/12 items-center mx-10 md:mx-0 mb-5 md:mb-0'>
          <Link href='/'>
            <a>
              <Image
                src='/Logo-Beyaz.png'
                height={55}
                width={240}
                objectFit='contain'
              />
            </a>
          </Link>
          <p className='text-center py-3 border-b border-gray-300'>
            Adaletin var olması için, onun varlığı kadar ulaşılabilir ve şeffaf
            olması gerekmektedir. Avukatım.com olarak bu görev bilinciyle hukuğa
            ihtiyacı olan insanların fikir, görüş ve yardım alabileceği, en
            yetkin Avukat ve Bürolarla iletişime geçebileceği bir platform olmak
            amacıyla buradayız.
          </p>
          <div className='inline-flex w-2/3 flex-row justify-between my-3'>
            <div>
              <FaTwitter size={25} className='h-5' />
            </div>
            <div>
              <FaFacebookF size={25} className='h-5' />
            </div>
            <div>
              <FaInstagram size={25} className='h-5' />
            </div>
          </div>
        </div>
        <div className='inline-flex flex-row justify-center self-center md:w-5/12 pt-10'>
          <div className='mx-10 p-3 border-gray-300 border-t'>
            <h1>Hakkımızda</h1>
            <h1>İletişim</h1>
            <h1>Yardım</h1>
          </div>
          <div className='mx-10 p-3 border-gray-300 border-t'>
            <h1>Site Kullanım Kılavuzu</h1>
            <h1>Topluluk Kuralları</h1>
          </div>
        </div>
      </div>
      <div className='max-w-7xl flex flex-col md:flex-row items-center justify-between mx-auto my-5 border-t border-gray-300 pt-3 md:pt-0 px-10'>
        <div className='w-9/12 md:w-3/12 inline-flex flex-row justify-between'>
          <p>Hizmet Plitikası</p>
          <span className='h-full border-l-2 border-gray-300'></span>
          <p>GDPR</p>
          <span className='h-full border-l-2 border-gray-300'></span>
          <p>Şartlar & Kullanım</p>
        </div>
        <div className='my-4 font-bold text-white tracking-wider'>
          <p>ADALETE ULAŞMAK EN BÜYÜK HAKTIR.</p>
        </div>
      </div>
      <div className='bg-avukatimKirmizi-dark h-7 flex flex-row justify-between items-center text-xs py-4'>
        <div className='max-w-7xl mx-auto w-full'>
          <p className='ml-5'>
            <span className='font-extrabold text-white'>AVUKATIM</span> - HUKUK
            PORTALI TİC. LTD. || TÜM HAKLARI SAKLIDIR © 2021{' '}
          </p>
        </div>
      </div>
    </section>
  );
}

export default Footer;
