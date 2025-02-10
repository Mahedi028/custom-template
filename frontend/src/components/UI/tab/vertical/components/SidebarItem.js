import React from "react";

const SidebarItem = ({active,onClick,title,icon}) => {
  return (
    <li className="w-full relative bg-gray-200 p-3 rounded-md" onClick={onClick}>
      <a>
        <span>{icon}</span>
        {title}
      </a>
    </li>
  );
};

export default SidebarItem;
