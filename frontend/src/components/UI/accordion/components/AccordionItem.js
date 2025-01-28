import React from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

import { MdArrowDropDown } from "react-icons/md";
import { MdArrowDropUp } from "react-icons/md";


const AccordionItem = ({
  title,
  index,
  currentIndex,
  children,
  Icon,
  onOpen,
  collapsed,
  onOpenSidebar,
}) => {
  const isOpen = index === currentIndex;

  const handleMenuToggle = () => {
    onOpen(isOpen ? null : index);
  };

  const accordionItemCollapsed =
    "grid grid-rows-1 grid-cols-1 cursor-pointer flex justify-around p-2 hover:bg-stone-300 transition-colors duration-300 cursor-pointer";
  const accordionItem =
    "gird grid-cols-3 flex flex-col justify-around p-2 hover:bg-stone-300 transition:colors duration-300 cursor-pointer";
  const open = "";

  return (
    <>
      {!collapsed ? (
        <div
          className={collapsed ? accordionItemCollapsed : accordionItem}
          onClick={handleMenuToggle}
        >
          <div className="gird gird-cols-3 flex justify-between items-center">
            {Icon}
            {!collapsed ? (
              <div className="w-full flex justify-start items-center mx-3">
                <p className="text-md uppercase font-semibold text-left">
                  {title}
                </p>
              </div>
            ) : null}
            {isOpen ? (
              <MdArrowDropUp
                className={!collapsed ? "text-4xl cursor-pointer" : "hidden"}
              />
            ) : (
              <MdArrowDropDown
                className={!collapsed ? "text-4xl cursor-pointer" : "hidden"}
              />
            )}
          </div>

          {isOpen && (
            <div className="col-span-full leading-6 justify-center items-center">
              {children}
            </div>
          )}
        </div>
      ) : (
        <div
          className={collapsed ? accordionItemCollapsed : accordionItem}
          onClick={onOpenSidebar}
        >
          <div className="gird gird-cols-3 flex justify-around items-center">
            {Icon}
            {!collapsed ? (
              <div className="w-full flex justify-start items-center">
                <p className="text-xl uppercase font-semibold text-left">
                  {title}
                </p>
              </div>
            ) : null}
            {isOpen ? (
              <IoIosArrowUp
                className={!collapsed ? "text-2xl cursor-pointer" : "hidden"}
              />
            ) : (
              <IoIosArrowDown
                className={!collapsed ? "text-2xl cursor-pointer" : "hidden"}
              />
            )}
          </div>

          {isOpen && (
            <div className="col-span-full leading-6 justify-center items-center">
              {children}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AccordionItem;
