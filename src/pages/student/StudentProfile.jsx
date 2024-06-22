import React from "react";
import { useSelector } from "react-redux";
import StudentLayout from "../../layout/StudentLayout";

const StudentProfile = () => {
  const user = useSelector((state) => state.auth.user);

  if (!user || !user.profile) {
    return <div>Loading...</div>;
  }

  const { name, personalInfo, academicBackground, preferences } = user.profile;

  return (
    <StudentLayout>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Student Profile
          </h1>
          <div className="border-t border-gray-200">
            <div className="py-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                <div className="flex items-center">
                  <p className="text-gray-600 font-semibold mr-2">Name:</p>
                  <p className="text-gray-800">{name}</p>
                </div>
                <div className="flex items-center">
                  <p className="text-gray-600 font-semibold mr-2">
                    Date of Birth:
                  </p>
                  <p className="text-gray-800">
                    {personalInfo && personalInfo.dob
                      ? new Date(personalInfo.dob).toLocaleDateString()
                      : "Not available"}
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="text-gray-600 font-semibold mr-2">Address:</p>
                  <p className="text-gray-800">
                    {personalInfo ? personalInfo.address : "Not available"}
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="text-gray-600 font-semibold mr-2">Phone:</p>
                  <p className="text-gray-800">
                    {personalInfo ? personalInfo.phone : "Not available"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200">
            <div className="py-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Academic Background
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                <div className="flex items-center">
                  <p className="text-gray-600 font-semibold mr-2">
                    JEE Percentile:
                  </p>
                  <p className="text-gray-800">
                    {academicBackground
                      ? academicBackground.jeePr
                      : "Not available"}
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="text-gray-600 font-semibold mr-2">
                    Board Percentile:
                  </p>
                  <p className="text-gray-800">
                    {academicBackground
                      ? academicBackground.boardPr
                      : "Not available"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {preferences && preferences.length > 0 && (
            <div className="border-t border-gray-200">
              <div className="py-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Preferences
                </h2>
                <ul className="list-disc list-inside text-gray-800">
                  {preferences.map((preference, index) => (
                    <li key={index}>{preference}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentProfile;
