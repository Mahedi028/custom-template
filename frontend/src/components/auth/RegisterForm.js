import React from "react";
import AuthCard from "../UI/card/AuthCard";
import InputField from "../UI/input/InputField";
import Button from "../UI/button/Button";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
const RegisterForm = () => {

  






  return (
    <div className="w-full grid grid-cols-12 justify-center items-center">
      <div className="md:col-span-6 col-span-12 flex justify-center items-center mt-3">
        <div className="md:w-[70%] w-11/12 h-[50vh] bg-gray-200 flex flex-col justify-center items-center gap-3 rounded-md drop-shadow-md">
          <div className="w-4/5 bg-white flex justify-center items-center py-3 rounded-lg">
            <FcGoogle className="text-3xl mx-2" />
            <span>SIGN WITH GOOGLE</span>
          </div>
          <div className="w-4/5 bg-white flex justify-center items-center py-3 rounded-lg">
            <FaFacebook className="text-3xl mx-2 text-blue-600" />
            <span>SIGN WITH FACEBOOK</span>
          </div>
          <p className="text-slate-600 text-base my-2">
            Already have an account?<a href="/login">Login</a>
          </p>
        </div>
      </div>
      <div className="md:col-span-6 col-span-12 flex justify-center items-center">
        <AuthCard title="Register">
          <InputField
            type="text"
            name="username"
            placeholder="Enter username"
          />
          <InputField type="text" name="email" placeholder="Enter email" />
          <InputField
            type="password"
            name="password"
            placeholder="Enter password"
          />
          <InputField
            type="text"
            name="username"
            placeholder="Enter phone number"
          />
          <Button text="Register" />
        </AuthCard>
      </div>
    </div>
  );
};

export default RegisterForm;
