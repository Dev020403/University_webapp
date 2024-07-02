import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import StudentLayout from "../layout/StudentLayout";
import { FiMapPin, FiPhone, FiGlobe } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "@nextui-org/react";

const UniversityDetails = () => {
  const { id } = useParams();
  const token = useSelector((state) => state.auth.token);

  const [university, setUniversity] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchUniversityDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/universities/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUniversity(response.data);
      } catch (error) {
        console.error("Error fetching university details:", error);
      }
    };
    fetchUniversityDetails();
  }, [id, token]);

  if (!university) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner color="primary" />
      </div>
    );
  }

  return (
    <StudentLayout>
      <div className="container mx-auto p-6 bg-white shadow-md rounded-md">
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
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="p-4">
          {activeTab === "overview" && <Overview university={university} />}
          {activeTab === "courses" && <Courses courses={university.courses} />}
          {activeTab === "contact" && (
            <Contact contact={university.contactDetails} />
          )}
        </div>
      </div>
    </StudentLayout>
  );
};

const Tabs = ({ activeTab, setActiveTab }) => (
  <div className="flex justify-start mx-4 mt-6 space-x-8 border-b border-gray-300">
    {["overview", "courses", "contact"].map((tab) => (
      <button
        key={tab}
        className={`pb-2 focus:outline-none ${
          activeTab === tab
            ? "border-b-2 border-blue-500 text-blue-500"
            : "text-gray-500"
        }`}
        onClick={() => setActiveTab(tab)}
      >
        {tab.charAt(0).toUpperCase() + tab.slice(1)}
      </button>
    ))}
  </div>
);

const Overview = ({ university }) => (
  <div>
    {["about", "history", "mission", "values"].map((section) => (
      <Section
        key={section}
        title={section.charAt(0).toUpperCase() + section.slice(1)}
        content={university[section]}
      />
    ))}
    <PlacementStats stats={university.placementStats} />
  </div>
);

const Courses = ({ courses }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {courses.length === 0 ? (
      <p>No courses available</p>
    ) : (
      courses.map((course) => <Course key={course._id} course={course} />)
    )}
  </div>
);

const Course = ({ course }) => {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/university/course-details/${course._id}`);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3">{course.name}</h3>
        <p className="text-sm text-gray-600 mb-3">{course.description}</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={handleDetailsClick}
        >
          Details
        </button>
      </div>
    </div>
  );
};
const Contact = ({ contact }) => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Contact Details</h2>
    {contact ? (
      <>
        <ContactItem icon={<FiMapPin />} detail={contact.address} />
        <ContactItem icon={<FiPhone />} detail={contact.phone} />
        <ContactItem
          icon={<FiGlobe />}
          detail={
            <a
              href={contact.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {contact.website}
            </a>
          }
        />
      </>
    ) : (
      <p>Not specified</p>
    )}
  </div>
);

const Section = ({ title, content }) => (
  <section className="mb-6">
    <h2 className="text-2xl font-bold mb-2">{title}</h2>
    <p>{content || "No information available"}</p>
  </section>
);

const PlacementStats = ({ stats }) => (
  <section className="mb-6">
    <h2 className="text-2xl font-bold mb-2">Placement Stats</h2>
    {stats ? (
      <>
        <p>Percentage Placed: {stats.percentagePlaced || "Not available"}%</p>
        <p>Average Salary: ${stats.avgSalary || "Not available"}</p>
        <p>Highest Salary: ${stats.highestSalary || "Not available"}</p>
        <p>
          Top Recruiters: {stats.topRecruiters?.join(", ") || "Not available"}
        </p>
      </>
    ) : (
      <p>No data available</p>
    )}
  </section>
);

const ContactItem = ({ icon, detail }) => (
  <div className="flex items-center space-x-4 mb-2">
    {icon}
    <p>{detail}</p>
  </div>
);

export default UniversityDetails;
