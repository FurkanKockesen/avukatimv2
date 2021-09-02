import Head from "next/head";
import Header from "../components/Header";
import Image from "next/image";
import Search from "../components/Search";
import ArticleListItem from "../components/ArticleListItem";
import ForumListItem from "../components/ForumListItem";
import Footer from "../components/Footer";

import { clearState } from "../slices/userSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);
  return (
    <div>
      <Head>
        <title>Avukatım</title>
        {/*
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
        <link rel="manifest" href="/site.webmanifest">
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
        <meta name="msapplication-TileColor" content="#ffffff">
        <meta name="theme-color" content="#ffffff">
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Header />

      <section
        className="hero relative w-full shadow-2xl mb-5"
        style={{ height: "80vh" }}
      >
        <div className="absolute w-full  h-full opacity-20 top-0 left-0 z-10 bg-black"></div>

        <div className="absolute z-20 flex flex-col md:flex-row w-full justify-between items-center h-full py-10 md:px-10">
          <div className="inline-flex flex-col sm:w-6/12 sm:ml-10 flex-none items-center text-center">
            <p className="text-white m-5 font-semibold text-3xl sm:text-4xl tracking-wider ">
              Türkiye'deki Seçkin Avukatlar Bir Tık Uzağınızda.
            </p>
            <div className="shadow my-5 w-10/12 md:w-8/12 min-w-max ">
              <Search />
            </div>
          </div>
        </div>

        <div className="relative h-full w-full ">
          <Image
            alt="Mountains"
            src="/heroImage.png"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </section>

      <section className="container w-full mx-5 md:mx-auto my-7">
        <div className="w-full flex flex-col xl:flex-row justify-between">
          <div className="w-full flex flex-col items-center p-2 md:mx-2">
            <h1 className="text-avukatimKirmizi text-3xl md:text-4xl font-bold mb-10">
              En Son Makaleler
            </h1>
            <ArticleListItem
              title="Neden Beraber Çalıştığımız Avukatları Dikkatli Seçmeliyiz?"
              author="Furkan Koçkesen"
            />
            <ArticleListItem
              title="Neden Beraber Çalıştığımız Avukatları Dikkatli Seçmeliyiz?"
              author="Berke Karataş"
            />
          </div>
          <div className="w-full flex flex-col items-center p-2 md:mx-5">
            <h1 className="text-avukatimKirmizi text-3xl md:text-4xl font-bold mb-10">
              En Son Sorular
            </h1>
            <ForumListItem
              title="Neden Beraber Çalıştığımız Avukatları Dikkatli Seçmeliyiz?"
              author="Furkan Koçkesen"
            />
            <ForumListItem
              title="Neden Beraber Çalıştığımız Avukatları Dikkatli Seçmeliyiz?"
              author="Berke Karataş"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
