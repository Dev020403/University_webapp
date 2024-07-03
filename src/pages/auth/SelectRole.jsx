import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    role: Yup.string().required("Role is required"),
  });

  const initialValues = {
    role: "",
  };

  const handleSubmit = (values) => {
    console.log("Form data:", values);
    if (selectedRole === "student") {
      navigate("/student-signup");
    } else if (selectedRole === "university") {
      navigate("/university-signup");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Role Selection</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className="space-y-6">
              <div className="flex flex-col gap-2">
                <ul className="grid w-full gap-4 md:grid-cols-2">
                  <li>
                    <Field
                      type="radio"
                      id="role-student"
                      name="role"
                      value="student"
                      className="hidden peer"
                    />
                    <label
                      htmlFor="role-student"
                      className="inline-flex items-center justify-center w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer hover:text-gray-600 hover:bg-gray-100 peer-checked:border-blue-600 peer-checked:text-blue-600 text-lg font-semibold"
                      onClick={() => {
                        setSelectedRole("student");
                        setFieldValue("role", "student");
                      }}
                    >
                      Student
                    </label>
                  </li>
                  <li>
                    <Field
                      type="radio"
                      id="role-university"
                      name="role"
                      value="university"
                      className="hidden peer"
                    />
                    <label
                      htmlFor="role-university"
                      className="inline-flex items-center justify-center w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer hover:text-gray-600 hover:bg-gray-100 peer-checked:border-blue-600 peer-checked:text-blue-600 text-lg font-semibold"
                      onClick={() => {
                        setSelectedRole("university");
                        setFieldValue("role", "university");
                      }}
                    >
                      University
                    </label>
                  </li>
                </ul>
                <ErrorMessage
                  name="role"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors w-full"
                type="submit"
              >
                Continue
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RoleSelection;
