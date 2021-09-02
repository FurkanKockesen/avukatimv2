import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LawyerSearchBar from '../components/LawyerSearchBar';
import LawyerSearchBarList from '../components/LawyerSearchBarList';
import { MenuAlt2Icon } from '@heroicons/react/solid';

export default function LawyerSearchPage() {
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
          <LawyerSearchBar />
        </div>
        <div className='shadowLight w-full bg-white  rounded-lg mx-auto flex flex-col my-10 p-5'>
          <div className='md:w-11/12 mx-auto my-5'>
            <LawyerSearchBarList />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
