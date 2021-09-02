import Head from "next/head";
import HeaderSecondary from "../components/HeaderSecondary";
import FooterSecondary from "../components/FooterSecondary";
import LoginForm from "../components/LoginForm";

export default function Home() {
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

      <HeaderSecondary />

      <section className="relative w-full h-screen">
        <div className="h-full w-full inline-flex flex-row justify-evenly flex-1">
          <div className="hidden md:block h-full w-full flex-1">
            <div className="loginHero h-full relative "></div>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <div className="flex flex-col items-center w-80 lg:w-96 max-w-full shadowLight bg-white  rounded-lg mx-auto mb-10">
              <h1 className="text-3xl font-semibold text-avukatimKirmizi mt-5">
                Giriş Yap
              </h1>
              <LoginForm />
            </div>
          </div>
        </div>
      </section>

      <FooterSecondary />
    </div>
  );
}
