import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  ArrowRightIcon,
  MailIcon,
  PencilAltIcon,
  PhoneIcon,
  ThumbUpIcon,
} from '@heroicons/react/outline';

import { VscLaw, VscLocation } from 'react-icons/vsc';
import { RiUserVoiceLine } from 'react-icons/ri';

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
        <div className='shadowLight w-full bg-white  rounded-lg mx-auto flex flex-col my-10'>
          <div className='headerHero w-full h-36 text-white font-semibold'></div>
          <div className='relative w-11/12 mx-auto border-b border-gray-300 flex flex-col md:flex-row md:mx-10 justify-between'>
            <div className='relative md:-top-16 inline-flex flex-col items-center -mt-5'>
              <img
                src='/profile1.png'
                className='rounded-lg h-56 w-56 object-cover border-4 border-avukatimKirmizi-dark self-center'
              />
              <div className='inline-flex flex-col items-center justify-evenly text-avukatimKirmizi my-2'>
                <div className='relative inline-flex flex-row items-center my-2'>
                  <p className='font-bold text-xl'>12</p>
                  <RiUserVoiceLine
                    size={25}
                    className='h-7 text-avukatimKirmizi'
                  />
                  <p className='mx-2 text-xl'>Cevap</p>
                </div>
                <div className='relative inline-flex flex-row items-center my-2'>
                  <p className='font-bold text-xl'>72</p>
                  <PencilAltIcon className='h-7' />
                  <p className='mx-2 text-xl'>Makale</p>
                </div>
                <div className='relative inline-flex flex-row items-center my-2'>
                  <p className='font-bold text-xl'>37</p>
                  <ThumbUpIcon className='h-7' />
                  <p className='mx-2 text-xl'>Beğeni</p>
                </div>
              </div>
            </div>
            <div className='flex flex-col m-5 text-center items-center'>
              <div className='inline-flex flex-row '>
                <p className='text-4xl font-semibold'>Furkan Koçkesen</p>
                <VscLaw size={28} className=' mr-0 text-avukatimKirmizi' />
              </div>
            </div>
            <div className='inline-flex flex-col items-center md:items-start text-avukatimKirmizi my-2 mx-5 font-semibold'>
              <div className='relative inline-flex flex-row items-center my-4'>
                <VscLocation size={36} />
                <p className='mx-2 text-xl'>İstanbul</p>
              </div>
              <div className='relative inline-flex flex-row items-center my-4'>
                <PhoneIcon className='h-7' />
                <p className='mx-2 text-xl'>+0543 906 96 65</p>
              </div>
              <div className='relative inline-flex flex-row items-center my-4'>
                <MailIcon className='h-7' />
                <p className='mx-2 text-xl'>frknkksn@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className='shadowLight w-full bg-white  rounded-lg mx-auto flex flex-col mb-10'>
          <div className='w-full border-b border-gray-300 '>
            <p className='pt-4 pb-2 px-5 text-avukatimKirmizi text-3xl font-bold text-center'>
              HAKKINDA
            </p>
          </div>
          <div className='p-5'>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit
              optio voluptatem autem expedita, culpa accusantium. Quidem
              corporis quam a eligendi, quibusdam possimus totam amet tempora
              harum corrupti ea atque ab. Aspernatur fugiat fuga rerum, deleniti
              facilis at cum delectus blanditiis dolor voluptates ut laboriosam
              similique. Cumque sed accusantium maxime aut consectetur tempore
              illum molestiae, sint dolor ipsum corporis, repudiandae eveniet.
              Aperiam, sequi voluptates itaque quam dolore molestiae magni sint
              accusantium exercitationem hic nobis unde optio nam eveniet
              explicabo accusamus. Vel doloremque impedit eveniet vitae
              voluptatum officiis. Itaque quas velit repellat! Architecto
              maiores et expedita id illum quidem voluptate eaque consequatur
              rerum non fugiat, veniam labore delectus unde, hic, ratione nihil.
              Cupiditate, officia veniam laudantium aspernatur placeat quibusdam
              praesentium magni nostrum. Veniam earum pariatur odit ab quam
              delectus saepe mollitia qui quisquam dolores, in veritatis
              distinctio, reiciendis animi, provident id? Optio alias nihil
              dolor nostrum. Illo fugiat a perspiciatis doloribus vero!
            </p>
          </div>
        </div>
        <div className='shadowLight w-full bg-white  rounded-lg mx-auto flex flex-col mb-10 py-5'>
          <div className='w-11/12 mx-auto flex-col border-b border-gray-300 mb-3'>
            <p className='pt-4 pb-2 px-5 text-avukatimKirmizi text-3xl font-bold text-center'>
              DENEYİM
            </p>
            <div className='flex flex-col'>
              <div className='flex flex-row items-center my-5'>
                <img
                  src='/profile1.png'
                  className='rounded-full h-36 md:h-44 w-36 md:w-44 object-cover border-4 border-avukatimKirmizi-dark self-center'
                />
                <div className='mx-3'>
                  <h1 className='text-2xl font-semibold my-3'>
                    Kaya Hukuk Bürosu
                  </h1>
                  <p className='text-xl'>Kıdemli Avukat</p>
                  <p>
                    Ekim 2014 <span className='text-3xl font-bold'>-</span> Mart
                    2016
                  </p>
                </div>
              </div>
              <div className='flex flex-row items-center my-5'>
                <img
                  src='/profile1.png'
                  className='rounded-full h-36 md:h-44 w-36 md:w-44 object-cover border-4 border-avukatimKirmizi-dark self-center'
                />
                <div className='mx-3'>
                  <h1 className='text-2xl font-semibold my-3'>
                    Kaya Hukuk Bürosu
                  </h1>
                  <p className='text-xl'>Kıdemli Avukat</p>
                  <p>
                    Ekim 2014 <span className='text-3xl font-bold'>-</span> Mart
                    2016
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='w-11/12 mx-auto flex-col mb-3'>
            <p className='pt-4 pb-2 px-5 text-avukatimKirmizi text-3xl font-bold text-center'>
              EĞİTİM
            </p>
            <div className='flex flex-col'>
              <div className='flex flex-row items-center my-5'>
                <img
                  src='/profile1.png'
                  className='rounded-full h-36 md:h-44 w-36 md:w-44 object-cover border-4 border-avukatimKirmizi-dark self-center'
                />
                <div className='mx-3'>
                  <h1 className='text-2xl font-semibold my-3'>
                    Kaya Hukuk Bürosu
                  </h1>
                  <p className='text-xl'>Kıdemli Avukat</p>
                  <p>
                    Ekim 2014 <span className='text-3xl font-bold'>-</span> Mart
                    2016
                  </p>
                </div>
              </div>
              <div className='flex flex-row items-center my-5'>
                <img
                  src='/profile1.png'
                  className='rounded-full h-36 md:h-44 w-36 md:w-44 object-cover border-4 border-avukatimKirmizi-dark self-center'
                />
                <div className='mx-3'>
                  <h1 className='text-2xl font-semibold my-3'>
                    Kaya Hukuk Bürosu
                  </h1>
                  <p className='text-xl'>Kıdemli Avukat</p>
                  <p>
                    Ekim 2014 <span className='text-3xl font-bold'>-</span> Mart
                    2016
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='shadowLight w-full bg-white  rounded-lg mx-auto flex flex-col mb-10'>
          <div className='w-11/12 mx-auto flex-col mb-3'>
            <p className='pt-4 pb-2 px-5 text-avukatimKirmizi text-3xl font-bold text-center'>
              YAYINLAR VE ÖDÜLLER
            </p>
            <div className='flex flex-col my-3'>
              <p className='text text-avukatimKirmizi text-2xl font-semibold'>
                3 Yayın
              </p>
              <div className='flex flex-col ml-4'>
                <div className='mr-2 my-2'>
                  <p className='font-semibold'>
                    Haksız Rekabet Hali Olarak Dürüstlük Kuralına Aykırı Genel
                    İşlem Koşulu Kullanmak
                  </p>
                  <p className='ml-2 my-1'>
                    15 Aralık || İstanbul Medeniyet Üniversitesi Hukuk Fakültesi
                    Dergisi
                  </p>
                  <p className='my-3 ml-2 text-avukatimKirmizi flex flex-row font-semibold'>
                    Yayını Gör{' '}
                    <span className='mx-2'>
                      {' '}
                      <ArrowRightIcon className='h-4' />{' '}
                    </span>
                  </p>
                </div>
                <div className='mr-2 my-2'>
                  <p className='font-semibold'>
                    Haksız Rekabet Hali Olarak Dürüstlük Kuralına Aykırı Genel
                    İşlem Koşulu Kullanmak
                  </p>
                  <p className='ml-2 my-1'>
                    15 Aralık || İstanbul Medeniyet Üniversitesi Hukuk Fakültesi
                    Dergisi
                  </p>
                  <p className='my-3 ml-2 text-avukatimKirmizi flex flex-row font-semibold'>
                    Yayını Gör{' '}
                    <span className='mx-2'>
                      {' '}
                      <ArrowRightIcon className='h-4' />{' '}
                    </span>
                  </p>
                </div>
                <div className='mr-2 my-2'>
                  <p className='font-semibold'>
                    Haksız Rekabet Hali Olarak Dürüstlük Kuralına Aykırı Genel
                    İşlem Koşulu Kullanmak
                  </p>
                  <p className='ml-2 my-1'>
                    15 Aralık || İstanbul Medeniyet Üniversitesi Hukuk Fakültesi
                    Dergisi
                  </p>
                  <p className='my-3 ml-2 text-avukatimKirmizi flex flex-row font-semibold'>
                    Yayını Gör{' '}
                    <span className='mx-2'>
                      {' '}
                      <ArrowRightIcon className='h-4' />{' '}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className='flex flex-col my-3'>
              <p className='text text-avukatimKirmizi text-2xl font-semibold'>
                3 Ödül
              </p>
              <div className='flex flex-col ml-4'>
                <div className='mr-2 my-2'>
                  <p className='font-semibold'>
                    Haksız Rekabet Hali Olarak Dürüstlük Kuralına Aykırı Genel
                    İşlem Koşulu Kullanmak
                  </p>
                  <p className='ml-2 my-1'>
                    15 Aralık || İstanbul Medeniyet Üniversitesi Hukuk Fakültesi
                    Dergisi
                  </p>
                  <p className='my-3 ml-2 text-avukatimKirmizi flex flex-row font-semibold'>
                    Ödülü Gör{' '}
                    <span className='mx-2'>
                      {' '}
                      <ArrowRightIcon className='h-4' />{' '}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
