import React, { useEffect, useState } from "react";
import axios from "axios";
import UniversityLayout from "../../layout/UniversityLayout";
import { useSelector } from "react-redux";
import CourseCard from "../../components/university/CourseCard";
import { toast, ToastContainer } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
} from "@nextui-org/react";

const UniversityCourses = () => {
  const [courses, setCourses] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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

  // ... (keep the existing fetchCourses, handleEdit, handleDelete functions)
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
      onOpenChange(false);
      toast.success("Course created successfully");
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

  return (
    <UniversityLayout>
      <div className="container mx-auto px-4 py-8 relative bg-white border-1 shadow-">
        <div className="flex justify-end mb-4">
          <Button color="primary" endContent={<FaPlus />} onPress={onOpen}>
            Create Course
          </Button>
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

        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="center"
          size="3xl"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Create New Course
                </ModalHeader>
                <ModalBody>
                  <Input
                    label="Course Name"
                    placeholder="Enter course name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <Textarea
                    label="Description"
                    placeholder="Enter course description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                  <Input
                    type="number"
                    label="Duration (Years)"
                    placeholder="Enter course duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                  />
                  <Input
                    type="number"
                    label="Fee Structure"
                    placeholder="Enter fee structure"
                    name="feeStructure"
                    value={formData.feeStructure}
                    onChange={handleChange}
                  />
                  <Input
                    label="Facilities (comma separated)"
                    placeholder="Enter facilities"
                    name="facilities"
                    value={formData.facilities}
                    onChange={handleChange}
                  />
                  <Input
                    label="Resources (comma separated)"
                    placeholder="Enter resources"
                    name="resources"
                    value={formData.resources}
                    onChange={handleChange}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button color="primary" onPress={handleCreateCourse}>
                    Create Course
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

        <ToastContainer />
      </div>
    </UniversityLayout>
  );
};

export default UniversityCourses;
