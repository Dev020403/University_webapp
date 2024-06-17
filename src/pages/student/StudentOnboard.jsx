// components/StudentOnboardForm.js
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const StudentOnboardForm = () => {
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    dob: Yup.date().required("Date of Birth is required").nullable(),
    gender: Yup.string().required("Gender is required"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]{10}$/, "add valid phone no of 10 digits"),
    studentGrades: Yup.number().max(100).min(0).required("Student grades is required"),
    preferences: Yup.string(),
    interests: Yup.string(),
  });

  const initialValues = {
    firstname: "",
    middlename: "",
    lastname: "",
    dob: null,
    gender: "",
    phone: "",
    studentGrades: "",
    preferences: "",
    interests: "",
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Student Onboard Form Data:", values);
    setSubmitting(false);
  };

  return (
    <div className="mx-52 my-10 bg-white p-8 rounded-lg border-2 shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Student Onboarding
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Row 1: Firstname, Middlename, Lastname */}
              <div className="flex flex-col">
                <label htmlFor="firstname" className="font-semibold">
                  First Name
                </label>
                <Field
                  type="text"
                  name="firstname"
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                  placeholder="First Name"
                />
                <ErrorMessage
                  name="firstname"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="middlename" className="font-semibold">
                  Middle Name
                </label>
                <Field
                  type="text"
                  name="middlename"
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                  placeholder="Middle Name"
                />
                {/* No validation for middlename */}
              </div>
              <div className="flex flex-col">
                <label htmlFor="lastname" className="font-semibold">
                  Last Name
                </label>
                <Field
                  type="text"
                  name="lastname"
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                  placeholder="Last Name"
                />
                <ErrorMessage
                  name="lastname"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Row 2: Phone, DOB, Gender */}
              <div className="flex flex-col">
                <label htmlFor="phone" className="font-semibold">
                  Phone Number
                </label>
                <Field
                  type="text"
                  name="phone"
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                  placeholder="Phone Number"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="dob" className="font-semibold">
                  Date of Birth
                </label>
                <Field
                  type="date"
                  name="dob"
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                />
                <ErrorMessage
                  name="dob"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="gender" className="font-semibold">
                  Gender
                </label>
                <Field
                  as="select"
                  name="gender"
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Field>
                <ErrorMessage
                  name="gender"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col">
              {/* Row 3: Student Grades, Preferences, Interests */}
              <label className="font-semibold">Student Grades</label>
              <Field
                type="text"
                name="studentGrades"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                placeholder="Student Grades"
              />
              <ErrorMessage
                name="studentGrades"
                component="div"
                className="text-red-500 text-sm"
              />

              <label className="font-semibold mt-4">Preferences</label>
              <Field
                type="text"
                name="preferences"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                placeholder="Preferences"
              />
              <ErrorMessage
                name="preferences"
                component="div"
                className="text-red-500 text-sm"
              />

              <label className="font-semibold mt-4">Interests</label>
              <Field
                type="text"
                name="interests"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                placeholder="Interests"
              />
              <ErrorMessage
                name="interests"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors w-full ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default StudentOnboardForm;
