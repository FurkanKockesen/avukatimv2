import React, { useEffect } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { LockClosedIcon } from "@heroicons/react/solid";

import { useDispatch } from "react-redux";
import { clearState, updatePassword } from "../../slices/userSlice";
import SuccessErrorComp from "../successErrorComp";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Şifre En 6 Karakter İçermeli")
    .required("Şifre Zorunludur"),
  password2: Yup.string()
    .oneOf([Yup.ref("password"), null], "Şifre Tekrarı Yanlış")
    .required("Şifre Tekrarı Zorunludur"),
});
function ParolaUpdate() {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  return (
    <Formik
      initialValues={{
        password: "",
        password2: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        dispatch(updatePassword(values));
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
          className="relative md:w-6/12 flex flex-col my-3"
          onSubmit={handleSubmit}
        >
          <div className="text-xl font-semibold my-3">Parola Değiştirme</div>

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
                className="focus:outline-none bg-mainColor-mainGray ml-3 w-5/12 placeholder-avukatimKirmizi placeholder-opacity-50"
                placeholder="Yeni Şifre"
                value={values.password}
                onChange={handleChange}
              />
            </div>
            <div className="text-opacity-60 text-avukatimKirmizi text-sm font-light mx-1 my-1 flex flex-row justify-between">
              {errors.password && touched.password ? (
                <p>{errors.password}</p>
              ) : (
                <p className="invisible">a</p>
              )}
            </div>
          </div>
          <div className="w-full">
            <div
              className={`transition duration-500 ease-in-out inline-flex flex-row min-w-full bg-mainColor-mainGray items-center p-1 rounded border shadow-inner
               focus-within:outline focus-within:shadow-outline focus-within:border-avukatimKirmizi ${
                 errors.password2 && touched.password2
                   ? "border-avukatimKirmizi"
                   : ""
               }`}
            >
              <LockClosedIcon className="h-5 text-avukatimKirmizi" />

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
              {errors.password2 && touched.password2 ? (
                <p>{errors.password2}</p>
              ) : (
                <p className="invisible">a</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-1/2 text-white cursor-pointer h-8 px-2 w-full text-center bg-avukatimKirmizi rounded-md transition-colors duration-500 focus:shadow-outline hover:bg-avukatimKirmizi-dark"
          >
            Kaydet
          </button>
          <div className="my-3">
            <SuccessErrorComp
              successWord="Güncelleme Başarılı"
              errorWord="Güncelleme Yapılamadı"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default ParolaUpdate;
