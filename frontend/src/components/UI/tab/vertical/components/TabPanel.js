import React from "react";

const TabPanel = ({children}) => {
  return (
    <div className="w-[75%] flex flex-col justify-center items-center">
      {children}
    </div>
  );
};

export default TabPanel;
