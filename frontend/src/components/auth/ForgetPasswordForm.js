import React from "react";
import AuthCard from "../UI/card/AuthCard";
import InputField from "../UI/input/InputField";
import Button from "../UI/button/Button";

const ForgetPasswordForm = () => {
  return (
    <AuthCard
      title="Forget Password"
      className="md:w-[35%] w-11/12 bg-gray-200 flex flex-col justify-center items-center gap-3 rounded-md drop-shadow-md"
    >
      <InputField type="text" name="email" placeholder="Enter email" />
      <Button text="Forget Password" />
    </AuthCard>
  );
};

export default ForgetPasswordForm;
