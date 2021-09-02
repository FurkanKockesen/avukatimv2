import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { MailIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  clearState,
  getUserDetail,
  updateEmail,
  userSelector,
} from "../../slices/userSlice";
import SuccessErrorComp from "../successErrorComp";

function EmailUpdate(props) {
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Geçersiz Email")
      .required("Email Zorunludur")
      .test(
        "userMailIsUnique",
        "Bu Email Kullanılmaktadır",
        (val) => !props.emailList.includes(val)
      ),
  });
  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);
  const [oldEmail, setOldEmail] = useState("");
  const { userDetail, userInfo, isSuccess } = useSelector(userSelector);
  useEffect(() => {
    if (isSuccess) {
      console.log("2");
      dispatch(getUserDetail(userInfo.username));
    }
  }, [isSuccess]);
  useEffect(() => {
    setOldEmail(userDetail["email"]);
    console.log("1");
  }, [userDetail]);

  return (
    <Formik
      initialValues={{
        email: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        dispatch(updateEmail(values));
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
          <div className="text-xl font-semibold my-3">Email Değiştirme</div>

          <div className="w-full">
            <div
              className={`transition duration-500 ease-in-out inline-flex flex-row min-w-full bg-mainColor-mainGray items-center p-1 rounded border shadow-inner
               focus-within:outline focus-within:shadow-outline focus-within:border-avukatimKirmizi ${
                 errors.email && touched.email ? "border-avukatimKirmizi" : ""
               }`}
            >
              <MailIcon className="h-5 text-avukatimKirmizi" />
              <Field
                id="email"
                name="email"
                type="email"
                className="focus:outline-none bg-mainColor-mainGray mx-3 w-full placeholder-avukatimKirmizi placeholder-opacity-50"
                placeholder="Email"
                value={!values.email ? oldEmail : values.email}
                onChange={handleChange}
              />
            </div>
            <div className="text-opacity-60 text-avukatimKirmizi text-sm m-1">
              {errors.email && touched.email ? (
                <p>{errors.email}</p>
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

export default EmailUpdate;
