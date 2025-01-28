import React, { useRef, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SideBar from "./components/SideBar";
import Accordion from "@/components/UI/accordion/Accordion";
import AccordionItem from "@/components/UI/accordion/components/AccordionItem";
import { FaUserPlus } from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";
const AdminLayout = ({ children, sideBar }) => {
  //set current index
  const [currentIndex, setCurrentIndex] = useState(null);
  //set menu collapsed
  const [collapse, setCollapse] = useState(false);
  //set toggle menu collapsed
  const toggleCollapseSidebar = () => {
    setCollapse((collapse) => !collapse);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center bg-stone-200">
      <Header onToggleMenu={toggleCollapseSidebar} />
      <main className="w-full flex justify-start items-center gap-3">
        {sideBar ? (
          sideBar
        ) : (
          <SideBar
            collapse={collapse}
            onOpenSidebar={toggleCollapseSidebar}
            title="Admin Panel"
          >
            <Accordion>
              <AccordionItem
                title="User"
                index={1}
                currentIndex={currentIndex}
                onOpen={setCurrentIndex}
                collapsed={collapse}
                Icon={
                  <FaUserPlus className="text-4xl cursor-pointer text-left" />
                }
              >
                <ul className="flex flex-col justify-start">
                  <li className="px-10 py-3 border-b-[1px] border-stone-300 flex justify-start items-center hover:bg-stone-100 transition-colors duration-300 cursor-pointer">
                    <a
                      href="/admin/user/roles"
                      className="text-left font-semibold"
                    >
                      Add Roles
                    </a>
                  </li>
                  <li className="px-10 py-3 border-b-[1px] border-stone-300 flex justify-start items-center hover:bg-stone-100 transition-colors duration-300 cursor-pointer">
                    <a
                      href="/admin/user/permissions"
                      className="text-left font-semibold"
                    >
                      Add Permissions
                    </a>
                  </li>
                  <li className="px-10 py-3 border-b-[1px] border-stone-300 flex justify-start items-center hover:bg-stone-100 transition-colors duration-300 cursor-pointer">
                    <a href="/admin/user" className="text-left font-semibold">
                      Add Users
                    </a>
                  </li>
                </ul>
              </AccordionItem>
            </Accordion>
            <Accordion>
              <AccordionItem
                title="Website"
                index={2}
                currentIndex={currentIndex}
                onOpen={setCurrentIndex}
                collapsed={collapse}
                Icon={
                  <TbWorldWww className="text-4xl cursor-pointer text-left" />
                }
              >
                <ul className="flex flex-col justify-start my-auto">
                  <li className="px-10 py-2 flex justify-start items-center  hover:bg-stone-100 transition-colors duration-300 cursor-pointer">
                    <a
                      href="/admin/category/new"
                      className="text-left font-semibold"
                    >
                      Logo
                    </a>
                  </li>
                  <li className="px-10 py-2 flex justify-start items-center  hover:bg-stone-100 transition-colors duration-300 cursor-pointer">
                    <a
                      href="/admin/category/new"
                      className="text-left font-semibold"
                    >
                      Banner
                    </a>
                  </li>
                  <li className="px-10 py-2 flex justify-start items-center  hover:bg-stone-100 transition-colors duration-300 cursor-pointer">
                    <a
                      href="/admin/category/new"
                      className="text-left font-semibold"
                    >
                      Feature
                    </a>
                  </li>
                  <li className="px-10 py-2 flex justify-start items-center  hover:bg-stone-100 transition-colors duration-300 cursor-pointer">
                    <a
                      href="/admin/category/new"
                      className="text-left font-semibold"
                    >
                      Pricing
                    </a>
                  </li>
                  <li className="px-10 py-2 flex justify-start items-center  hover:bg-stone-100 transition-colors duration-300 cursor-pointer">
                    <a
                      href="/admin/category/new"
                      className="text-left font-semibold"
                    >
                      About
                    </a>
                  </li>
                  <li className="px-10 py-2 flex justify-start items-center  hover:bg-stone-100 transition-colors duration-300 cursor-pointer">
                    <a
                      href="/admin/category/new"
                      className="text-left font-semibold"
                    >
                      Client Feedback
                    </a>
                  </li>
                  <li className="px-10 py-2 flex justify-start items-center  hover:bg-stone-100 transition-colors duration-300 cursor-pointer">
                    <a
                      href="/admin/category/new"
                      className="text-left font-semibold"
                    >
                      Service
                    </a>
                  </li>
                  <li className="px-10 py-2 flex justify-start items-center  hover:bg-stone-100 transition-colors duration-300 cursor-pointer">
                    <a
                      href="/admin/category/new"
                      className="text-left font-semibold"
                    >
                      Notice
                    </a>
                  </li>
                  <li className="px-10 py-2 flex justify-start items-center  hover:bg-stone-100 transition-colors duration-300 cursor-pointer">
                    <a
                      href="/admin/category/new"
                      className="text-left font-semibold"
                    >
                      Gallery
                    </a>
                  </li>
                  <li className="px-10 py-2 flex justify-start items-center  hover:bg-stone-100 transition-colors duration-300 cursor-pointer">
                    <a
                      href="/admin/category/new"
                      className="text-left font-semibold"
                    >
                      Partner
                    </a>
                  </li>
                  <li className="px-10 py-2 flex justify-start items-center  hover:bg-stone-100 transition-colors duration-300 cursor-pointer">
                    <a
                      href="/admin/category/new"
                      className="text-left font-semibold"
                    >
                      Social Icon
                    </a>
                  </li>
                </ul>
              </AccordionItem>
            </Accordion>
          </SideBar>
        )}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default AdminLayout;
