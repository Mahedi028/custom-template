import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-white flex flex-col justify-center items-center mt-1">
      <div className="w-full bg-gray-300 flex justify-center items-center p-3">
        <div className="w-4/5 flex justify-center items-center">
          <p className="w-full text-stone-700 text-center font-text">
            © Clay Shop all rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
