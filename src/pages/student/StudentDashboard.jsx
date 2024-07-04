import React, { useEffect, useState } from "react";
import StudentLayout from "../../layout/StudentLayout";
import WelcomeCard from "../../components/WelcomeCard";
import UniversityCard from "../../components/student/UniversityCard";
import { useSelector } from "react-redux";
import { Spinner } from "@nextui-org/react";
import axiosInstance from "../../config/axiosConfig";

const StudentDashboard = () => {
  const userName = useSelector(
    (state) => state.auth.user?.profile?.name || "Guest"
  );
  const token = useSelector((state) => state.auth.token);
  const [universities, setUniversities] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false); 

  const fetchUniversities = async (page = 1, limit = 2) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/universities?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUniversities(response.data.universities);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching universities:", error);
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUniversities(page);
  }, [page]);

  return (
    <StudentLayout>
      <WelcomeCard name={userName}></WelcomeCard>
      <div className="bg-white rounded-md shadow-md">
        <div className="font-bold text-xl px-7 pt-5">
          Universities of your interest
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <Spinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 p-5">
            {universities.map((university) => (
              <UniversityCard
                id={university._id}
                key={university._id}
                logo={university.logo || "https://dummyimage.com/30"}
                coverImage={
                  university.coverPhoto || "https://dummyimage.com/300"
                }
                name={university.name || "Unknown University"}
                description={university.about || "No description available"}
                address={
                  university.contactDetails?.address || "No address provided"
                }
                ratings={university.ratings || "N/A"}
              />
            ))}
          </div>
        )}
        <div className="flex justify-between items-center p-5">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentDashboard;
