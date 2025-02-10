import LoginForm from "@/components/guest/LoginForm";
import AppLayout from "@/components/UI/layout/app/AppLayout";
import React from "react";

const LoginPage = () => {
  return (
    <AppLayout>
      <LoginForm title="Login" showSocialLogin={true} />
    </AppLayout>
  );
};

export default LoginPage;
