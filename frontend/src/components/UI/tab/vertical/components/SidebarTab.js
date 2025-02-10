import React from "react";

const SidebarTab = ({ children }) => {
  return (
    <ul className="w-[25%] m-0 p-0 flex flex-col justify-start items-center gap-2">
      {children}
    </ul>
  );
};

export default SidebarTab;
