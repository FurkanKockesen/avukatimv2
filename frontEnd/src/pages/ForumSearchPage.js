import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ForumSearchBar from '../components/ForumSearchBar';
import ForumSearchBarList from '../components/ForumSearchBarList';
import { MenuAlt2Icon } from '@heroicons/react/solid';

export default function ArticleSearchPage() {
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

      <main className='max-w-6xl mx-auto my-16 p-5'>
        <div className='w-full md:w-2/3 mx-auto'>
          <ForumSearchBar />
        </div>
        <div className='shadowLight w-full bg-white  rounded-lg mx-auto flex flex-col my-10 p-5'>
          <div className='md:w-11/12 mx-auto my-5'>
            <div>
              <div className='flex flex-row w-full md:w-5/12 lg:w-4/12 justify-between items-center text-sm font-bold'>
                <MenuAlt2Icon className='w-2/6 h-5 text-avukatimKirmizi' />
                <div className='inline-flex items-center justify-center w-full h-7 bg-avukatimKirmizi text-white text-center border border-avukatimKirmizi rounded-l-md'>
                  En Yeniler
                </div>
                <div className='inline-flex items-center justify-center w-full h-7 bg-white text-avukatimKirmizi text-center border border-avukatimKirmizi'>
                  En Beğenilen
                </div>
                <div className='inline-flex items-center justify-center w-full h-7 bg-white text-avukatimKirmizi text-center border border-avukatimKirmizi rounded-r-md'>
                  En Eski
                </div>
              </div>
              <div className='w-full border-b border-gray-300 mb-2 mt-1'></div>
            </div>
            <ForumSearchBarList />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
