import React, { useEffect, useState } from "react";
import AuthCard from "../UI/card/AuthCard";
import InputField from "../UI/input/InputField";
import Button from "../UI/button/Button";
import { useAuth } from "@/hooks/auth";
import CircleLoader from "../UI/loader/circle/CircleLoader";
import { useRouter } from "next/router";

const AdminRegisterForm = () => {
  //use hook
  const { register } = useAuth();
  //router
  const router = useRouter();
  //get referral code
  const referral_code = router?.query?.ref;
  //define loading
  const [loading, setLoading] = useState(false);
  //define Status
  const [status, setStatus] = useState(null);
  //define states
  const [inputValues, setInputValues] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "admin",
  });
  //define errors
  const [errors, setErrors] = useState([]);
  //backend error messages
  const [errorMessage, setErrorMessage] = useState("");
  //define validation errors state
  const [validationErrors, setValidationErrors] = useState({});
  //handleInput Values
  const handleInputChange = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };
  //handling input errors
  const validate = (inputValues) => {
    const errors = {};
    const emailRegex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!inputValues.name) {
      errors.name = "Username is required";
    }
    if (!inputValues.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(inputValues.email)) {
      errors.email = "It should be a valid email address";
    }

    if (!inputValues.password) {
      errors.password = "Password is required";
    } else if (inputValues.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (inputValues.password.length > 15) {
      errors.password = "Password cannot exceed more than 10 characters";
    } else if (!passwordRegex.test(inputValues.password)) {
      errors.password =
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character";
    }
    if (!inputValues.phone) {
      errors.phone = "Phone is required";
    }

    return errors;
  };

  //check error object for
  const isObjectEmpty = (objectName) => {
    return (
      objectName &&
      Object.keys(objectName).length === 0 &&
      objectName.constructor === Object
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //client-side validation
    const errors = validate(inputValues);
    //set errors in error object
    setValidationErrors(errors);
    if (!isObjectEmpty(errors)) {
      return;
    } else {
      //set loading true
      setLoading(true);
      //distructure the values
      const { name, email, password, phone, role } = inputValues;
      //use register hook
      referral_code && referral_code !== null
        ? register({
            name,
            email,
            password,
            phone,
            role,
            referral_code,
            setErrors,
            setLoading,
            setStatus,
            setErrorMessage,
          })
        : register({
            name,
            email,
            password,
            phone,
            role,
            setErrors,
            setLoading,
            setStatus,
            setErrorMessage,
          });
      //reset form
      setInputValues({
        name: "",
        email: "",
        password: "",
        phone: "",
        role: "",
      });
    }
  };

  useEffect(() => {}, [router.query, errorMessage]);

  return (
    <>
      {loading ? (
        <CircleLoader />
      ) : (
        <div className="w-full flex justify-center items-center">
          <AuthCard
            title="Admin Register"
            onSubmit={handleSubmit}
            className="md:w-[35%] w-11/12 bg-gray-200 flex flex-col justify-center items-center gap-3 rounded-md drop-shadow-md"
          >
            <InputField
              type="text"
              name="name"
              value={inputValues.name}
              onChange={handleInputChange}
              placeholder="Enter username"
              errorMessage={validationErrors.name}
            />
            <InputField
              type="text"
              name="email"
              value={inputValues.email}
              onChange={handleInputChange}
              placeholder="Enter email"
              errorMessage={validationErrors.email}
            />
            <InputField
              type="password"
              name="password"
              value={inputValues.password}
              onChange={handleInputChange}
              placeholder="Enter password"
              errorMessage={validationErrors.password}
            />
            <InputField
              type="text"
              name="phone"
              value={inputValues.phone}
              placeholder="Enter phone number"
              onChange={handleInputChange}
              errorMessage={validationErrors.phone}
            />
            <InputField type="hidden" name="role" value={inputValues.role} />
            <Button type="submit" text="Register" />
          </AuthCard>
        </div>
      )}
    </>
  );
};

export default AdminRegisterForm;
