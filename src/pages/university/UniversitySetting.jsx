import React from "react";
import { useDispatch, useSelector } from "react-redux";
import UniversityLayout from "../../layout/UniversityLayout";
import { ToastContainer, toast } from "react-toastify";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextInputField from "../../components/auth/TextInputField";
import { updateUserProfile } from "../../redux/authSlice";
import axiosInstance from "../../config/axiosConfig";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  about: Yup.string(),
  history: Yup.string(),
  mission: Yup.string(),
  values: Yup.string(),
  logo: Yup.string(),
  coverPhoto: Yup.string(),
  placementStats: Yup.object().shape({
    percentagePlaced: Yup.number(),
    avgSalary: Yup.number(),
    highestSalary: Yup.number(),
    topRecruiters: Yup.array()
      .of(Yup.string())
      .transform((value) => {
        if (typeof value === "string") {
          return value.split(",").map((recruiter) => recruiter.trim());
        }
        return value;
      })
      .test("is-array", "Top Recruiters must be an array", (value) =>
        Array.isArray(value)
      ),
  }),
  contactDetails: Yup.object().shape({
    address: Yup.string(),
    phone: Yup.string(),
    website: Yup.string(),
  }),
});

const UniversitySettings = () => {
  const university = useSelector((state) => state.auth.user);
  const id = university._id;
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const initialValues = {
    name: university?.name || "",
    about: university?.about || "",
    history: university?.history || "",
    mission: university?.mission || "",
    values: university?.values || "",
    logo: university?.logo || "",
    coverPhoto: university?.coverPhoto || "",
    placementStats: {
      percentagePlaced: university?.placementStats?.percentagePlaced || 0,
      avgSalary: university?.placementStats?.avgSalary || 0,
      highestSalary: university?.placementStats?.highestSalary || 0,
      topRecruiters:
        university?.placementStats?.topRecruiters?.join(", ") || "",
    },
    contactDetails: {
      address: university?.contactDetails?.address || "",
      phone: university?.contactDetails?.phone || "",
      website: university?.contactDetails?.website || "",
    },
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Convert the topRecruiters string to an array
      values.placementStats.topRecruiters = values.placementStats.topRecruiters
        .split(",")
        .map((recruiter) => recruiter.trim());

      console.log(values);
      const response = await axiosInstance.put(
        `/api/update-university/${id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data) {
        console.log("API Response:", response.data);
        dispatch(updateUserProfile(response.data));
        toast.success("Data Updated Successfully!");
      }
    } catch (err) {
      console.error("Update failed:", err);
      toast.error(
        "Update failed. Please try again.",
        err.response.data.message
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <UniversityLayout>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Update Details
          </h1>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form>
                {/* Basic Information Section */}
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Basic Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TextInputField
                      label="Name"
                      name="name"
                      type="text"
                      placeholder="Enter university name"
                    />
                    <TextInputField
                      label="About"
                      name="about"
                      type="text"
                      placeholder="Enter about the university"
                    />
                    <TextInputField
                      label="History"
                      name="history"
                      type="text"
                      placeholder="Enter university history"
                    />
                    <TextInputField
                      label="Mission"
                      name="mission"
                      type="text"
                      placeholder="Enter university mission"
                    />
                    <TextInputField
                      label="Core Values"
                      name="values"
                      type="text"
                      placeholder="Enter core values"
                    />
                    <TextInputField
                      label="Logo"
                      name="logo"
                      type="text"
                      placeholder="Upload university logo"
                    />
                    <TextInputField
                      label="Cover Photo"
                      name="coverPhoto"
                      type="text"
                      placeholder="Upload cover photo"
                    />
                  </div>
                </div>

                {/* Placement Statistics Section */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Placement Statistics
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TextInputField
                      label="Percentage Placed"
                      name="placementStats.percentagePlaced"
                      type="number"
                      placeholder="Enter percentage placed"
                    />
                    <TextInputField
                      label="Average Salary"
                      name="placementStats.avgSalary"
                      type="number"
                      placeholder="Enter average salary"
                    />
                    <TextInputField
                      label="Highest Salary"
                      name="placementStats.highestSalary"
                      type="number"
                      placeholder="Enter highest salary"
                    />
                    <TextInputField
                      label="Top Recruiters"
                      name="placementStats.topRecruiters"
                      type="text"
                      placeholder="Enter top recruiters, separated by commas"
                    />
                  </div>
                </div>

                {/* Contact Details Section */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Contact Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TextInputField
                      label="Address"
                      name="contactDetails.address"
                      type="text"
                      placeholder="Enter contact address"
                    />
                    <TextInputField
                      label="Phone"
                      name="contactDetails.phone"
                      type="text"
                      placeholder="Enter contact phone number"
                    />
                    <TextInputField
                      label="Website"
                      name="contactDetails.website"
                      type="text"
                      placeholder="Enter website URL"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                  >
                    {isSubmitting ? "Updating..." : "Update Profile"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </UniversityLayout>
  );
};

export default UniversitySettings;
