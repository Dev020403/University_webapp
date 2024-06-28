import React, { useRef } from "react";
import { useField } from "formik";

const ImageUploadField = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const fileInputRef = useRef(null);

  const handleChange = (event) => {
    const file = event.currentTarget.files[0];
    helpers.setValue(file);
  };

  return (
    <div className="mb-4">
      <label
        htmlFor={props.id || props.name}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        onBlur={field.onBlur}
        className={`mt-1 block w-full px-3 py-2 border ${
          meta.touched && meta.error ? "border-red-500" : "border-gray-300"
        } rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm`}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default ImageUploadField;
