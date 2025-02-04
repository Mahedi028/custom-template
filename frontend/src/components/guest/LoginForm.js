import React, { useState, useEffect } from "react";
import AuthCard from "../UI/card/AuthCard";
import InputField from "../UI/input/InputField";
import Button from "../UI/button/Button";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import CircleLoader from "../UI/loader/circle/CircleLoader";
const LoginForm = ({ title }) => {
  //use hook
  const { data: session } = useSession();
  //get user type
  const userType = session?.user?.userData?.role || null;
  //router
  const router = useRouter();
  //define loading
  const [loading, setLoading] = useState(false);
  //define states
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });
  //define message
  const [message, setMessage] = useState(router.query.message);
  //backend error message
  const [errorMessage, setErrorMessage] = useState("");
  //define errors
  const [errors, setErrors] = useState([]);
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
    //set event default
    event.preventDefault();
    //client-side validation
    const errors = validate(inputValues);
    //set validation error
    setValidationErrors(errors);
    //check if validation
    if (!isObjectEmpty(errors)) {
      return;
    } else {
      //set loading true
      setLoading(true);
      //send user credentials in next-auth signIn()
      const result = await signIn("credentials", {
        setErrorMessage,
        redirect: false,
        ...inputValues,
      }).then((res) => {
        if (res.status === 200) {
          setLoading(false);
          toast.success("Login Successfully", {
            position: "top-center",
            autoClose: 5000,
          });
        } else {
          setLoading(false);
          if (res.error) {
            setErrorMessage(res.error);
          } else {
            toast.error("Invalid Credentials Try again", {
              position: "top-center",
              autoClose: 5000,
            });
          }
        }
      });
      setLoading(false);
      //reset form
      setInputValues({
        email: "",
        password: "",
      });
    }
  }; //end of handle function
  useEffect(() => {
    if (message) {
      toast.success(message, {
        position: "top-center",
        autoClose: 5000,
      });
      setMessage("");
    }
    if (errorMessage !== "") {
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 5000,
      });
      setErrorMessage("");
    }
  }, [router.query.message, errorMessage]);

  if (userType !== null && userType === "admin") {
    router.push("/admin/dashboard");
  } else {
    return (
      <>
        {loading && !session ? (
          <CircleLoader />
        ) : (
          <AuthCard
            onSubmit={handleSubmit}
            title={title}
            className="md:w-[35%] w-11/12 bg-gray-200 flex flex-col justify-center items-center gap-3 rounded-md drop-shadow-md"
          >
            <InputField
              type="text"
              name="email"
              value={inputValues.email}
              onChange={handleInputChange}
              placeholder="Enter email"
            />
            <InputField
              type="password"
              name="password"
              value={inputValues.password}
              onChange={handleInputChange}
              placeholder="Enter password"
              login={true}
            />

            <Button
              type="submit"
              text="Login"
              className="bg-black text-white border-4 border-btnOutline p-4  font-title rounded-full text-xl cursor-pointer uppercase font-semibold hover:px-7 transition:px duration-150 hover:shadow-customShadow"
            />
            <p className="text-slate-600 text-base my-2">
              Don't have an account?<a href="/register">Create Account</a>
            </p>
          </AuthCard>
        )}
      </>
    );
  }
};

export default LoginForm;
