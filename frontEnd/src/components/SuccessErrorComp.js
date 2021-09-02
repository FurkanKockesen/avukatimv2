import {
  ExclamationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/outline";
import React from "react";
import Loader from "react-loader-spinner";
import { useSelector } from "react-redux";
import { userSelector } from "../slices/userSlice";

function SuccessErrorComp(props) {
  const {
    isFetching,
    isSuccess,
    isError,
    actionMessage,
    errorMessage,
    userInfo,
    isLogin,
  } = useSelector(userSelector);

  return (
    <div className="text-md">
      {isFetching ? (
        <div className={`self-center`}>
          <Loader type="TailSpin" color="#741717" height={36} width={36} />
        </div>
      ) : (
        ""
      )}
      {isSuccess ? (
        <div
          className={`w-full justify-evenly flex flex-row items-center text-green-900`}
        >
          <CheckCircleIcon className="h-5 mr-1 flex-shrink-0" />
          <h1
            className={`transition-all duration-500 ease-in-out text center text-center font-bold text-opacity-70`}
          >
            {props.successWord}
          </h1>
        </div>
      ) : (
        ""
      )}
      {isError ? (
        <div className="flex flex-col  items-center text-avukatimKirmizi">
          <div className="flex flex-row items-center">
            <ExclamationCircleIcon className="h-5 mr-1 text-avukatimKirmizi " />
            <h1
              className={`transition-all duration-500 ease-in-out text center text-avukatimKirmizi text-center font-bold text-opacity-70`}
            >
              {props.errorWord}
            </h1>
          </div>
          <p className="text-sm">{actionMessage}</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default SuccessErrorComp;
