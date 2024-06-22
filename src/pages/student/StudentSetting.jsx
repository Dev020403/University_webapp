import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Select from "react-select";
import StudentLayout from "../../layout/StudentLayout";
import { updateUserProfile } from "../../redux/authSlice";
import { ToastContainer, toast } from "react-toastify";

const StudentSetting = () => {
  const user = useSelector((state) => state.auth.user);
  const userId = user._id;
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: user.profile.name || "",
    dob: user.profile.personalInfo.dob
      ? new Date(user.profile.personalInfo.dob).toISOString().substr(0, 10)
      : "",
    address: user.profile.personalInfo.address || "",
    phone: user.profile.personalInfo.phone || "",
    jeePr: user.profile.academicBackground.jeePr || "",
    boardPr: user.profile.academicBackground.boardPr || "",
    preferences: user.profile.preferences || [],
  });

  const { name, dob, address, phone, jeePr, boardPr, preferences } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePreferencesChange = (selectedOptions) => {
    const selectedPreferences = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setFormData({ ...formData, preferences: selectedPreferences });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = {
      name,
      personalInfo: {
        dob,
        address,
        phone,
      },
      academicBackground: {
        jeePr,
        boardPr,
      },
      preferences,
    };

    try {
      const response = await axios.put(
        `http://localhost:3000/api/update-student/${userId}`,
        updatedUser
      );
      console.log("API Response:", response.data);
      dispatch(updateUserProfile(response.data));
      toast.success("Data Updated Successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      toast.error(
        "Registration failed. Please try again.",
        err.response.data.message
      );
    }
  };

  return (
    <StudentLayout>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Student Settings
          </h1>

          <form onSubmit={handleSubmit}>
            {/* Personal Information Section */}
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-semibold mb-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-semibold mb-2"
                    htmlFor="dob"
                  >
                    Date of Birth
                  </label>
                  <input
                    className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                    type="date"
                    id="dob"
                    name="dob"
                    value={dob}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-semibold mb-2"
                    htmlFor="address"
                  >
                    Address
                  </label>
                  <input
                    className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                    type="text"
                    id="address"
                    name="address"
                    value={address}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-semibold mb-2"
                    htmlFor="phone"
                  >
                    Phone
                  </label>
                  <input
                    className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                    type="text"
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Preferences Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Preferences
              </h2>
              <Select
                options={[
                  { value: "cse", label: "Computer Sciece Engineering" },
                  { value: "it", label: "Information Technology" },
                  { value: "ce", label: "Civil Engineering" },
                  { value: "me", label: "Mechanical Engineering" },
                  { value: "ec", label: "Electrical Engineering" },
                ]}
                isMulti
                value={preferences.map((pref) => ({
                  value: pref,
                  label: pref,
                }))}
                onChange={handlePreferencesChange}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </div>
            {/* Academic Background Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Academic Background
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-semibold mb-2"
                    htmlFor="jeePr"
                  >
                    JEE Percentile
                  </label>
                  <input
                    className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                    type="number"
                    id="jeePr"
                    name="jeePr"
                    value={jeePr}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-semibold mb-2"
                    htmlFor="boardPr"
                  >
                    Board Percentile
                  </label>
                  <input
                    className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                    type="number"
                    id="boardPr"
                    name="boardPr"
                    value={boardPr}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </StudentLayout>
  );
};

export default StudentSetting;
