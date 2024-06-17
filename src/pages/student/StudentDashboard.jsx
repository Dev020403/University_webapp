import React from "react";
import StudentLayout from "../../layout/StudentLayout";
import WelcomeCard from "../../components/WelcomeCard";
import UniversityCard from "../../components/student/UniversityCard";

const StudentDashboard = () => {
  return (
    <StudentLayout>
      <WelcomeCard name={"Dev"}></WelcomeCard>
      <div className="bg-white rounded-md shadow-md">
        <div className="font-bold text-xl px-7 pt-5">
          Univerities of your interest
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
          <UniversityCard
            coverImage="https://dummyimage.com/300"
            name="Example University 1"
            description="A leading institution in higher education. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            address="123 University Street, City, Country"
            ratings={4.5}
          />
          <UniversityCard
            coverImage="https://dummyimage.com/300"
            name="Example University 2"
            description="Another leading institution in higher education. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            address="456 College Avenue, City, Country"
            ratings={4.2}
          />
          <UniversityCard
            coverImage="https://dummyimage.com/300"
            name="Example University 1"
            description="A leading institution in higher education. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            address="123 University Street, City, Country"
            ratings={4.5}
          />
          <UniversityCard
            coverImage="https://dummyimage.com/300"
            name="Example University 2"
            description="Another leading institution in higher education. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            address="456 College Avenue, City, Country"
            ratings={4.2}
          />
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentDashboard;
