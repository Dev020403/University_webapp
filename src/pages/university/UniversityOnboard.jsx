import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const UniversityOnboardForm = () => {
  const [logoUrl, setLogoUrl] = useState(null);
  const [coverPhotoUrl, setCoverPhotoUrl] = useState(null);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("University name is required"),
    description: Yup.string(),
    logo: Yup.mixed(),
    coverPhoto: Yup.mixed(),
    mission: Yup.string(),
    vision: Yup.string(),
    address: Yup.string().required("Contact details are required"),
    placementInfo: Yup.object().shape({
      percentagePlacement: Yup.number().required(
        "Percentage of placement is required"
      ),
      averagePackage: Yup.string().required("Average package is required"),
      highestPackage: Yup.string().required("Highest package is required"),
      topRecruiters: Yup.string().required("Top recruiters are required"),
    }),
  });

  const initialValues = {
    name: "",
    description: "",
    logo: null,
    coverPhoto: null,
    mission: "",
    vision: "",
    address: "",
    placementInfo: {
      percentagePlacement: "",
      averagePackage: "",
      highestPackage: "",
      topRecruiters: "",
    },
  };

  const handleLogoChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    setFieldValue("logo", file);
    const imageUrl = URL.createObjectURL(file);
    setLogoUrl(imageUrl);
  };

  const handleCoverPhotoChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    setFieldValue("coverPhoto", file);
    const imageUrl = URL.createObjectURL(file);
    setCoverPhotoUrl(imageUrl);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("University Onboard Form Data:", values);
    setSubmitting(false);
  };

  return (
    <div className="max-w-4xl my-10 mx-auto bg-white border-2 p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">
        University Onboarding
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="name" className="font-semibold">
                University Name
              </label>
              <Field
                type="text"
                name="name"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                placeholder="University Name"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="description" className="font-semibold mt-4">
                Description
              </label>
              <Field
                as="textarea"
                name="description"
                rows={4}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                placeholder="Description"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Logo and Cover Photo */}
            <div className="grid grid-col-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="logo" className="font-semibold">
                  Logo
                </label>
                <input
                  type="file"
                  name="logo"
                  accept="image/*"
                  onChange={(event) => handleLogoChange(event, setFieldValue)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                />
                {logoUrl && (
                  <div className="mt-2">
                    <img
                      src={logoUrl}
                      alt="Logo Preview"
                      className="max-w-24 h-auto"
                    />
                  </div>
                )}
                <ErrorMessage
                  name="logo"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="coverPhoto" className="font-semibold">
                  Cover Photo
                </label>
                <input
                  type="file"
                  name="coverPhoto"
                  accept="image/*"
                  onChange={(event) =>
                    handleCoverPhotoChange(event, setFieldValue)
                  }
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                />
                {coverPhotoUrl && (
                  <div className="mt-2">
                    <img
                      src={coverPhotoUrl}
                      alt="Cover Photo Preview"
                      className="max-w-24 h-auto"
                    />
                  </div>
                )}
                <ErrorMessage
                  name="coverPhoto"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>
            {/* Mission and Vision */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="mission" className="font-semibold">
                  Mission
                </label>
                <Field
                  as="textarea"
                  name="mission"
                  rows={4}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                  placeholder="Mission"
                />
                <ErrorMessage
                  name="mission"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="vision" className="font-semibold">
                  Vision
                </label>
                <Field
                  as="textarea"
                  name="vision"
                  rows={4}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                  placeholder="Vision"
                />
                <ErrorMessage
                  name="vision"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="address" className="font-semibold mt-4">
                Address
              </label>
              <Field
                as="textarea"
                name="address"
                rows={4}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                placeholder="Address"
              />
              <ErrorMessage
                name="address"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Placement Info */}
            <div className="flex flex-col mt-4">
              <label className="font-semibold">Placement Info</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="flex flex-col">
                  <label htmlFor="percentagePlacement">
                    Percentage of Placement
                  </label>
                  <Field
                    type="number"
                    name="placementInfo.percentagePlacement"
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                    placeholder="Percentage of Placement"
                  />
                  <ErrorMessage
                    name="placementInfo.percentagePlacement"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="averagePackage">Average Package</label>
                  <Field
                    type="text"
                    name="placementInfo.averagePackage"
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                    placeholder="Average Package"
                  />
                  <ErrorMessage
                    name="placementInfo.averagePackage"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="highestPackage">Highest Package</label>
                  <Field
                    type="text"
                    name="placementInfo.highestPackage"
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                    placeholder="Highest Package"
                  />
                  <ErrorMessage
                    name="placementInfo.highestPackage"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="topRecruiters">Top Recruiters</label>
                  <Field
                    type="text"
                    name="placementInfo.topRecruiters"
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                    placeholder="Top Recruiters"
                  />
                  <ErrorMessage
                    name="placementInfo.topRecruiters"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors w-full mt-4 ${
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

export default UniversityOnboardForm;
