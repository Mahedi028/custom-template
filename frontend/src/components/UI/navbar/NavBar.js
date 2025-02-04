import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Button from "../button/Button";
import NavItem from "./NavItem";
import { useSession, signOut } from "next-auth/react";

const Navigation = ({ siteTitle, siteLogo, profileImg, profileIcon }) => {
  //user session
  const { data: session } = useSession();
  //set menu show
  const [showMenu, setShowMenu] = useState(false);
  //handle navigation
  const handleShowMenu = () => setShowMenu((showMenu) => !showMenu);
  //mobile menu class
  const mobileHeaderClass =
    "z-20 w-full h-screen bg-gray-200 flex flex-col justify-center items-center";
  const mobileNavClass =
    "w-full h-5/6 text-textColor flex flex-col justify-around items-center";
  const mobileMenuClass =
    "h-full flex flex-col justify-around items-center gap-5";

  return (
    <header
      className={
        showMenu
          ? mobileHeaderClass
          : "w-full h-[80px] bg-gray-200 flex justify-center items-center"
      }
    >
      <nav
        className={
          showMenu
            ? mobileNavClass
            : "w-11/12 text-textColor flex justify-around items-center"
        }
      >
        {!showMenu ? (
          <>
            <FaBars
              className="lg:hidden block absolute text-3xl top-[25px] left-[20px] cursor-pointer hover:text-btnOutline transition-colors duration-200"
              onClick={handleShowMenu}
            />
            <a href="">
              <div className="absolute lg:hidden block top-[20px] right-[15px] w-[60px] h-[60px]">
                {profileImg && (
                  <img
                    src={profileImg}
                    className="w-full h-full object-cover"
                  />
                )}
                {profileIcon && profileIcon}
              </div>
            </a>
          </>
        ) : (
          <FaTimes
            className="lg:hidden block absolute  text-3xl top-[40px] left-[20px] cursor-pointer hover:text-btnOutline transition-colors duration-200"
            onClick={handleShowMenu}
          />
        )}
        <div className="w-full h-full grid md:grid-cols-12  md:flex-col justify-center md:items-center items-start">
          <div className="col-span-1 md:col-span-2 flex flex-col justify-center items-center">
            <div className="w-[100px] h-[80px] md:m-0 m-auto flex md:justify-start justify-center items-center">
              {siteLogo && (
                <img src={siteLogo} className="w-full h-full object-cover" />
              )}
              {siteTitle && (
                <h4 className="uppercase font-title font-semibold text-center lg:text-1xl md:text-xl hover:text-btnOutline transition-colors duration-200">
                  {siteTitle}
                </h4>
              )}
            </div>
          </div>
          <div className="col-span-1 md:col-span-7 flex flex-col justify-center items-center">
            <ul
              className={
                showMenu
                  ? mobileMenuClass
                  : "w-11/12 lg:flex justify-center items-center hidden gap-8"
              }
            >
              <NavItem name="Home" link="/" />
              <NavItem name="About us" link="/about-us" />
              <NavItem name="Contact us" link="/contact-us" />
            </ul>
          </div>
          <div className="col-span-1 md:col-span-3 flex flex-col justify-center items-center">
            {session && session.user ? (
              <ul
                className={
                  showMenu
                    ? mobileMenuClass
                    : "w-11/12 lg:flex justify-around items-center hidden"
                }
              >
                <NavItem name="Profile" link="/user/profile" />
                <Button text="Sign Out"  onClick={signOut}/>
              </ul>
            ) : (
              <ul
                className={
                  showMenu
                    ? mobileMenuClass
                    : "w-11/12 lg:flex justify-around items-center hidden"
                }
              >
                {/* <NavItem name="Sign Up" link="/register" /> */}
                {/* <NavItem name="Sign In" link="/login" /> */}

                <a href="/register">
                  <Button text="Sign Up" />
                </a>
                <a href="/login">
                  <Button text="Sign In" />
                </a>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
