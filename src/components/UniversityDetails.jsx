import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import StudentLayout from "../layout/StudentLayout";
import { useSelector } from "react-redux";

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
        <div
          className="h-64 bg-cover bg-center text-white flex items-center justify-center rounded"
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
        <div className="flex justify-start mx-4 mt-6 space-x-8 border-b border-gray-300">
          <button
            className={`pb-2 focus:outline-none ${
              activeTab === "overview"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`pb-2 focus:outline-none ${
              activeTab === "courses"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("courses")}
          >
            Courses
          </button>
        </div>
        <div className="p-4">
          {activeTab === "overview" && (
            <div>
              <Section title="About" content={university.about} />
              <Section title="History" content={university.history} />
              <Section title="Mission" content={university.mission} />
              <Section title="Values" content={university.values} />
              <ContactDetails contactDetails={university.contactDetails} />
              <PlacementStats placementStats={university.placementStats} />
            </div>
          )}
          {activeTab === "courses" && (
            <div>
              <h2 className="text-2xl font-bold mb-2">Courses</h2>
              {university.courses.length === 0 ? (
                <p>No courses available</p>
              ) : (
                <ul className="list-disc list-inside">
                  {university.courses.map((course, index) => (
                    <li key={index}>{course}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </StudentLayout>
  );
};

const Section = ({ title, content }) => (
  <section className="mb-6">
    <h2 className="text-2xl font-bold mb-2">{title}</h2>
    <p>{content ?? "No information available"}</p>
  </section>
);

const ContactDetails = ({ contactDetails }) => (
  <section className="mb-6">
    <h2 className="text-2xl font-bold mb-2">Contact Details</h2>
    <p>
      Address: {contactDetails?.address ?? "Not specified"}
    </p>
    <p>
      Phone: {contactDetails?.phone ?? "Not specified"}
    </p>
    <p>
      Website:{" "}
      <a
        href={contactDetails?.website}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        {contactDetails?.website ?? "Not specified"}
      </a>
    </p>
  </section>
);

const PlacementStats = ({ placementStats }) => (
  <section className="mb-6">
    <h2 className="text-2xl font-bold mb-2">Placement Stats</h2>
    <p>
      Percentage Placed: {placementStats?.percentagePlaced ?? "Not available"}%
    </p>
    <p>
      Average Salary: ${placementStats?.avgSalary ?? "Not available"}
    </p>
    <p>
      Highest Salary: ${placementStats?.highestSalary ?? "Not available"}
    </p>
    <p>
      Top Recruiters:{" "}
      {placementStats?.topRecruiters?.length > 0
        ? placementStats.topRecruiters.join(", ")
        : "Not available"}
    </p>
  </section>
);

export default UniversityDetails;
