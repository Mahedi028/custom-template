import React, { useState, useEffect } from "react";
import { useAuth } from "@/hooks/auth";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Button from "../UI/button/Button";
import InputField from "../UI/input/InputField";
import CircleLoader from "../UI/loader/circle/CircleLoader";
import AuthCard from "../UI/card/AuthCard";
const VerifyEmail = () => {
  //use hook
  const { verifyEmail, resendEmailVerification } = useAuth();
  //router
  const router = useRouter();
  //loading
  const [loading, setLoading] = useState(true);
  //error message
  const [errorMessage, setErrorMessage] = useState("");
  //extract query parameters
  const { email, expires, signature } = router.query;
  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    resendEmailVerification();
  };
  useEffect(() => {
    if (email && expires && signature) {
      verifyEmail({ email, expires, signature, setLoading, setErrorMessage });
    }
    if (errorMessage) {
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 5000,
      });
      setErrorMessage("");
    }
  }, [signature, errorMessage]);
  return (
    <>
      {loading ? (
        <CircleLoader />
      ) : (
        <AuthCard
          title="Email Verification"
          className="md:w-[35%] w-11/12 bg-gray-200 flex flex-col justify-center items-center gap-3 rounded-md drop-shadow-md"
        >
          <InputField type="email" name="email" placeholder="Enter email" />
          <Button
            text="Resend Email Verification"
            className="bg-black text-white border-4 border-btnOutline p-4  font-title rounded-full text-xl cursor-pointer uppercase font-semibold hover:px-7 transition:px duration-150 hover:shadow-customShadow"
          />
          <p className="text-slate-600 text-base my-2">
            Don't have an account?<a href="/register">Create Account</a>
          </p>
        </AuthCard>
      )}
    </>
  );
};

export default VerifyEmail;
