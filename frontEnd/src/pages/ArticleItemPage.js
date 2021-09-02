import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';
import { ChatAlt2Icon, StarIcon, ThumbUpIcon } from '@heroicons/react/outline';
import { ClockIcon } from '@heroicons/react/outline';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { VscLaw } from 'react-icons/vsc';

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
        <div className='shadowLight w-full bg-white  rounded-lg mx-auto flex flex-col mb-8'>
          <div className='w-full border-b border-gray-300 '>
            <p className='pt-4 pb-2 px-5 text-avukatimKirmizi text-2xl font-bold '>
              Yazar
            </p>
          </div>
          <div className='flex flex-col md:flex-row mx-auto md:mx-0 mt-2 mb-4 px-5 justify-start items-center md:items-start w-5/6 md:w-5/12'>
            <div
              className='relative h-60 md:h-full mx-auto w-full md:w-4/12'
              style={{ minHeight: '150px' }}
            >
              <div className='flex items-center absolute h-full w-full min-h-full'>
                <Image
                  alt='Mountains'
                  src='/profile1.png'
                  layout='fill'
                  objectFit='contain'
                />
              </div>
            </div>
            <div className='inline-flex flex-col my-4'>
              <p className='text-3xl font-semibold'>Furkan Koçkesen</p>
            </div>
          </div>
        </div>
        <div className='shadowLight w-full bg-white  rounded-lg mx-auto flex flex-col mb-10'>
          <div className='headerHero w-full text-white font-semibold'>
            <div className='relative w-full flex flex-col px-10 pt-5'>
              <div className='inline-flex flex-row items-center'>
                <p className='w-8 border-b-2 border-white'></p>
                <p className='mx-2'>Vergi Hukuku</p>
              </div>
              <p className='mx-2 md:mx-5 text-2xl md:text-3xl'>
                Vergi İncelenmesi Yapılanmasının Sebebi
              </p>
              <div className='w-3/4 mx-auto h-full flex flex-row justify-end'>
                <ClockIcon className='h-4 m-1' />
                <p>23.01.2021</p>
              </div>
            </div>
            <div className='relative w-full border-b-2 my-2'></div>

            <div className='relative w-3/4 flex flex-row items-center justify-end my-1 mx-auto'>
              <div className='relative inline-flex flex-row items-center mx-2'>
                <p className='font-bold text-xl'>37</p>
                <ThumbUpIcon className='h-5 pl-1' />
                <p className='text-sm'>Beğeni</p>
              </div>
              <div className='inline-flex flex-row items-center mr-2'>
                <p className='font-bold text-xl'>12</p>
                <StarIcon className='h-5 pl-1' />
                <p className='text-sm'>Favori</p>
              </div>
              <div className='relative inline-flex flex-row items-center mx-2'>
                <p className='font-bold text-xl'>7</p>
                <ChatAlt2Icon className='h-5 pl-1' />
                <p className='text-sm'>Yorum</p>
              </div>
            </div>
          </div>
          <div>
            <p className='m-5'>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Praesentium ullam aliquid, eligendi aspernatur, eius at minima,
              repellendus iusto officia inventore quibusdam omnis voluptatum
              cupiditate similique voluptatibus veritatis! Sed, nam iste.
              Perspiciatis et repudiandae corporis iusto culpa laudantium fuga
              qui asperiores pariatur. Ducimus et facere eligendi accusamus
              optio magni quisquam odio aut! Accusantium, iusto facilis harum
              reiciendis repudiandae soluta deserunt dolores. Ullam nam
              provident temporibus unde possimus consequatur itaque. Omnis
              facilis obcaecati dolor sapiente recusandae harum doloremque
              magni! Fugiat suscipit quod voluptas optio velit reiciendis quidem
              magnam, aspernatur, praesentium eius provident. Sequi, laborum
              praesentium voluptatibus esse rerum aliquam qui repellendus atque
              in consequatur velit adipisci alias et odio nihil ab reprehenderit
              molestiae pariatur sit cumque voluptatem similique vero magni
              nisi. Sed! Veritatis ducimus at, assumenda velit deleniti fuga
              minus doloremque autem dolor. Tempore dignissimos velit quas nulla
              dolor consectetur voluptates laborum blanditiis sint placeat fuga
              nobis sapiente animi, ab temporibus pariatur! Adipisci autem
              illum, ex error magni voluptatibus tempora enim numquam eum
              temporibus vel recusandae nobis ea tenetur aperiam soluta eius
              totam nam quis similique fuga sapiente. Suscipit minus similique
              modi! Minima deleniti tempora hic corrupti atque eos debitis
              provident ratione. Eius odio, maxime exercitationem iure minima
              expedita sequi excepturi possimus aliquid non debitis porro! Earum
              nobis blanditiis dolorem praesentium recusandae. Aspernatur
              tempore maxime dolorem, reiciendis placeat at assumenda fugit
              tempora facere neque enim iure distinctio nesciunt dolorum animi
              itaque sint, labore fuga repellat impedit exercitationem excepturi
              veniam. Neque, dolorum quas. Dolorem doloribus tempora harum
              exercitationem, a soluta consectetur. Ipsam officia enim quis aut
              neque, exercitationem nemo! Numquam atque, neque suscipit
              provident ea impedit, aliquam expedita dolor, voluptate similique
              unde rem. Ipsa at laudantium tempore assumenda iure, soluta
              commodi sapiente? Voluptatibus nostrum aut in dolorem inventore?
              Molestiae atque tempora totam ut! Modi dignissimos deserunt rem
              expedita in nostrum. Natus, doloremque vel?Lorem ipsum dolor sit,
              amet consectetur adipisicing elit. Praesentium ullam aliquid,
              eligendi aspernatur, eius at minima, repellendus iusto officia
              inventore quibusdam omnis voluptatum cupiditate similique
              voluptatibus veritatis! Sed, nam iste. Perspiciatis et repudiandae
              corporis iusto culpa laudantium fuga qui asperiores pariatur.
              Ducimus et facere eligendi accusamus optio magni quisquam odio
              aut! Accusantium, iusto facilis harum reiciendis repudiandae
              soluta deserunt dolores. Ullam nam provident temporibus unde
              possimus consequatur itaque. Omnis facilis obcaecati dolor
              sapiente recusandae harum doloremque magni! Fugiat suscipit quod
              voluptas optio velit reiciendis quidem magnam, aspernatur,
              praesentium eius provident. Sequi, laborum praesentium
              voluptatibus esse rerum aliquam qui repellendus atque in
              consequatur velit adipisci alias et odio nihil ab reprehenderit
              molestiae pariatur sit cumque voluptatem similique vero magni
              nisi. Sed! Veritatis ducimus at, assumenda velit deleniti fuga
              minus doloremque autem dolor. Tempore dignissimos velit quas nulla
              dolor consectetur voluptates laborum blanditiis sint placeat fuga
              nobis sapiente animi, ab temporibus pariatur! Adipisci autem
              illum, ex error magni voluptatibus tempora enim numquam eum
              temporibus vel recusandae nobis ea tenetur aperiam soluta eius
              totam nam quis similique fuga sapiente. Suscipit minus similique
              modi! Minima deleniti tempora hic corrupti atque eos debitis
              provident ratione. Eius odio, maxime exercitationem iure minima
              expedita sequi excepturi possimus aliquid non debitis porro! Earum
              nobis blanditiis dolorem praesentium recusandae. Aspernatur
              tempore maxime dolorem, reiciendis placeat at assumenda fugit
              tempora facere neque enim iure distinctio nesciunt dolorum animi
              itaque sint, labore fuga repellat impedit exercitationem excepturi
              veniam. Neque, dolorum quas. Dolorem doloribus tempora harum
              exercitationem, a soluta consectetur. Ipsam officia enim quis aut
              neque, exercitationem nemo! Numquam atque, neque suscipit
              provident ea impedit, aliquam expedita dolor, voluptate similique
              unde rem. Ipsa at laudantium tempore assumenda iure, soluta
              commodi sapiente? Voluptatibus nostrum aut in dolorem inventore?
              Molestiae atque tempora totam ut! Modi dignissimos deserunt rem
              expedita in nostrum. Natus, doloremque vel?
            </p>
          </div>
          <div className='w-full border-b-2 border-t-2 h-3 my-2'></div>
          <div className='w-full px-5 flex flex-col md:flex-row justify-between items-center text-avukatimKirmizi'>
            <div className='inline-flex flex-row items-center justify-evenly my-1 mb-5'>
              <div className='relative inline-flex flex-row items-center mx-5 '>
                <ThumbUpIcon className='h-8 pl-1' />
                <p className='absolute -bottom-6 text-md font-bold'>Beğen</p>
              </div>
              <div className='relative inline-flex flex-row items-center ml-4 mr-5'>
                <StarIcon className='relative -right-2 h-8 pl-1' />
                <p className='absolute -bottom-6 text-md font-bold'>Favorile</p>
              </div>
              <div className='relative inline-flex flex-row items-center mx-5'>
                <ChatAlt2Icon className='relative -right-2 h-8 pl-1' />
                <p className='absolute -bottom-6 text-md font-bold'>Yorumla</p>
              </div>
            </div>
            <div className='inline-flex flex-col-reverse md:flex-col my-5'>
              <h1 className='text-center font-semibold'>Bu Makaleyi Paylaş</h1>
              <div className='inline-flex flex-row justify-between my-3'>
                <div className='mx-3'>
                  <FaTwitter size={25} className='h-5' />
                </div>
                <div className='mx-3'>
                  <FaFacebookF size={25} className='h-5' />
                </div>
                <div className='mx-3'>
                  <FaInstagram size={25} className='h-5' />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='shadowLight w-full bg-white  rounded-lg mx-auto flex flex-col mb-10'>
          <div className='w-full border-b border-gray-300 '>
            <p className='pt-4 pb-2 px-5 text-avukatimKirmizi text-2xl font-bold text-center'>
              Yorumlar
            </p>
          </div>
          <div className='w-full md:w-10/12 mx-auto flex flex-col my-5'>
            <div className='w-full shadowExtraLight rounded-md border border-gray-300 flex flex-row mb-4'>
              <div className='w-3/12 inline-flex flex-col'>
                <div className='inline-flex flex-row items-center'>
                  <VscLaw
                    size={32}
                    className='h-full w-36 ml-1 mr-0 text-avukatimKirmizi'
                  />
                  <img
                    src='/profile1.png'
                    className='rounded-lg my-3 h-32 w-24 object-cover shadowLight'
                  />
                </div>

                <div className='w-full relative ml-3 md:mx-3 mb-5'>
                  <h1 className='w-full text-lg md:text-xl font-semibold leading-none'>
                    Furkan Koçkesen
                  </h1>
                  <p className='text-avukatimKirmizi text-md font-extrabold my-1 ml-2  leading-none'>
                    Avukat
                  </p>
                </div>
              </div>
              <div className='p-2'>
                <p className='text-center'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Veritatis neque modi magnam magni, ab adipisci aperiam autem
                  impedit, recusandae eum alias sit dignissimos delectus esse.
                  Architecto hic est fuga modi? Mollitia consequuntur distinctio
                  sint tempore expedita, quis exercitationem. Sequi a,
                  necessitatibus, ab quidem delectus vero ullam odit dicta ut
                  in, voluptates officia atque magni totam harum mollitia
                  doloremque nemo? Sint.
                </p>
              </div>
            </div>
            <div className='w-full shadowExtraLight rounded-md border border-gray-300 flex flex-row mb-4'>
              <div className='w-3/12 inline-flex flex-col'>
                <div className='inline-flex flex-row items-center'>
                  <VscLaw
                    size={32}
                    className='h-full w-36 ml-1 mr-0 text-avukatimKirmizi'
                  />
                  <img
                    src='/profile1.png'
                    className='rounded-lg my-3 h-32 w-24 object-cover shadowLight'
                  />
                </div>

                <div className='w-full relative ml-3 md:mx-3 mb-5'>
                  <h1 className='w-full text-lg md:text-xl font-semibold leading-none'>
                    Furkan Koçkesen
                  </h1>
                  <p className='text-avukatimKirmizi text-md font-extrabold my-1 ml-2  leading-none'>
                    Avukat
                  </p>
                </div>
              </div>
              <div className='p-2'>
                <p className='text-center'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Veritatis neque modi magnam magni, ab adipisci aperiam autem
                  impedit, recusandae eum alias sit dignissimos delectus esse.
                  Architecto hic est fuga modi? Mollitia consequuntur distinctio
                  sint tempore expedita, quis exercitationem. Sequi a,
                  necessitatibus, ab quidem delectus vero ullam odit dicta ut
                  in, voluptates officia atque magni totam harum mollitia
                  doloremque nemo? Sint.
                </p>
              </div>
            </div>
            <div className='w-full shadowExtraLight rounded-md border border-gray-300 flex flex-row mb-4'>
              <div className='w-3/12 inline-flex flex-col'>
                <div className='inline-flex flex-row items-center'>
                  <VscLaw
                    size={32}
                    className='h-full w-36 ml-1 mr-0 text-avukatimKirmizi'
                  />
                  <img
                    src='/profile1.png'
                    className='rounded-lg my-3 h-32 w-24 object-cover shadowLight'
                  />
                </div>

                <div className='w-full relative ml-3 md:mx-3 mb-5'>
                  <h1 className='w-full text-lg md:text-xl font-semibold leading-none'>
                    Furkan Koçkesen
                  </h1>
                  <p className='text-avukatimKirmizi text-md font-extrabold my-1 ml-2  leading-none'>
                    Avukat
                  </p>
                </div>
              </div>
              <div className='p-2'>
                <p className='text-center'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Veritatis neque modi magnam magni, ab adipisci aperiam autem
                  impedit, recusandae eum alias sit dignissimos delectus esse.
                  Architecto hic est fuga modi? Mollitia consequuntur distinctio
                  sint tempore expedita, quis exercitationem. Sequi a,
                  necessitatibus, ab quidem delectus vero ullam odit dicta ut
                  in, voluptates officia atque magni totam harum mollitia
                  doloremque nemo? Sint.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
