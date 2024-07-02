import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/authSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import TextInputField from "../../components/auth/TextInputField"; // Adjust the import path as needed

const Login = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const initialValues = {
    username: "",
    password: "",
  };

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(loginUser(values))
      .unwrap()
      .then((response) => {
        toast.success("Login successful!");
        if (response.role === "student") {
          navigate("/student-dashboard/Dashboard");
        } else if (response.role === "university") {
          navigate("/university-dashboard/Dashboard");
        }
      })
      .catch((errorMessage) => {
        toast.error(`Login failed: ${errorMessage}`);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
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
                label="Password"
                name="password"
                type="password"
                placeholder="********"
                isPassword
                showPassword={showPassword}
                toggleShowPassword={toggleShowPassword}
              />
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors w-full"
                type="submit"
                disabled={isSubmitting || loading}
              >
                {isSubmitting || loading ? "Logging in..." : "Submit"}
              </button>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </Form>
          )}
        </Formik>
      </div>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </div>
  );
};

export default Login;
