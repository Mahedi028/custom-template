import React from "react";
import AuthCard from "../UI/card/AuthCard";
import InputField from "../UI/input/InputField";
import Button from "../UI/button/Button";

const LoginForm = () => {
  return (
    <AuthCard title="Login">
      <InputField type="text" name="email" placeholder="Enter email" />
      <InputField
        type="password"
        name="password"
        placeholder="Enter password"
      />
      <Button text="Login" />
    </AuthCard>
  );
};

export default LoginForm;
