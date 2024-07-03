import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextInputField from "../../components/auth/TextInputField"; // Adjust the path as needed
import { useNavigate } from "react-router-dom";

const UniversitySignup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

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
      toast.success("University registration successful!");
      navigate("/login");
    } catch (error) {
      console.error(
        "University registration failed:",
        error.response.data.message
      );
      toast.error(error.response.data.message);
    } finally {
      setSubmitting(false);
    }
  };

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
          {({ isSubmitting }) => (
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
                isPassword={true}
                showPassword={showPassword}
                toggleShowPassword={() => setShowPassword(!showPassword)}
              />
              <TextInputField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="********"
                isPassword={true}
                showPassword={showConfirmPassword}
                toggleShowPassword={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
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
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </div>
  );
};

export default UniversitySignup;
