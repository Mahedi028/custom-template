import React, {useEffect, useState} from "react";
import AuthCard from "../UI/card/AuthCard";
import InputField from "../UI/input/InputField";
import Button from "../UI/button/Button";
import { useRouter } from "next/router";
import CircleLoader from "../UI/loader/circle/CircleLoader";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useAuth } from "@/hooks/auth";
const RegisterForm = () => {
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
    role:""
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
      });
    }
  };

  useEffect(() => {}, [router.query, errorMessage]);

  return (
    <>
      {loading ? (
        <CircleLoader />
      ) : (
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
            <AuthCard title="Register" onSubmit={handleSubmit}>
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
                onChange={handleInputChange}
                placeholder="Enter phone number"
                errorMessage={validationErrors.phone}
              />
              <InputField
                type="hidden"
                name="role"
                value="user"
              />
              <Button type='submit' text="Register" />
            </AuthCard>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterForm;
