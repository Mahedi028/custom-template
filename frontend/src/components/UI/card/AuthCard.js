import React from "react";

const AuthCard = ({ title, children, onSubmit, className }) => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <form onStalled={onSubmit} className={className ? className : "md:w-[70%] w-11/12 bg-gray-200 flex flex-col justify-center items-center gap-3 rounded-md drop-shadow-md"}>
        <h3 className="p-2 text-center text-black font-semibold my-2">
          {title}
        </h3>
        {children}
      </form>
    </div>
  );
};

export default AuthCard;
