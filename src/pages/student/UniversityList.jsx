import React, { useState } from "react";
import StudentLayout from "../../layout/StudentLayout";
import UniversityCard from "../../components/student/UniversityCard";

const UniversityList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const universities = [
    {
      coverImage: "https://dummyimage.com/300",
      name: "Example University 1",
      description: "A leading institution in higher education. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      address: "123 University Street, City, Country",
      ratings: 4.5,
    },
    {
      coverImage: "https://dummyimage.com/300",
      name: "Example University 2",
      description: "Another leading institution in higher education. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      address: "456 College Avenue, City, Country",
      ratings: 4.2,
    },
    {
      coverImage: "https://dummyimage.com/300",
      name: "Example University 3",
      description: "Another leading institution in higher education. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      address: "456 College Avenue, City, Country",
      ratings: 4.2,
    },
    {
      coverImage: "https://dummyimage.com/300",
      name: "Example University 4",
      description: "Another leading institution in higher education. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      address: "456 College Avenue, City, Country",
      ratings: 4.2,
    },
    {
      coverImage: "https://dummyimage.com/300",
      name: "Example University 5",
      description: "Another leading institution in higher education. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      address: "456 College Avenue, City, Country",
      ratings: 4.2,
    },
    // Add more universities here as needed
  ];

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
          {filteredUniversities.map((university, index) => (
            <UniversityCard
              key={index}
              coverImage={university.coverImage}
              name={university.name}
              description={university.description}
              address={university.address}
              ratings={university.ratings}
            />
          ))}
        </div>
      </div>
    </StudentLayout>
  );
};

export default UniversityList;
