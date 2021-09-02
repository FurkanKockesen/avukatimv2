import React from "react";
import {
  ExternalLinkIcon,
  PencilAltIcon,
  SearchIcon,
  UserIcon,
} from "@heroicons/react/solid";
import Link from "next/link";

const components = {
  PencilAltIcon: PencilAltIcon,
  SearchIcon: SearchIcon,
  UserIcon: UserIcon,
  ExtarnalLinkIcon: ExternalLinkIcon,
};

function ButtonPrimary(props) {
  const IconComponent = components[props.Icon];
  return (
    <div className="inline-flex text-white  cursor-pointer items-center mx-3">
      <div className="h-7 md:h-8 max-w-lg md:px-3 px-1 inline-flex items-center bg-avukatimKirmizi-dark rounded-l-sm">
        <IconComponent className="h-4 md:h-5" />
      </div>
      <div className="h-7 md:h-8 md:px-2 px-1 inline-flex items-center w-24 text-center bg-avukatimKirmizi rounded-r-sm transition-colors duration-500 focus:shadow-outline hover:bg-avukatimKirmizi-dark">
        <span>{props.text}</span>
      </div>
    </div>
  );
}

export default ButtonPrimary;
