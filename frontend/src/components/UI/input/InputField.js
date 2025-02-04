import React from "react";

const InputField = ({
  type,
  name,
  value,
  placeholder,
  onChange,
  className,
  inputContainerClassName,
  rows,
  cols,
  max,
  min,
  login,
  errorMessage,
}) => {
  switch (type) {
    case "text":
      return (
        <div
          className={
            inputContainerClassName
              ? inputContainerClassName
              : "w-full flex flex-col justify-center items-center"
          }
        >
          <input
            type={type}
            name={name}
            value={value}
            className={
              className
                ? className
                : "w-11/12 bg-white rounded-full p-3 placeholder:text-black placeholder:font-title placeholder:font-semibold drop-shadow-md"
            }
            placeholder={placeholder}
            onChange={onChange}
          />
          <span className="text-base font-title text-textColor my-2">
            {errorMessage}
          </span>
        </div>
      );
      break;
    case "email":
      return (
        <div
          className={
            inputContainerClassName
              ? inputContainerClassName
              : "w-full flex flex-col justify-center items-center"
          }
        >
          <input
            type={type}
            name={name}
            value={value}
            className={
              className
                ? className
                : "w-11/12 bg-white rounded-full p-3 placeholder:text-black placeholder:font-title placeholder:font-semibold drop-shadow-md"
            }
            placeholder={placeholder}
            onChange={onChange}
          />
          <span className="text-base font-title text-textColor my-2">
            {errorMessage}
          </span>
        </div>
      );
      break;
    case "hidden":
      return (
        <input
          type={type}
          name={name}
          value={value}
          className={
            className
              ? className
              : "w-11/12 bg-white rounded-full p-3 placeholder:text-black placeholder:font-title placeholder:font-semibold drop-shadow-md"
          }
          placeholder={placeholder}
          onChange={onChange}
        />
      );
      break;
    case "password":
      return (
        <div className="w-full flex flex-col justify-center items-center my-auto">
          <input
            type={type}
            name={name}
            value={value}
            className={
              className
                ? className
                : "w-11/12 bg-white rounded-full p-3 placeholder:text-black placeholder:font-title placeholder:font-semibold drop-shadow-md"
            }
            placeholder={placeholder}
            onChange={onChange}
          />
          {login && (
            <a
              href="/forget-password"
              className="text-slate-600 text-base my-1"
            >
              Forget password?
            </a>
          )}

          <span className="text-base font-title text-textColor my-2">
            {errorMessage}
          </span>
        </div>
      );
      break;
    case "number":
      return (
        <div className="w-full flex flex-col justify-center items-center p-0 m-0">
          <input
            type={type}
            name={name}
            value={value}
            max={max}
            min={min}
            className={
              className
                ? className
                : "w-11/12 bg-white rounded-full p-3 placeholder:text-black placeholder:font-title placeholder:font-semibold drop-shadow-md"
            }
            placeholder={placeholder}
            onChange={onChange}
          />
          <span className="text-base font-title text-textColor my-2">
            {errorMessage}
          </span>
        </div>
      );
      break;
    case "date":
      return (
        <div className="w-full flex flex-col justify-center items-center">
          <input
            type={type}
            name={name}
            value={value}
            className={
              className
                ? className
                : "w-11/12 bg-white rounded-full p-3 placeholder:text-black placeholder:font-title placeholder:font-semibold drop-shadow-md"
            }
            placeholder={placeholder}
            onChange={onChange}
          />
          <span className="text-base font-title text-textColor my-2">
            {errorMessage}
          </span>
        </div>
      );
      break;
    case "textarea":
      return (
        <div
          className={
            inputContainerClassName
              ? inputContainerClassName
              : "w-full flex flex-col justify-center items-center"
          }
        >
          <textarea
            type={type}
            name={name}
            defaultValue={value}
            className={
              className
                ? className
                : "w-11/12 bg-white rounded-full lg:px-4 lg:py-4 md:px-2 md:py-2 placeholder:text-black placeholder:font-title placeholder:font-semibold drop-shadow-md"
            }
            rows={rows}
            cols={cols}
            placeholder={placeholder}
            onChange={onChange}
          ></textarea>
          <span className="text-base font-title text-textColor my-2">
            {errorMessage}
          </span>
        </div>
      );
      break;
    default:
      return null;
  }
};

export default InputField;
