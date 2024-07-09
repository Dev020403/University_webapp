import React, { useEffect, useState } from "react";
import StudentLayout from "../../layout/StudentLayout";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Spinner } from "@nextui-org/react";
import axiosInstance from "../../config/axiosConfig";

const CourseDetails = () => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const universityId = course?.university;
  const studentId = useSelector((state) => state.auth.user._id);
  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.role);

  const fetchCourseData = async () => {
    try {
      const res = await axiosInstance.get(`/api/course/${id}`, {
        headers: { Authorization: `Bearer ${token}`, role: role },
      });
      setCourse(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleApply = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        `/api/create-application`,
        {
          studentId,
          universityId,
          courseId: id,
        },
        {
          headers: { Authorization: `Bearer ${token}`, role: role },
        }
      );
      if (response.data.code === 400) {
        toast.error("You have already applied for this course!");
        return;
      }
      toast.success("Application submitted successfully!");
      console.log("Application successful:", response.data);
    } catch (error) {
      console.error("Error applying for course:", error);
      toast.error("Error applying for course", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, [id]);

  if (!course) {
    return (
      <StudentLayout>
        <div className="flex justify-center items-center h-full">
          <Spinner color="primary" />
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="container mx-auto ">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-4">{course.name}</h1>
          <p className="text-gray-700 mb-4">{course.description}</p>
          <div className="mb-4">
            <span className="font-semibold">Fee Structure:</span> $
            {course.feeStructure}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Facilities:</span>
            <ul className="list-disc list-inside">
              {course.facilities.map((facility, index) => (
                <li key={index}>{facility}</li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <span className="font-semibold">Resources:</span>
            <ul className="list-disc list-inside">
              {course.resources.map((resource, index) => (
                <li key={index}>{resource}</li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <button
              onClick={handleApply}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? <Spinner color="white" size="sm" /> : "Enroll Now"}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </StudentLayout>
  );
};

export default CourseDetails;
