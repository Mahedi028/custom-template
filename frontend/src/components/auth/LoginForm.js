import React from "react";
import AuthCard from "../UI/card/AuthCard";
import InputField from "../UI/input/InputField";
import Button from "../UI/button/Button";

const LoginForm = () => {
  return (
    <AuthCard
      title="Login"
      className="md:w-[35%] w-11/12 bg-gray-200 flex flex-col justify-center items-center gap-3 rounded-md drop-shadow-md"
    >
      <InputField type="text" name="email" placeholder="Enter email" />
      <InputField
        type="password"
        name="password"
        placeholder="Enter password"
        login={true}
      />

      <Button
        text="Login"
        className="bg-black text-white border-4 border-btnOutline p-4  font-title rounded-full text-xl cursor-pointer uppercase font-semibold hover:px-7 transition:px duration-150 hover:shadow-customShadow"
      />
      <p className="text-slate-600 text-base my-2">
        Don't have an account?<a href="/register">Create Account</a>
      </p>
    </AuthCard>
  );
};

export default LoginForm;
