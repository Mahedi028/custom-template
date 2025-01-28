import React from "react";
import { FaBars } from "react-icons/fa6";
import SearchBar from "./SearchBar";
import { IoIosNotifications } from "react-icons/io";
import { FaMessage } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { signOut, useSession } from "next-auth/react";
import { CiSearch } from "react-icons/ci";

const Header = ({ onToggleMenu, logo }) => {
  //use hook
  const { data: session } = useSession();
  return (
    <header className="w-full h-[60px] grid grid-cols-12 bg-white justify-around items-center border-b-[2px] border-stone-300">
      <div className="col-span-2 flex justify-center items-center">
        {logo?<img src={logo} />:<h3 className="uppercase text-indigo-800 text-2xl font-semibold">E-Courier</h3>}
      </div>
      <div className="flex justify-start items-center">
        <FaBars className="text-2xl cursor-pointer" onClick={onToggleMenu} />
      </div>
      <div className="col-span-5 bg-gray2 flex justify-center items-center rounded-2xl">
        <input className="w-4/5 bg-gray2 p-3  focus:outline-none" />
        <CiSearch className="text-2xl text-black text-center font-bold" />
      </div>
      <div className="col-span-4 w-full flex justify-center items-center">
        <div className="w-4/5 flex justify-end items-center">
          <div className="w-[45px] h-[45px] border-2 border-slate-700 rounded-full flex justify-center items-center mx-2">
            <IoIosNotifications className="text-3xl text-black text-center font-bold mx-3" />
          </div>
          <div className="w-[45px] h-[45px] border-2 border-slate-700 rounded-full flex justify-center items-center mx-2">
            <FaMessage className="text-3xl text-black text-center font-bold mx-3" />
          </div>
          <div className="w-[45px] h-[45px] border-2 border-slate-700 rounded-full flex justify-center items-center mx-2">
            <CgProfile className="text-3xl text-black text-center font-bold" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
