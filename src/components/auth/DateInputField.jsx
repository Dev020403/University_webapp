import React from "react";
import { Field, ErrorMessage } from "formik";

const DateInputField = ({ label, name }) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={name} className="font-semibold">
      {label}
    </label>
    <Field
      type="date"
      name={name}
      className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
    />
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-500 text-sm"
    />
  </div>
);

export default DateInputField;
