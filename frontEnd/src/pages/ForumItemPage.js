import Head from 'next/head';
import Image from 'next/image';
import ForumMiniAnswer from '../components/ForumMiniAnswer';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  ChatAlt2Icon,
  EyeIcon,
  StarIcon,
  ThumbUpIcon,
} from '@heroicons/react/outline';
import { ClockIcon } from '@heroicons/react/outline';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { VscLaw } from 'react-icons/vsc';
import { RiUserVoiceLine } from 'react-icons/ri';
import ForumAnswer from '../components/ForumAnswer';

export default function ArticleItemPage() {
  return (
    <div>
      <Head>
        <title>Avukatım</title>

        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='true'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@400;500;600;700;800&display=swap'
          rel='stylesheet'
        />
      </Head>

      <Header />

      <main className='max-w-6xl mx-auto mb-16 mt-10 p-5'>
        <div className='shadowLight w-full bg-white  rounded-lg mx-auto flex flex-col mb-10 md:p-5 md:px-10'>
          {/* Toplam Beğeni & İnceleme & Yorum */}
          <div className='flex flex-col items-center border-b-2 pb-5 mb-5'>
            <p className='pt-2 pb-0 px-5 text-avukatimKirmizi text-2xl font-bold '>
              Toplam
            </p>
            <div className='w-96 inline-flex flex-row items-center justify-evenly my-1 text-avukatimKirmizi'>
              <div className='relative inline-flex flex-row items-center'>
                <p className='font-bold text-xl'>12</p>
                <RiUserVoiceLine
                  size={25}
                  className='h-7 mr-0 text-avukatimKirmizi'
                />
                <p className='absolute -bottom-5 text-md'>Cevap</p>
              </div>
              <div className='relative inline-flex flex-row items-center'>
                <p className='font-bold text-xl'>7</p>
                <EyeIcon className='h-7 pl-1' />
                <p className='absolute -bottom-5 text-md'>inceleme</p>
              </div>
              <div className='relative inline-flex flex-row items-center'>
                <p className='font-bold text-xl'>37</p>
                <ThumbUpIcon className='h-7 pl-1' />
                <p className='absolute -bottom-5 text-md'>Beğeni</p>
              </div>
            </div>
          </div>
          {/* Soru */}
          <div className='w-full flex flex-col border-b border-avukatimKirmizi'>
            <h1 className='text-avukatimKirmizi text-2xl md:text-3xl text-center font-bold mx-3'>
              Neden Beraber Çalıştığımız Avukatları Dikkatli Seçmeliyiz?
            </h1>
            <div className='flex flex-row w-full'>
              <div className='inline-flex flex-col items-center justify-center self-start mt-5 text-avukatimKirmizi'>
                <ThumbUpIcon className='h-12 pl-1' />
                <p className='font-bold text-xl'>37</p>
              </div>
              <div className='flex flex-col m-3'>
                <div className='border-b-2 pb-2 mb-2'>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Officiis ad quae dolorem deleniti veniam corrupti harum
                    beatae, dignissimos eveniet animi cupiditate sequi maxime
                    sint vitae repudiandae accusamus tempore repellat
                    perspiciatis? Laudantium doloribus ullam quo perferendis ut
                    perspiciatis modi. Mollitia blanditiis quasi, distinctio
                    suscipit quis similique ab excepturi cum repellendus
                    laboriosam magnam corrupti voluptate laudantium incidunt?
                    Necessitatibus doloremque maxime incidunt culpa.
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
                          <VscLaw
                            size={24}
                            className=' mr-0 text-avukatimKirmizi'
                          />
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
          <ForumAnswer />
          <ForumAnswer />
        </div>
      </main>

      <Footer />
    </div>
  );
}
