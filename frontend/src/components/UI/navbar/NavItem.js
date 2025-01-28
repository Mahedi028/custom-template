import React from "react";

const NavItem = ({name, link}) => {
  return (
    <li className="">
      <a
        href={link}
        className="uppercase font-title font-semibold text-center lg:text-1xl md:text-xl hover:text-btnOutline transition-colors duration-200"
      >
        {name}
      </a>
    </li>
  );
};

export default NavItem;
