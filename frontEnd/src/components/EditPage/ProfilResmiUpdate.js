import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { PhotographIcon } from "@heroicons/react/solid";

import { useSelector, useDispatch } from "react-redux";
import {
  clearState,
  getUserDetail,
  updatePhoto,
  userSelector,
} from "../../slices/userSlice";
import SuccessErrorComp from "../successErrorComp";

const validationSchema = Yup.object().shape({
  image: Yup.mixed()
    .required("Baro Belgenizi Yüklemeniz Zorunludur")
    .test("type", "*Sadece .jpeg .jpg .png Formatı", (value) => {
      if (value) {
        return (
          (value && value.type === "image/jpeg") ||
          value.type === "image/jpg" ||
          value.type === "image/png"
        );
      }
    })
    .test("fileSize", "*Sadece 2MB'tan küçük dosya", (value) => {
      return value && value.size <= 2000000;
    }),
});
function ProfilResmiUpdate() {
  const imageInput = React.createRef();
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);
  const [imageURL, setImageURL] = useState("");
  const { userDetail, userInfo, isSuccess } = useSelector(userSelector);
  useEffect(() => {
    if (isSuccess) {
      console.log("2");
      dispatch(getUserDetail(userInfo.username));
    }
  }, [isSuccess]);
  useEffect(() => {
    console.log("1");
    setImageURL(userDetail["profile_img"]);
  }, [userDetail]);

  return (
    <Formik
      initialValues={{
        image: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        dispatch(updatePhoto(values));
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
            Profil Resmi Değiştirme
          </div>
          <div className="my-5">
            {!values.image ? (
              imageURL ? (
                <div>
                  <img
                    src={imageURL}
                    className="rounded-lg h-56 w-56 object-cover object-center border-4 border-avukatimKirmizi-dark self-center"
                  />
                </div>
              ) : (
                <div>
                  <img
                    src="/FaviconFolder/android-chrome-512x512.png"
                    className="rounded-lg h-56 w-56 object-cover object-center border-4 border-avukatimKirmizi-dark self-center"
                  />
                </div>
              )
            ) : (
              ""
            )}
            {values.image ? (
              <div>
                <img
                  src={URL.createObjectURL(values.image)}
                  className="rounded-lg h-56 w-56 object-cover object-center border-4 border-avukatimKirmizi-dark self-center"
                />
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="w-full">
            <div
              onClick={() => imageInput.current.click()}
              className={`cursor-pointer transition duration-500 ease-in-out inline-flex flex-row min-w-full bg-mainColor-mainGray items-center p-1 rounded border shadow-inner
               focus-within:outline focus-within:shadow-outline focus-within:border-avukatimKirmizi ${
                 errors.image && touched.image ? "border-avukatimKirmizi" : ""
               }`}
            >
              <PhotographIcon className="h-5 text-avukatimKirmizi" />

              <input
                id="image"
                name="image"
                type="file"
                style={{ display: "none" }}
                onChange={(event) => {
                  console.log(event.currentTarget.files[0]);
                  setFieldValue("image", event.currentTarget.files[0]);
                }}
                ref={imageInput}
              />
              <div className="mx-2">Resim Seç</div>

              <div className="text-opacity-100 text-avukatimKirmizi text-sm font-medium m-1">
                {values.image ? (
                  <p>{values.image.name}</p>
                ) : (
                  <p className="invisible">a</p>
                )}
              </div>
            </div>
            <div className="text-opacity-60 text-avukatimKirmizi text-sm font-light m-1">
              {errors.image && touched.image ? (
                <p>{errors.image}</p>
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

export default ProfilResmiUpdate;
