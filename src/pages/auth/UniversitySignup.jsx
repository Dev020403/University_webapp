import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UniversitySignup = () => {
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    name: Yup.string().required("University Name is required"),
  });

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/register/university",
        values
      );
      console.log("Registration successful:", response.data);
      toast.success("University registration successful!"); // Show success toast
    } catch (error) {
      console.error(
        "University registration failed:",
        error.response.data.message
      );
      toast.error(error.response.data.message); // Show error toast
    } finally {
      setSubmitting(false);
    }
  };

  const TextInputField = ({ label, name, type = "text", placeholder }) => (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-semibold">
        {label}
      </label>
      <Field
        type={type}
        name={name}
        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
        placeholder={placeholder}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm"
      />
    </div>
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          University Signup
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, isSubmitting }) => (
            <Form className="space-y-6">
              <TextInputField
                label="Username"
                name="username"
                placeholder="Username"
              />
              <TextInputField
                label="Email Address"
                name="email"
                type="email"
                placeholder="example@example.com"
              />
              <TextInputField
                label="Password"
                name="password"
                type="password"
                placeholder="********"
              />
              <TextInputField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="********"
              />
              <TextInputField
                label="University Name"
                name="name"
                placeholder="University Name"
              />
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors w-full"
                type="submit"
                disabled={isSubmitting}
              >
                Signup
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
      />
    </div>
  );
};

export default UniversitySignup;
