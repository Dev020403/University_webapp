import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextInputField from "../../components/auth/TextInputField";
import { loginAdmin } from "../../redux/adminAuthSlice";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.adminAuth);
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

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(loginAdmin(values)).unwrap();
      navigate("/admin-dashboard/dashboard");
      toast.success("Login successful!");
    } catch (err) {
      toast.error(err || "Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Admin Login</h1>
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
                type={showPassword ? "text" : "password"}
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
                {isSubmitting || loading ? "Logging in..." : "Login"}
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

export default AdminLogin;
