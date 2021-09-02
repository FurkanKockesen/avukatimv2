import { ArrowRightIcon, InformationCircleIcon } from "@heroicons/react/solid";
import axios from "axios";
import React, { useState } from "react";
import Loader from "react-loader-spinner";

function ToMailPasswordChange(props) {
  const [toMail, setToMail] = useState("");

  const [isApiInfoDivVisible, setApiInfoDivVisible] = useState("invisible");
  const [apiInfo, setApiInfo] = useState("");
  const [isFetching, setFetching] = useState("invisible");
  const [status, setStatus] = useState("");

  const sendPasswordResetRequest = (toMail) => {
    const email = toMail;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    setFetching("");
    setStatus("Fetching");
    axios
      .post(
        "http://127.0.0.1:8000/api/users/password-reset-email/",
        { email },
        config
      )
      .then((res) => {
        setApiInfoDivVisible("text-green-900");
        setFetching("invisible");
        setApiInfo(res.data);
        setStatus("Final");
      })
      .catch((err) => {
        setApiInfoDivVisible("text-avukatimKirmizi");
        setApiInfo(err.response.data);
        setFetching("invisible");
        setStatus("Final");
        console.log(err.response.data);
      });
  };
  return (
    <div className=" w-10/12 mx-auto my-2">
      <div
        className={`${props.isVisible} flex flex-col min-w-full my-5 text-center`}
      >
        <div
          className="flex flex-row transition duration-500 ease-in-out min-w-full bg-mainColor-mainGray items-center rounded border shadow-inner
               focus-within:outline focus-within:shadow-outline focus-within:border-avukatimKirmizi"
        >
          <input
            type="email"
            className=" focus:outline-none bg-mainColor-mainGray mx-3 placeholder-avukatimKirmizi placeholder-opacity-50"
            placeholder="Şifre Yenilemek için Mail"
            value={toMail}
            onChange={(e) => {
              setToMail(e.target.value);
            }}
          />
          <button
            onClick={() => {
              sendPasswordResetRequest(toMail);
            }}
            className=" self-center text-white cursor-pointer ml-3 h-8 px-2 w-full text-center bg-avukatimKirmizi rounded-md transition-colors duration-500 focus:shadow-outline hover:bg-avukatimKirmizi-dark"
          >
            <ArrowRightIcon className="h-5  mx-auto" />
          </button>
        </div>
        <div className="flex items-center justify-center mt-2">
          {status === "Fetching" ? (
            <div className={`${isFetching} self-center`}>
              <Loader type="TailSpin" color="#741717" height={35} width={35} />
            </div>
          ) : status === "Final" ? (
            <div
              className={`${isApiInfoDivVisible} flex flex-row text-sm items-center`}
            >
              <InformationCircleIcon className="h-5" />
              <p className="my-2">{apiInfo.detail}</p>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ToMailPasswordChange;
