
import React, { forwardRef, useState } from "react";
import { FaHome } from "react-icons/fa";

const SideBar = ({ sidebarRef, collapse, onOpenSidebar, title, children}) => {


  const sidebarCollapse = "w-[5%] bg-white h-[90vh]";
  const sidebar = "w-1/5 bg-white h-[90vh]";

  return (
    <aside className={!collapse ? sidebar : sidebarCollapse} ref={sidebarRef}>
      <h4
        className={
          !collapse
            ? "text-center text-2xl border-b-[2px] border-stone-300 py-4 font-semibold"
            : "hidden"
        }
      >
        {title}
      </h4>
     {children}
    </aside>
  );
};

export default SideBar;
