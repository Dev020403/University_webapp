import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentSignup = () => {
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    profile: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      personalInfo: Yup.object().shape({
        dob: Yup.date().nullable().required("Date of Birth is required"),
        phone: Yup.string().required("Phone number is required"),
      }),
    }),
  });

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profile: {
      name: "",
      personalInfo: {
        dob: null,
        phone: "",
      },
    },
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/register/student",
        values
      );
      console.log("Registration successful:", response.data);
      toast.success("Registration successful!"); // Show success toast
      
      
    } catch (error) {
      console.error("Registration failed:", error.response.data.message);
      toast.error(
        "Registration failed. Please try again.",
        error.response.data.message
      ); // Show error toast
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

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Student Signup</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, isSubmitting, errors }) => (
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
                label="Full Name"
                name="profile.name"
                placeholder="Full Name"
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
              <DateInputField
                label="Date of Birth"
                name="profile.personalInfo.dob"
              />
              <TextInputField
                label="Phone Number"
                name="profile.personalInfo.phone"
                placeholder="Phone Number"
              />
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors w-full"
                type="submit"
                onClick={() => console.log(errors)}
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

export default StudentSignup;
