import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { UserIcon } from "@heroicons/react/solid";

import { useDispatch, useSelector } from "react-redux";
import {
  clearState,
  getUserDetail,
  updateUserName,
  userSelector,
} from "../../slices/userSlice";
import SuccessErrorComp from "../successErrorComp";

function KullaniciAdiUpdate(props) {
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Kullanıcı Adı Zorunludur")
      .test(
        "usernameIsUnique",
        "Bu Kullanıcı Adı Alınmıştır",
        (val) => !props.usernameList.includes(val)
      )
      .matches(
        /^[a-zA-Z0-9_.-]*$/,
        "Sadece Harf, Rakam, Tire, Nokta, Alt-Tire"
      ),
  });

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);
  const [oldUsername, setOldUsername] = useState("");
  const { userDetail, userInfo, isSuccess } = useSelector(userSelector);
  useEffect(() => {
    if (isSuccess) {
      console.log("2");
      dispatch(getUserDetail(userInfo.username));
    }
  }, [isSuccess]);

  useEffect(() => {
    setOldUsername(userDetail["username"]);
    console.log("1");
  }, [userDetail]);

  return (
    <Formik
      initialValues={{
        username: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        dispatch(updateUserName(values));
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
          <div className="text-xl font-semibold my-3">
            Kullanıcı Adı Değiştirme
          </div>
          <div className="w-full">
            <div
              className={`transition duration-500 ease-in-out inline-flex flex-row min-w-full bg-mainColor-mainGray items-center p-1 rounded border shadow-inner
               focus-within:outline focus-within:shadow-outline focus-within:border-avukatimKirmizi ${
                 errors.username && touched.username
                   ? "border-avukatimKirmizi"
                   : ""
               }`}
            >
              <UserIcon className="h-5 text-avukatimKirmizi" />
              <Field
                id="username"
                name="username"
                type="text"
                className="focus:outline-none bg-mainColor-mainGray mx-3 w-full placeholder-avukatimKirmizi placeholder-opacity-50"
                placeholder="Kullanıcı Adı"
                value={!values.username ? oldUsername : values.username}
                onChange={handleChange}
              />
            </div>
            <div className="text-opacity-60 text-avukatimKirmizi text-sm m-1">
              {errors.username && touched.username ? (
                <p>{errors.username}</p>
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

export default KullaniciAdiUpdate;
