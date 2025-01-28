import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";

const SearchBar = () => {

  const [keyword, setKeyword] = useState("");

  return (
    <div className="w-3/5 h-[45px] bg-gray2 flex rounded-full justify-around items-center">
      <input type="" className="w-4/5 bg-gray2 p-2 focus:outline-none" />
      <CiSearch className="text-2xl text-pink text-center " />
    </div>
  );
};

export default SearchBar;
