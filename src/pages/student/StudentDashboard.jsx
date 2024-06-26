import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentLayout from "../../layout/StudentLayout";
import WelcomeCard from "../../components/WelcomeCard";
import UniversityCard from "../../components/student/UniversityCard";
import { useSelector } from "react-redux";

const StudentDashboard = () => {
  const userName = useSelector(
    (state) => state.auth.user?.profile?.name || "Guest"
  );
  const token = useSelector((state) => state.auth.token);
  const [universities, setUniversities] = useState([]);

  const fetchUniversities = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/universities",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUniversities(response.data.universities);
    } catch (error) {
      console.error("Error fetching universities:", error);
    }
  };
  useEffect(() => {
    fetchUniversities();
  }, []);

  return (
    <StudentLayout>
      <WelcomeCard name={userName}></WelcomeCard>
      <div className="bg-white rounded-md shadow-md">
        <div className="font-bold text-xl px-7 pt-5">
          Universities of your interest
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 p-5">
          {universities.map((university) => (
            <UniversityCard
              id={university._id}
              key={university._id}
              logo={university.logo || "https://dummyimage.com/30"}
              coverImage={university.coverPhoto || "https://dummyimage.com/300"}
              name={university.name || "Unknown University"}
              description={university.about || "No description available"}
              address={
                university.contactDetails?.address || "No address provided"
              }
              ratings={university.ratings || "N/A"}
            />
          ))}
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentDashboard;
