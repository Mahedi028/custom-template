import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-200 flex flex-col justify-center items-center mt-1">
      <div className="w-4/5 grid md:grid-cols-4 grid-cols-1 md:justify-start justify-center items-center p-2">
        <div className="w-full flex flex-col justify-center items-start gap-3">
          <div className="w-[80px] h-[50px] ">
            <img src="/assets/logo/logo.png" className="w-full h-full" />
          </div>
          <p className="w-4/5 text-stone-700 text-left font-text">
            Fashion is a popular aesthetic expression at a particular time,
            place and in a specific context, especially in clothing, footwear,
            lifestyle, accessories, makeup.
          </p>
        </div>
        <ul className="w-full flex flex-col justify-center items-start gap-2">
          <li>
            <a href="" className="text-stone-700 text-left font-text">
              Home
            </a>
          </li>
          <li>
            <a href="" className="text-stone-700 text-left font-text">
              Shop
            </a>
          </li>
          <li>
            <a href="" className="text-stone-700 text-left font-text">
              Blog
            </a>
          </li>
          <li>
            <a href="" className="text-stone-700 text-left font-text">
              Contact
            </a>
          </li>
        </ul>
        <ul className="w-full flex flex-col justify-center items-start gap-2">
          <li>
            <a href="" className="text-stone-700 text-left font-text">
              How it works
            </a>
          </li>
          <li>
            <a href="" className="text-stone-700 text-left font-text">
              About us
            </a>
          </li>
          <li>
            <a href="" className="text-stone-700 text-left font-text">
              Decline rules
            </a>
          </li>
          <li>
            <a href="" className="text-stone-700 text-left font-text">
              Terms & Conditions
            </a>
          </li>
        </ul>
        <ul className="w-full flex flex-col justify-center items-start gap-2">
          <li>
            <a href="" className="text-stone-700 text-left font-text">
              FAQ
            </a>
          </li>
          <li>
            <a href="" className="text-stone-700 text-left font-text">
              Terms of use
            </a>
          </li>
          <li>
            <a href="" className="text-stone-700 text-left font-text">
              Privacy Policy
            </a>
          </li>
        </ul>
      </div>
      <div className="w-full bg-gray2 flex justify-center items-center p-3">
        <div className="w-4/5 grid grid-cols-2 justify-around items-center">
          <p className="w-full text-stone-700 text-left font-text">
            © Clay Shop all rights reserved
          </p>
          <div className="w-full flex justify-end items-center">
            <FaFacebookF className="text-3xl text-stone-700 cursor-pointer px-2" />
            <FaXTwitter className="text-3xl text-stone-700 cursor-pointer px-2" />
            <FaInstagram className="text-3xl text-stone-700 cursor-pointer px-2" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
