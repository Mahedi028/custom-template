import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

const AppLayout = ({ children }) => {
  return (
    <div className="w-full h-full bg-gray-400 flex flex-col justify-center items-start">
      <Header />
      <main className="w-full flex flex-col justify-center items-start">{children}</main>
      <Footer />
    </div>
  );
};

export default AppLayout;
