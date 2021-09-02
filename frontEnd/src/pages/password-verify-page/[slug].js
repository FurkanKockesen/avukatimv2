import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import HeaderSecondary from "../../components/HeaderSecondary";
import FooterSecondary from "../../components/FooterSecondary";
import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  ExclamationIcon,
  LockClosedIcon,
} from "@heroicons/react/solid";
import Loader from "react-loader-spinner";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Şifre En 6 Karakter İçermeli")
    .required("Şifre Zorunludur"),
  password2: Yup.string()
    .oneOf([Yup.ref("password"), null], "Şifre Tekrarı Yanlış")
    .required("Şifre Tekrarı Zorunludur"),
});
export default function YTG2() {
  const router = useRouter();
  const [status, setStatus] = useState("");

  const sendPasswordChangeRequest = (new_password) => {
    setStatus("fetching");
    const arr = router.query["slug"].split("beko");
    const uidb64 = arr[0];
    const token = arr[1];
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(new_password, uidb64, token);
    axios
      .put(
        "http://127.0.0.1:8000/api/users/password-set-update/",
        { new_password, uidb64, token },
        config
      )
      .then((res) => {
        console.log(res);
        setStatus("success");
        router.push("/LoginPage");
      })
      .catch((err) => {
        console.log(err.response.data.detail);
        setStatus("fail");
      });
  };

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
                Giriş Yap
              </h1>
              <Formik
                initialValues={{
                  password: "",
                  password2: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  sendPasswordChangeRequest(values.password);
                }}
              >
                {({
                  values,
                  touched,
                  errors,
                  dirty,
                  isSubmitting,
                  handleSubmit,
                  handleReset,
                  handleChange,
                  setFieldValue,
                }) => (
                  <Form
                    className="relative w-11/12 mx-auto flex flex-col my-3"
                    onSubmit={handleSubmit}
                  >
                    <div className="w-full">
                      <div
                        className={`transition duration-500 ease-in-out inline-flex flex-row min-w-full bg-mainColor-mainGray items-center p-1 rounded border shadow-inner
               focus-within:outline focus-within:shadow-outline focus-within:border-avukatimKirmizi ${
                 (errors.password && touched.password) ||
                 (errors.password2 && touched.password2)
                   ? "border-avukatimKirmizi"
                   : ""
               }`}
                      >
                        <LockClosedIcon className="h-5 text-avukatimKirmizi" />
                        <Field
                          id="password"
                          name="password"
                          type="password"
                          className="focus:outline-none bg-mainColor-mainGray ml-3 w-5/12 placeholder-avukatimKirmizi placeholder-opacity-50"
                          placeholder="Yeni Şifre"
                          value={values.password}
                          onChange={handleChange}
                        />
                        <p className="h-5 border-l border-avukatimKirmizi"></p>
                        <Field
                          id="password2"
                          name="password2"
                          type="password"
                          className="focus:outline-none bg-mainColor-mainGray ml-3 w-5/12 placeholder-avukatimKirmizi placeholder-opacity-50"
                          placeholder="Şifre Tekrarı"
                          value={values.password2}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="text-opacity-60 text-avukatimKirmizi text-sm font-light mx-1 my-1 flex flex-row justify-between">
                        {errors.password && touched.password ? (
                          <p>{errors.password}</p>
                        ) : (
                          <p className="invisible">a</p>
                        )}
                        {errors.password2 && touched.password ? (
                          <p>{errors.password2}</p>
                        ) : (
                          <p className="invisible">a</p>
                        )}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="self-center text-white cursor-pointer mx-3 my-3 h-8 px-2 w-full text-center bg-avukatimKirmizi rounded-md transition-colors duration-500 focus:shadow-outline hover:bg-avukatimKirmizi-dark"
                    >
                      Şifremi Güncelle
                    </button>
                  </Form>
                )}
              </Formik>
              <div className="w-11/12">
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
                      Güncelleme İşleminiz Başarılı, Sağdaki Ok'a Tıklayarak
                      Tekrar Giriş Yapınız.
                    </p>
                    <ArrowRightIcon className="h-7  flex-shrink-0" />
                  </div>
                ) : status === "fail" ? (
                  <div className="w-full justify-evenly mb-3 flex flex-row text-avukatimKirmizi items-center">
                    <ExclamationIcon className="h-5  flex-shrink-0" />
                    <p className=" text-center">
                      Güncelleme Başarısız, Lütfen Tekrar Deneyiniz.
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
