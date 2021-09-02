import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

import IletisimBilgileriUpdate from "../components/EditPage/IletisimBilgileriUpdate";
import KullaniciAdiUpdate from "../components/EditPage/KullaniciAdiUpdate";
import ParolaUpdate from "../components/EditPage/ParolaUpdate";
import EmailUpdate from "../components/EditPage/EmailUpdate";
import HakkimdaUpdate from "../components/EditPage/HakkimdaUpdate";
import ProfilResmiUpdate from "../components/EditPage/ProfilResmiUpdate";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { getUserDetail, userSelector } from "../slices/userSlice";

export default function ArticleSearchPage() {
  const dispatch = useDispatch();

  const [formType, setFormType] = useState("iletisimBilgileri");
  const [emailList, setEmailList] = useState([]);
  const [usernameList, setUsernameList] = useState([]);

  const fetchData = () => {
    axios
      .get("http://127.0.0.1:8000/api/users/informations/emails/")
      .then((res) => {
        setEmailList(res.data.map((mailObj) => mailObj["email"]));
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("http://127.0.0.1:8000/api/users/informations/usernames/")
      .then((res) => {
        setUsernameList(res.data.map((usernameObj) => usernameObj["username"]));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  const { userInfo } = useSelector(userSelector);
  useEffect(() => {
    console.log("EditPage getUserDetail");
    dispatch(getUserDetail(userInfo.username));
  }, []);

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

      <Header />

      <main className="max-w-6xl mx-auto my-16 p-5">
        <div className="shadowLight w-full bg-white  rounded-lg mx-auto flex flex-col md:flex-row my-10 p-5 ">
          <div className="flex flex-col text-avukatimKirmizi mx-1 my-1 mb-10 border-2 rounded-md md:w-1/5">
            <div className="text-md font-bold px-2 py-3 border-b">
              Hesap Bilgileri
            </div>
            <div
              onClick={() => {
                setFormType("iletisimBilgileri");
                console.log(formType);
              }}
              className={`text-md px-2 py-3 border-b hover:bg-gray-200 hover:font-bold transition-all duration-150 cursor-pointer ${
                formType == "iletisimBilgileri"
                  ? "bg-gray-200 font-bold border-l-2 border-l-avukatimKirmizi"
                  : ""
              }`}
            >
              İletişim Bilgileri
            </div>
            <div
              onClick={() => {
                setFormType("profilResmi");
                console.log(formType);
              }}
              className={`text-md px-2 py-3 border-b hover:bg-gray-200 hover:font-bold transition-all duration-150 cursor-pointer ${
                formType == "profilResmi"
                  ? "bg-gray-200 font-bold border-l-2 border-l-avukatimKirmizi"
                  : ""
              }`}
            >
              Profil Resmi
            </div>
            <div
              onClick={() => {
                setFormType("kullaniciAdi");
                console.log(formType);
              }}
              className={`text-md px-2 py-3 border-b hover:bg-gray-200 hover:font-bold transition-all duration-150 cursor-pointer ${
                formType == "kullaniciAdi"
                  ? "bg-gray-200 font-bold border-l-2 border-l-avukatimKirmizi"
                  : ""
              }`}
            >
              Kullanıcı Adı
            </div>
            <div
              onClick={() => {
                setFormType("parola");
                console.log(formType);
              }}
              className={`text-md px-2 py-3 border-b hover:bg-gray-200 hover:font-bold transition-all duration-150 cursor-pointer ${
                formType == "parola"
                  ? "bg-gray-200 font-bold border-l-2 border-l-avukatimKirmizi"
                  : ""
              }`}
            >
              Parola
            </div>
            <div
              onClick={() => {
                setFormType("email");
                console.log(formType);
              }}
              className={`text-md px-2 py-3 border-b hover:bg-gray-200 hover:font-bold transition-all duration-150 cursor-pointer ${
                formType == "email"
                  ? "bg-gray-200 font-bold border-l-2 border-l-avukatimKirmizi"
                  : ""
              }`}
            >
              Email
            </div>
            <div
              onClick={() => {
                setFormType("hakkimda");
                console.log(formType);
              }}
              className={`text-md px-2 py-3 border-b hover:bg-gray-200 hover:font-bold transition-all duration-150 cursor-pointer ${
                formType == "hakkimda"
                  ? "bg-gray-200 font-bold border-l-2 border-l-avukatimKirmizi"
                  : ""
              }`}
            >
              Hakkımda
            </div>
            <div
              onClick={() => {
                setFormType("deneyim");
                console.log(formType);
              }}
              className={`text-md px-2 py-3 border-b hover:bg-gray-200 hover:font-bold transition-all duration-150 cursor-pointer ${
                formType == "deneyim"
                  ? "bg-gray-200 font-bold border-l-2 border-l-avukatimKirmizi"
                  : ""
              }`}
            >
              Deneyim
            </div>
            <div
              onClick={() => {
                setFormType("egitim");
                console.log(formType);
              }}
              className={`text-md px-2 py-3 border-b hover:bg-gray-200 hover:font-bold transition-all duration-150 cursor-pointer ${
                formType == "egitim"
                  ? "bg-gray-200 font-bold border-l-2 border-l-avukatimKirmizi"
                  : ""
              }`}
            >
              Eğitim
            </div>
            <div
              onClick={() => {
                setFormType("yayinlar");
                console.log(formType);
              }}
              className={`text-md px-2 py-3 border-b hover:bg-gray-200 hover:font-bold transition-all duration-150 cursor-pointer ${
                formType == "yayinlar"
                  ? "bg-gray-200 font-bold border-l-2 border-l-avukatimKirmizi"
                  : ""
              }`}
            >
              Yayınlar ve Ödüller
            </div>
          </div>
          <div className="md:w-3/5 md:m-5 my-5 text-avukatimKirmizi">
            {formType == "iletisimBilgileri" ? <IletisimBilgileriUpdate /> : ""}
            {formType == "profilResmi" ? <ProfilResmiUpdate /> : ""}
            {formType == "kullaniciAdi" ? (
              <KullaniciAdiUpdate usernameList={usernameList} />
            ) : (
              ""
            )}
            {formType == "parola" ? <ParolaUpdate /> : ""}
            {formType == "email" ? <EmailUpdate emailList={emailList} /> : ""}
            {formType == "hakkimda" ? <HakkimdaUpdate /> : ""}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
