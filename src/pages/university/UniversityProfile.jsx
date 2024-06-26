import React from "react";
import { useSelector } from "react-redux";
import UniversityLayout from "../../layout/UniversityLayout";

const UniversityProfile = () => {
  const university = useSelector((state) => state.auth.user); 

  if (!university) {
    return <div>Loading...</div>;
  }

  const {
    name,
    about,
    history,
    mission,
    values,
    logo,
    coverPhoto,
    contactDetails,
    placementStats,
    courses,
  } = university;

  return (
    <UniversityLayout>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row items-center mb-6 p-6">
          <div className="flex flex-col items-center md:items-start md:w-1/2">
            <img
              src={logo || "https://via.placeholder.com/150"}
              alt={`${name} logo`}
              className="w-32 h-32 object-contain mb-4"
            />
            <h1 className="text-4xl font-bold text-center md:text-left">
              {name}
            </h1>
          </div>
          <div
            className="md:w-1/2 h-64 bg-cover bg-center rounded-md"
            style={{
              backgroundImage: `url(${
                coverPhoto || "https://via.placeholder.com/1200x400"
              })`,
            }}
          ></div>
        </div>

        <div className="px-6 py-4">
          <Section title="About" content={about} />
          <Section title="History" content={history} />
          <Section title="Mission" content={mission} />
          <Section title="Values" content={values} />

          <div className="border-t border-gray-200">
            <div className="py-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Contact Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                <ContactDetail
                  label="Address"
                  value={contactDetails?.address}
                />
                <ContactDetail label="Phone" value={contactDetails?.phone} />
                <ContactDetail
                  label="Website"
                  value={
                    <a
                      href={contactDetails?.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      {contactDetails?.website}
                    </a>
                  }
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200">
            <div className="py-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Placement Stats
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                <PlacementDetail
                  label="Percentage Placed"
                  value={`${
                    placementStats?.percentagePlaced ?? "Not available"
                  }%`}
                />
                <PlacementDetail
                  label="Average Salary"
                  value={`$${placementStats?.avgSalary ?? "Not available"}`}
                />
                <PlacementDetail
                  label="Highest Salary"
                  value={`$${placementStats?.highestSalary ?? "Not available"}`}
                />
                <PlacementDetail
                  label="Top Recruiters"
                  value={
                    placementStats?.topRecruiters?.length > 0
                      ? placementStats.topRecruiters.join(", ")
                      : "Not available"
                  }
                />
              </div>
            </div>
          </div>

          {courses && courses.length > 0 && (
            <div className="border-t border-gray-200">
              <div className="py-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Courses
                </h2>
                <ul className="list-disc list-inside text-gray-800">
                  {courses.map((course, index) => (
                    <li key={index}>{course}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </UniversityLayout>
  );
};

const Section = ({ title, content }) => (
  <section className="mb-6 border-t border-gray-200 py-4">
    <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
    <p>{content ?? "No information available"}</p>
  </section>
);

const ContactDetail = ({ label, value }) => (
  <div className="flex items-center">
    <p className="text-gray-600 font-semibold mr-2">{label}:</p>
    <p className="text-gray-800">{value ?? "Not available"}</p>
  </div>
);

const PlacementDetail = ({ label, value }) => (
  <div className="flex items-center">
    <p className="text-gray-600 font-semibold mr-2">{label}:</p>
    <p className="text-gray-800">{value}</p>
  </div>
);

export default UniversityProfile;
