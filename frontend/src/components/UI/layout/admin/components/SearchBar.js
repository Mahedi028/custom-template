import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
  
  const [keyword, setKeyword] = useState("");

  return (
    <div className="col-span-5 bg-gray-200 flex justify-center items-center rounded-2xl">
      <input className="w-4/5 bg-gray-200 p-3  focus:outline-none" />
      <CiSearch className="text-2xl text-black text-center font-bold" />
    </div>
  );
};

export default SearchBar;
