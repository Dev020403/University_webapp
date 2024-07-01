import React, { useEffect, useState } from "react";
import axios from "axios";
import UniversityLayout from "../../layout/UniversityLayout";
import { useSelector } from "react-redux";
import CourseCard from "../../components/university/CourseCard";
import { toast, ToastContainer } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import { Button } from "@nextui-org/react";
const UniversityCourses = () => {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const universityId = useSelector((state) => state.auth.user._id);
  const token = useSelector((state) => state.auth.token);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration: "",
    feeStructure: "",
    facilities: "",
    resources: "",
  });

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/${universityId}/courses`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, [universityId, token]);

  const handleEdit = async (courseId, updatedCourse) => {
    try {
      await axios.put(
        `http://localhost:3000/api/update-courses/${courseId}`,
        {
          ...updatedCourse,
          facilities: updatedCourse.facilities
            .split(",")
            .map((item) => item.trim()),
          resources: updatedCourse.resources
            .split(",")
            .map((item) => item.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchCourses();
      toast.success("Course updated successfully");
    } catch (error) {
      console.error("Error updating course:", error);
      toast.error("Failed to update course");
    }
  };

  const handleDelete = async (courseId) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/delete-courses/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchCourses();
      toast.success("Course deleted successfully");
    } catch (error) {
      console.error("Error deleting course:", error);
      toast.error("Failed to delete course");
    }
  };

  const handleCreateCourse = async () => {
    try {
      await axios.post(
        `http://localhost:3000/api/create-course`,
        {
          ...formData,
          universityId: universityId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchCourses();
      toast.success("Course created successfully");
      setShowModal(false);
      setFormData({
        name: "",
        description: "",
        duration: "",
        feeStructure: "",
        facilities: "",
        resources: "",
      });
    } catch (error) {
      console.error("Error creating course:", error);
      toast.error("Failed to create course");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    handleCreateCourse(); // Handle course creation manually
  };
  return (
    <UniversityLayout>
      <div className="container mx-auto px-4 py-8 relative bg-white border-1 shadow-">
        {/* Background blur effect */}
        {showModal && <div className="modal-backdrop"></div>}

        <div className="flex justify-end mb-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex gap-2"
            onClick={() => setShowModal(true)}
          >
            <span>create course</span>
            <FaPlus className="mt-1 " />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white w-1/2 rounded-lg shadow-lg">
              <div className="p-4">
                <h2 className="text-xl font-bold mb-4">Create New Course</h2>
                <form onSubmit={handleFormSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Course Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-sm py-2 px-3 w-full"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="3"
                      className="border border-gray-300 rounded-sm py-2 px-3 w-full"
                      required
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Duration (Years)
                    </label>
                    <input
                      type="number"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-sm py-2 px-3 w-full"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Fee Structure
                    </label>
                    <input
                      type="number"
                      name="feeStructure"
                      value={formData.feeStructure}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-sm py-2 px-3 w-full"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Facilities (comma separated)
                    </label>
                    <input
                      type="text"
                      name="facilities"
                      value={formData.facilities}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-sm py-2 px-3 w-full"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Resources (comma separated)
                    </label>
                    <input
                      type="text"
                      name="resources"
                      value={formData.resources}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-sm py-2 px-3 w-full"
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      color="danger"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button color="primary" type="submit">
                      Create Course
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        <ToastContainer />
      </div>
    </UniversityLayout>
  );
};

export default UniversityCourses;
