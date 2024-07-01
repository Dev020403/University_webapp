import React from "react";
import { Field, ErrorMessage } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const TextInputField = ({
  label,
  name,
  type = "text",
  placeholder,
  isPassword = false,
  showPassword,
  toggleShowPassword,
}) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={name} className="font-semibold">
      {label}
    </label>
    <div className="relative">
      <Field
        type={isPassword && showPassword ? "text" : type}
        name={name}
        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 w-full"
        placeholder={placeholder}
      />
      {isPassword && (
        <button
          type="button"
          onClick={toggleShowPassword}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      )}
    </div>
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-500 text-sm"
    />
  </div>
);

export default TextInputField;
