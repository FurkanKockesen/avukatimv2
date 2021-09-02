import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { LockClosedIcon, UserIcon } from "@heroicons/react/solid";

import { useSelector, useDispatch } from "react-redux";
import { loginUser, userSelector, clearState } from "../slices/userSlice";

import { useRouter } from "next/router";

import Link from "next/link";
import SuccessErrorComp from "./successErrorComp";
import ToMailPasswordChange from "./ToMailPasswordChange";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Geçersiz Email").required("Email Zorunludur"),
  password: Yup.string().required("Şifre Boş Bırakılamaz"),
});
function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isSuccess } = useSelector(userSelector);

  const [sendMailDiv, setSendMailDivVisible] = useState("invisible");
  const setSendMailDivVisibleFunc = () => {
    setSendMailDivVisible("");
  };

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    if (isSuccess) {
      router.push("/");
    }
  }, [isSuccess]);

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        dispatch(clearState());
        dispatch(loginUser(values));
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
      }) => (
        <div className="w-full">
          <Form
            className="relative w-11/12 mx-auto flex flex-col mt-3"
            onSubmit={handleSubmit}
          >
            <div className="mb-3 self-center">
              <SuccessErrorComp
                successWord="Giriş Başarılı"
                errorWord="Giriş Yapılamadı"
              />
            </div>

            <div className="w-full">
              <div
                className={`transition duration-500 ease-in-out inline-flex flex-row min-w-full bg-mainColor-mainGray items-center p-1 rounded border shadow-inner
               focus-within:outline focus-within:shadow-outline focus-within:border-avukatimKirmizi ${
                 errors.email && touched.email ? "border-avukatimKirmizi" : ""
               }`}
              >
                <UserIcon className="h-5 text-avukatimKirmizi" />
                <Field
                  id="email"
                  name="email"
                  type="email"
                  className="focus:outline-none bg-mainColor-mainGray mx-3 placeholder-avukatimKirmizi placeholder-opacity-50"
                  placeholder="Mail"
                  value={values.email}
                  onChange={handleChange}
                />
              </div>
              <div className="text-opacity-60 text-avukatimKirmizi text-sm font-light m-1">
                {errors.email && touched.email ? (
                  <p>{errors.email}</p>
                ) : (
                  <p className="invisible">a</p>
                )}
              </div>
            </div>

            <div className="w-full">
              <div
                className={`transition duration-500 ease-in-out inline-flex flex-row min-w-full bg-mainColor-mainGray items-center p-1 rounded border shadow-inner
               focus-within:outline focus-within:shadow-outline focus-within:border-avukatimKirmizi ${
                 errors.password && touched.password
                   ? "border-avukatimKirmizi"
                   : ""
               }`}
              >
                <LockClosedIcon className="h-5 text-avukatimKirmizi" />
                <Field
                  id="password"
                  name="password"
                  type="password"
                  className="focus:outline-none bg-mainColor-mainGray mx-3 placeholder-avukatimKirmizi placeholder-opacity-50"
                  placeholder="Şifre"
                  value={values.password}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-row justify-between text-opacity-60 text-avukatimKirmizi text-sm font-light m-1">
                {errors.password && touched.password ? (
                  <p>{errors.password}</p>
                ) : (
                  <p className="invisible">a</p>
                )}
                <p
                  onClick={setSendMailDivVisibleFunc}
                  className="text-opacity-100 text-avukatimKirmizi text-md font-bold mx-2 cursor-pointer"
                >
                  Şifremi Unuttum
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="self-center text-white cursor-pointer mx-3 my-3 h-8 px-2 w-full text-center bg-avukatimKirmizi rounded-md transition-colors duration-500 focus:shadow-outline hover:bg-avukatimKirmizi-dark"
            >
              Giriş Yap
            </button>
            <div className="flex flex-col justify-center items-center my-3">
              <p className="text-opacity-60 text-avukatimKirmizi text-sm font-light">
                Hesabın Yokmu?
              </p>

              <Link href="/SignUpPage">
                <a>
                  <div className="inline-flex flex-row items-center">
                    <p className="w-4 border-b border-avukatimKirmizi"></p>
                    <p className="text-opacity-100 text-avukatimKirmizi text-md font-bold mx-1">
                      Hemen Kayıt Ol
                    </p>
                    <p className="w-4 border-b border-avukatimKirmizi"></p>
                  </div>
                </a>
              </Link>
            </div>
          </Form>
          <div className="w-10/12 mx-auto my-2">
            <ToMailPasswordChange isVisible={sendMailDiv} />
          </div>
        </div>
      )}
    </Formik>
  );
}

export default LoginForm;
