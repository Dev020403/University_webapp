import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import StudentLayout from "../../layout/StudentLayout";
import UniversityCard from "../../components/student/UniversityCard";

const UniversityList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [universities, setUniversities] = useState([]);

  const token = useSelector((state) => state.auth.token);

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
      // console.log(response.data)
      setUniversities(response.data.universities);
    } catch (error) {
      console.error("Error fetching universities:", error);
    }
  };

  useEffect(() => {
    fetchUniversities();
  }, []);

  const filteredUniversities = universities.filter((university) =>
    university.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <StudentLayout>
      <div className="bg-white">
        <div className="font-bold text-xl px-7 pt-5">
          Universities of your interest
        </div>
        <div className="px-7 pt-5">
          <input
            type="text"
            placeholder="Search universities"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
          {filteredUniversities.map((university) => (
            <UniversityCard
              id={university._id}
              key={university._id}
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

export default UniversityList;
