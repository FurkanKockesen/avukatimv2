import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { PencilAltIcon } from "@heroicons/react/solid";

import { useDispatch, useSelector } from "react-redux";
import {
  clearState,
  getUserDetail,
  updateAbout,
  userSelector,
} from "../../slices/userSlice";
import SuccessErrorComp from "../successErrorComp";

const validationSchema = Yup.object().shape({
  hakkimda: Yup.string(),
});
function HakkimdaUpdate() {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  const [oldDescription, setOldDescription] = useState("");
  const { userDetail, userInfo, isSuccess } = useSelector(userSelector);
  useEffect(() => {
    if (isSuccess) {
      console.log("2");
      dispatch(getUserDetail(userInfo.username));
    }
  }, [isSuccess]);
  useEffect(() => {
    setOldDescription(userDetail["description"]);
    console.log("1");
  }, [userDetail]);

  return (
    <Formik
      initialValues={{
        hakkimda: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        dispatch(updateAbout(values));
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
          className="relative md:w-10/12 flex flex-col my-3"
          onSubmit={handleSubmit}
        >
          <div className="text-xl font-semibold my-3">
            Hakkımda Yazısı Değiştirme
          </div>
          <div className="w-full">
            <div
              className={`transition duration-500 ease-in-out inline-flex flex-row min-w-full bg-mainColor-mainGray items-center p-1 rounded border shadow-inner
               focus-within:outline focus-within:shadow-outline focus-within:border-avukatimKirmizi ${
                 errors.hakkimda && touched.hakkimda
                   ? "border-avukatimKirmizi"
                   : ""
               }`}
            >
              <PencilAltIcon className="h-5 text-avukatimKirmizi self-start" />

              <Field
                id="hakkimda"
                name="hakkimda"
                type="text"
                as="textarea"
                rows="12"
                className="focus:outline-none bg-mainColor-mainGray mx-3 w-full placeholder-avukatimKirmizi placeholder-opacity-50"
                placeholder="Hakkımda"
                value={values.hakkimda ? values.hakkimda : oldDescription}
                onChange={handleChange}
              />
            </div>
            <div className="text-opacity-60 text-avukatimKirmizi text-sm m-1">
              {errors.hakkimda && touched.hakkimda ? (
                <p>{errors.hakkimda}</p>
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

export default HakkimdaUpdate;
