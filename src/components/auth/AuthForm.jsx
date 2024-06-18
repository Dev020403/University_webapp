import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AuthForm = () => {
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const initialValues = {
    username: "",
    password: "",
  };

  const handleSubmit = (values) => {
    console.log("Form data:", values);
    // Perform login or signup logic here
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8'>
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
        <h1 className='text-2xl font-bold mb-4 text-center'>Authentication</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className='space-y-6'>
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
              <button
                className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors w-full'
                type='submit'
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AuthForm;
