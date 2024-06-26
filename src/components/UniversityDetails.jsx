import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import StudentLayout from "../layout/StudentLayout";
import { useSelector } from "react-redux";
import { FiMapPin, FiPhone, FiGlobe } from "react-icons/fi";

const UniversityDetails = () => {
  const { id } = useParams();
  const token = useSelector((state) => state.auth.token);
  const [university, setUniversity] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  const fetchUniversityDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/universities/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUniversity(response.data);
    } catch (error) {
      console.error("Error fetching university details:", error);
    }
  };

  useEffect(() => {
    fetchUniversityDetails();
  }, [id, token]);

  if (!university) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <StudentLayout>
      <div className="container mx-auto p-6 bg-white shadow-md rounded-md">
        {/* Hero Section */}
        <div
          className="h-64 bg-cover bg-center text-white flex items-center justify-center rounded-md"
          style={{
            backgroundImage: `url(${
              university.coverPhoto || "https://via.placeholder.com/1200x400"
            })`,
          }}
        >
          <h1 className="text-4xl font-bold px-4 py-2 bg-black bg-opacity-50 rounded">
            {university.name}
          </h1>
        </div>

        {/* Tabs Section */}
        <div className="flex justify-start mx-4 mt-6 space-x-8 border-b border-gray-300">
          <TabButton
            label="Overview"
            active={activeTab === "overview"}
            onClick={() => setActiveTab("overview")}
          />
          <TabButton
            label="Courses"
            active={activeTab === "courses"}
            onClick={() => setActiveTab("courses")}
          />
          <TabButton
            label="Contact"
            active={activeTab === "contact"}
            onClick={() => setActiveTab("contact")}
          />
        </div>

        {/* Content Section based on Active Tab */}
        <div className="p-4">
          {activeTab === "overview" && (
            <OverviewSection university={university} />
          )}
          {activeTab === "courses" && (
            <CoursesSection courses={university.courses} />
          )}
          {activeTab === "contact" && (
            <ContactSection contactDetails={university.contactDetails} />
          )}
        </div>
      </div>
    </StudentLayout>
  );
};

const TabButton = ({ label, active, onClick }) => (
  <button
    className={`pb-2 focus:outline-none ${
      active ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

const OverviewSection = ({ university }) => (
  <div>
    <Section title="About" content={university.about} />
    <Section title="History" content={university.history} />
    <Section title="Mission" content={university.mission} />
    <Section title="Values" content={university.values} />
    <PlacementStats placementStats={university.placementStats} />
  </div>
);

const CoursesSection = ({ courses }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {courses.length === 0 ? (
      <p>No courses available</p>
    ) : (
      courses.map((course) => <CourseBox key={course._id} course={course} />)
    )}
  </div>
);

const CourseBox = ({ course }) => (
  <div className="bg-white shadow-lg rounded-lg overflow-hidden">
    <div className="p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-3">
        {course.name}
      </h3>
      <p className="text-sm text-gray-600 mb-3">{course.description}</p>
      <div className="mb-3">
        <p className="text-sm text-gray-700 font-medium">Facilities:</p>
        <ul className="list-disc list-inside text-sm text-gray-600">
          {course.facilities.map((facility, index) => (
            <li key={index}>{facility}</li>
          ))}
        </ul>
      </div>
      <div className="mb-3">
        <p className="text-sm text-gray-700 font-medium">Resources:</p>
        <ul className="list-disc list-inside text-sm text-gray-600">
          {course.resources.map((resource, index) => (
            <li key={index}>{resource}</li>
          ))}
        </ul>
      </div>
      <div className="mb-3">
        <p className="text-sm text-gray-700 font-medium">
          Fee Structure:{" "}
          <span className="text-gray-600">
            ${course.feeStructure || "Not specified"}
          </span>
        </p>
      </div>
      <button
       className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
        Apply
      </button>
    </div>
  </div>
);

const ContactSection = ({ contactDetails }) => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Contact Details</h2>
    <div className="flex items-center space-x-4 mb-2">
      <FiMapPin className="text-gray-600" />
      <p>{contactDetails?.address ?? "Not specified"}</p>
    </div>
    <div className="flex items-center space-x-4 mb-2">
      <FiPhone className="text-gray-600" />
      <p>{contactDetails?.phone ?? "Not specified"}</p>
    </div>
    <div className="flex items-center space-x-4 mb-2">
      <FiGlobe className="text-gray-600" />
      <a
        href={contactDetails?.website}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        {contactDetails?.website ?? "Not specified"}
      </a>
    </div>
  </div>
);

const Section = ({ title, content }) => (
  <section className="mb-6">
    <h2 className="text-2xl font-bold mb-2">{title}</h2>
    <p>{content ?? "No information available"}</p>
  </section>
);

const PlacementStats = ({ placementStats }) => (
  <section className="mb-6">
    <h2 className="text-2xl font-bold mb-2">Placement Stats</h2>
    <p>
      Percentage Placed: {placementStats?.percentagePlaced ?? "Not available"}%
    </p>
    <p>Average Salary: ${placementStats?.avgSalary ?? "Not available"}</p>
    <p>Highest Salary: ${placementStats?.highestSalary ?? "Not available"}</p>
    <p>
      Top Recruiters:{" "}
      {placementStats?.topRecruiters?.length > 0
        ? placementStats.topRecruiters.join(", ")
        : "Not available"}
    </p>
  </section>
);

export default UniversityDetails;
