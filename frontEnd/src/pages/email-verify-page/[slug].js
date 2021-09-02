import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import HeaderSecondary from "../../components/HeaderSecondary";
import FooterSecondary from "../../components/FooterSecondary";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  ExclamationIcon,
} from "@heroicons/react/solid";
import Loader from "react-loader-spinner";

export default function YTG() {
  const router = useRouter();
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!router.isReady) return;
    function sleep(time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    }
    const fetchData = async () => {
      setStatus("fetching");
      const arr = router.query["slug"].split("beko");
      const uuid = arr[0];
      const token = arr[1];
      const url =
        "http://127.0.0.1:8000/api/users/verify/" + uuid + "/" + token;
      axios
        .get(url)
        .then((res) => {
          console.log("email onaylanmıştır");
          setStatus("success");
          sleep(4000).then(() => {
            router.push("/LoginPage");
          });
        })
        .catch((err) => {
          console.log("onaylanma başarısız");
          setStatus("fail");
        });
    };
    fetchData();
  }, [router.isReady]);

  return (
    <div>
      <Head>
        <title>Avukatım</title>
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
                Email Onaylanma{" "}
              </h1>

              <div className="w-11/12 my-10">
                {status === "fetching" ? (
                  <div className={`mb-3 self-center`}>
                    <Loader
                      type="TailSpin"
                      color="#741717"
                      height={35}
                      width={35}
                    />
                  </div>
                ) : status === "success" ? (
                  <div className="w-full justify-evenly mb-3 flex flex-row text-green-900 items-center">
                    <CheckCircleIcon className="h-5 flex-shrink-0" />
                    <p className="mx-1 text-center">
                      Email Onayınız Başarılı, Giriş Sayfasına
                      Yönlendiriliyorsunuz.
                    </p>
                  </div>
                ) : status === "fail" ? (
                  <div className="w-full justify-evenly mb-3 flex flex-row text-avukatimKirmizi items-center">
                    <ExclamationIcon className="h-5  flex-shrink-0" />
                    <p className=" text-center">
                      Email Onayınız Başarısız, Lütfen Tekrar Deneyiniz.
                    </p>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterSecondary />
    </div>
  );
}
