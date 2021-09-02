import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import {
  ExclamationCircleIcon,
  LocationMarkerIcon,
  PhoneIcon,
} from "@heroicons/react/solid";
import "yup-phone";
import { FaCity } from "react-icons/fa";

import { useSelector, useDispatch } from "react-redux";
import {
  clearState,
  getUserDetail,
  updateContact,
  userSelector,
} from "../../slices/userSlice";
import SuccessErrorComp from "../successErrorComp";

const validationSchema = Yup.object().shape({
  phone_number: Yup.string()
    .required("Telefon Numarası Gereklidir")
    .phone("TR", true, "Geçersiz Telefon Numarası"),
  /**/
  address: Yup.string(),
  city: Yup.string(),
});
function IletisimBilgileriUpdate() {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);
  const [oldPhone, setOldPhone] = useState("");
  const [oldAddress, setOldAddress] = useState("");
  const [oldCity, setOldCity] = useState("");

  const { userDetail, userInfo, isSuccess } = useSelector(userSelector);
  useEffect(() => {
    if (isSuccess) {
      console.log("2");
      dispatch(getUserDetail(userInfo.username));
    }
  }, [isSuccess]);

  useEffect(() => {
    setOldPhone(userDetail["phone_number"]);
    setOldAddress(userDetail["address"]);
    /*setOldCity(userDetail["city"]);*/

    console.log("1");
  }, [userDetail]);

  return (
    <Formik
      initialValues={{
        phone_number: "",
        address: "",
        city: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        dispatch(updateContact(values));
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
          <div className="text-xl font-semibold my-3">İletişim Bilgileri</div>

          <div className="w-full">
            <div
              className={`transition duration-500 ease-in-out inline-flex flex-row min-w-full bg-mainColor-mainGray items-center p-1 rounded border shadow-inner
               focus-within:outline focus-within:shadow-outline focus-within:border-avukatimKirmizi ${
                 errors.phone_number && touched.phone_number
                   ? "border-avukatimKirmizi"
                   : ""
               }`}
            >
              <PhoneIcon className="h-5 text-avukatimKirmizi" />
              <Field
                id="phone_number"
                name="phone_number"
                type="tel"
                className="focus:outline-none bg-mainColor-mainGray mx-3 w-full placeholder-avukatimKirmizi placeholder-opacity-50"
                placeholder="Telefon Numarası"
                value={values.phone_number ? values.phone_number : oldPhone}
                onChange={handleChange}
              />
            </div>
            <div className="text-opacity-60 text-avukatimKirmizi text-sm m-1">
              {errors.phone_number && touched.phone_number ? (
                <p>{errors.phone_number}</p>
              ) : (
                <p className="invisible">a</p>
              )}
            </div>
          </div>
          <div className="w-full">
            <div
              className={`transition duration-500 ease-in-out inline-flex flex-row min-w-full bg-mainColor-mainGray items-center p-1 rounded border shadow-inner
               focus-within:outline focus-within:shadow-outline focus-within:border-avukatimKirmizi`}
            >
              <LocationMarkerIcon className="h-5 text-avukatimKirmizi" />
              <Field
                id="address"
                name="address"
                type="text"
                className="focus:outline-none bg-mainColor-mainGray mx-3 w-full placeholder-avukatimKirmizi placeholder-opacity-50"
                placeholder="Adres"
                value={values.address ? values.address : oldAddress}
                onChange={handleChange}
              />
            </div>
            <div className="text-opacity-60 text-avukatimKirmizi text-sm m-1">
              {errors.address && touched.address ? (
                <p>{errors.address}</p>
              ) : (
                <p className="invisible">a</p>
              )}
            </div>
          </div>
          <div className="w-full">
            <div
              className={`transition duration-500 ease-in-out inline-flex flex-row min-w-full bg-mainColor-mainGray items-center p-1 rounded border shadow-inner
               focus-within:outline focus-within:shadow-outline focus-within:border-avukatimKirmizi`}
            >
              <FaCity className="h-5 text-avukatimKirmizi" />

              <Field
                id="city"
                name="city"
                as="select"
                className="focus:outline-none bg-mainColor-mainGray ml-3 w-full placeholder-avukatimKirmizi"
                value={values.city}
                onChange={handleChange}
              >
                <option>Şehir</option>
                <option value="1">Audi</option>
                <option value="2">BMW</option>
                <option value="3">Citroen</option>
                <option value="4">Ford</option>
                <option value="5">Honda</option>
                <option value="6">Jaguar</option>
                <option value="7">Land Rover</option>
                <option value="8">Mercedes</option>
                <option value="9">Mini</option>
                <option value="10">Nissan</option>
                <option value="11">Toyota</option>
                <option value="12">Volvo</option>
              </Field>
            </div>
            <div className="text-opacity-60 text-avukatimKirmizi text-sm m-1">
              {errors.city && touched.city ? (
                <p>{errors.city}</p>
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

export default IletisimBilgileriUpdate;

/*
<FaCity className="h-5 text-avukatimKirmizi" />
        <select
          id="city"
          name="city"
          className="focus:outline-none bg-mainColor-mainGray ml-3 w-full placeholder-avukatimKirmizi"
          onChange={(e) => setCity(e.target.value)}
        >
          <option>Şehir</option>
          <option value="1">Audi</option>
          <option value="2">BMW</option>
          <option value="3">Citroen</option>
          <option value="4">Ford</option>
          <option value="5">Honda</option>
          <option value="6">Jaguar</option>
          <option value="7">Land Rover</option>
          <option value="8">Mercedes</option>
          <option value="9">Mini</option>
          <option value="10">Nissan</option>
          <option value="11">Toyota</option>
          <option value="12">Volvo</option>
        </select>
*/
