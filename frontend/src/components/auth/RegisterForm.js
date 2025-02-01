import React from "react";
import AuthCard from "../UI/card/AuthCard";
import InputField from "../UI/input/InputField";
import Button from "../UI/button/Button";

const RegisterForm = () => {
  return (
    <AuthCard title="Register">
      <InputField type="text" name="username" placeholder="Enter username" />
      <InputField type="text" name="email" placeholder="Enter email" />
      <InputField type="password" name="password" placeholder="Enter password" />
      <InputField type="text" name="username" placeholder="Enter phone number" />
      <Button text="Register"/>
    </AuthCard>
  );
};

export default RegisterForm;
