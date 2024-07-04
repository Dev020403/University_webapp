import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios, { AxiosHeaders } from "axios";
import Select from "react-select";
import StudentLayout from "../../layout/StudentLayout";
import { updateUserProfile } from "../../redux/authSlice";
import { ToastContainer, toast } from "react-toastify";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import TextInputField from "../../components/auth/TextInputField";
import DateInputField from "../../components/auth/DateInputField";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  dob: Yup.date().nullable().required("Date of Birth is required"),
  address: Yup.string().required("Address is required"),
  phone: Yup.string().required("Phone is required"),
  jeePr: Yup.number().required("JEE Percentile is required"),
  boardPr: Yup.number().required("Board Percentile is required"),
});

const preferenceOptions = [
  {
    value: "Computer Science Engineering",
    label: "Computer Science Engineering",
  },
  { value: "Information Technology", label: "Information Technology" },
  { value: "Civil Engineering", label: "Civil Engineering" },
  { value: "Mechanical Engineering", label: "Mechanical Engineering" },
  { value: "Electrical Engineering", label: "Electrical Engineering" },
];

const PreferencesSelect = () => {
  const { values, setFieldValue } = useFormikContext();

  return (
    <Select
      options={preferenceOptions}
      isMulti
      value={preferenceOptions.filter((option) =>
        values.preferences.includes(option.value)
      )}
      onChange={(selectedOptions) => {
        const selectedPreferences = selectedOptions
          ? selectedOptions.map((option) => option.value)
          : [];
        setFieldValue("preferences", selectedPreferences);
      }}
      className="basic-multi-select"
      classNamePrefix="select"
    />
  );
};

const StudentSetting = () => {
  const user = useSelector((state) => state.auth.user);
  const userId = user?._id;
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const initialValues = {
    name: user?.profile?.name ?? "",
    dob: user?.profile?.personalInfo?.dob
      ? new Date(user.profile.personalInfo.dob).toISOString().substr(0, 10)
      : "",
    address: user?.profile?.personalInfo?.address ?? "",
    phone: user?.profile?.personalInfo?.phone ?? "",
    jeePr: user?.profile?.academicBackground?.jeePr ?? "",
    boardPr: user?.profile?.academicBackground?.boardPr ?? "",
    preferences: user?.profile?.preferences ?? [],
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const payload = {
      name: values.name,
      personalInfo: {
        dob: values.dob,
        address: values.address,
        phone: values.phone,
      },
      academicBackground: {
        jeePr: values.jeePr,
        boardPr: values.boardPr,
      },
      preferences: values.preferences,
    };

    try {
      const response = await axios.put(
        `http://localhost:3000/api/update-student/${userId}`,
        payload,
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
      toast.error("Update failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <StudentLayout>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Update Details
          </h1>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                {/* Personal Information Section */}
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Personal Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <TextInputField
                      label="Name"
                      name="name"
                      type="text"
                      placeholder="Enter your name"
                    />
                    <DateInputField label="Date of Birth" name="dob" />
                    <TextInputField
                      label="Address"
                      name="address"
                      type="text"
                      placeholder="Enter your address"
                    />
                    <TextInputField
                      label="Phone"
                      name="phone"
                      type="text"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                {/* Preferences Section */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Preferences
                  </h2>
                  <PreferencesSelect />
                </div>

                {/* Academic Background Section */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Academic Background
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TextInputField
                      label="JEE Percentile"
                      name="jeePr"
                      type="number"
                      placeholder="Enter your JEE percentile"
                    />
                    <TextInputField
                      label="Board Percentile"
                      name="boardPr"
                      type="number"
                      placeholder="Enter your board percentile"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div>
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
    </StudentLayout>
  );
};

export default StudentSetting;
