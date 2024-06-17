import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AuthForm = ({ isLogin }) => {
  const [selectedRole, setSelectedRole] = useState("");

  const validationSchema = Yup.object({
    username: !isLogin ? Yup.string().required("Username is required") : null,
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
    confirmPassword: !isLogin
      ? Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Required")
      : null,
    role: !isLogin ? Yup.string().required("Required") : null,
  });

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  };

  const handleSubmit = (values) => {
    if (isLogin) {
      console.log("Login data:", values);
    } else {
      console.log("Signup data:", values);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8'>
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
        <h1 className='text-2xl font-bold mb-4 text-center'>
          {isLogin ? "Login" : "Signup"}
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className='space-y-6'>
              <div className='flex flex-col gap-2'>
                <label htmlFor='email' className='font-semibold'>
                  Email Address
                </label>
                <Field
                  type='email'
                  name='email'
                  className='border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500'
                  placeholder='example@example.com'
                />
                <ErrorMessage
                  name='email'
                  component='div'
                  className='text-red-500 text-sm'
                />
              </div>
              {!isLogin && (
                <div className='flex flex-col gap-2'>
                  <label htmlFor='username' className='font-semibold'>
                    Username
                  </label>
                  <Field
                    type='text'
                    name='username'
                    className='border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500'
                    placeholder='Username'
                  />
                  <ErrorMessage
                    name='username'
                    component='div'
                    className='text-red-500 text-sm'
                  />
                </div>
              )}
              <div className='flex flex-col gap-2'>
                <label htmlFor='password' className='font-semibold'>
                  Password
                </label>
                <Field
                  type='password'
                  name='password'
                  className='border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500'
                  placeholder='********'
                />
                <ErrorMessage
                  name='password'
                  component='div'
                  className='text-red-500 text-sm'
                />
              </div>
              {!isLogin && (
                <>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor='confirmPassword' className='font-semibold'>
                      Confirm Password
                    </label>
                    <Field
                      type='password'
                      name='confirmPassword'
                      className='border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500'
                      placeholder='********'
                    />
                    <ErrorMessage
                      name='confirmPassword'
                      component='div'
                      className='text-red-500 text-sm'
                    />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor='role' className='font-semibold'>
                      Role
                    </label>
                    <ul className='grid w-full gap-4 md:grid-cols-2'>
                      <li>
                        <Field
                          type='radio'
                          id='role-student'
                          name='role'
                          value='student'
                          className='hidden peer'
                        />
                        <label
                          htmlFor='role-student'
                          className='inline-flex items-center justify-center w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer hover:text-gray-600 hover:bg-gray-100 peer-checked:border-blue-600 peer-checked:text-blue-600 text-lg font-semibold'
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
                          type='radio'
                          id='role-university'
                          name='role'
                          value='university'
                          className='hidden peer'
                        />
                        <label
                          htmlFor='role-university'
                          className='inline-flex items-center justify-center w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer hover:text-gray-600 hover:bg-gray-100 peer-checked:border-blue-600 peer-checked:text-blue-600 text-lg font-semibold'
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
                      name='role'
                      component='div'
                      className='text-red-500 text-sm'
                    />
                  </div>
                </>
              )}
              <button
                className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors w-full'
                type='submit'
              >
                {isLogin ? "Login" : "Signup"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default AuthForm;
