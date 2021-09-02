import React from "react";
import { ArrowRightIcon } from "@heroicons/react/solid";

const components = {
  ArrowRightIcon: ArrowRightIcon,
};

function ButtonSecondary(props) {
  const IconComponent = components[props.Icon];
  return (
    <div className="inline-flex text-white  cursor-pointer items-center my-2">
      <div className="h-8 md:px-2 px-1 inline-flex items-center w-24 text-center bg-avukatimKirmizi rounded-l-sm transition-colors duration-500 focus:shadow-outline hover:bg-avukatimKirmizi-dark">
        <span>{props.text}</span>
      </div>
      <div className="h-8 max-w-lg md:px-3 px-1 inline-flex items-center bg-avukatimKirmizi-dark rounded-r-sm">
        <IconComponent className="h-5" />
      </div>
    </div>
  );
}

export default ButtonSecondary;
