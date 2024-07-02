import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import UniversityLayout from "../../layout/UniversityLayout";
import CourseCard from "../../components/university/CourseCard";
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

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Course name is required"),
    description: Yup.string().required("Description is required"),
    duration: Yup.number()
      .positive("Duration must be a positive number")
      .required("Duration is required"),
    feeStructure: Yup.number()
      .positive("Fee must be a positive number")
      .required("Fee structure is required"),
    facilities: Yup.string().required("Facilities are required"),
    resources: Yup.string().required("Resources are required"),
  });

  const initialValues = {
    name: "",
    description: "",
    duration: "",
    feeStructure: "",
    facilities: "",
    resources: "",
  };

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

  const handleCreateCourse = async (values, { resetForm }) => {
    try {
      await axios.post(
        `http://localhost:3000/api/create-course`,
        {
          ...values,
          universityId: universityId,
          facilities: values.facilities.split(",").map((item) => item.trim()),
          resources: values.resources.split(",").map((item) => item.trim()),
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
      resetForm();
    } catch (error) {
      console.error("Error creating course:", error);
      toast.error("Failed to create course");
    }
  };

  return (
    <UniversityLayout>
      <div className="container mx-auto px-4 py-8 relative bg-white border-1 shadow-">
        <div className="flex justify-end mb-4">
          <Button color="primary" variant="ghost" endContent={<FaPlus />} onPress={onOpen}>
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
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleCreateCourse}
              >
                {({ errors, touched }) => (
                  <Form>
                    <ModalHeader className="flex flex-col gap-1">
                      Create New Course
                    </ModalHeader>
                    <ModalBody>
                      <Field name="name">
                        {({ field }) => (
                          <Input
                            {...field}
                            label="Course Name"
                            placeholder="Enter course name"
                            isInvalid={touched.name && errors.name}
                            errorMessage={touched.name && errors.name}
                          />
                        )}
                      </Field>
                      <Field name="description">
                        {({ field }) => (
                          <Textarea
                            {...field}
                            label="Description"
                            placeholder="Enter course description"
                            isInvalid={
                              touched.description && errors.description
                            }
                            errorMessage={
                              touched.description && errors.description
                            }
                          />
                        )}
                      </Field>
                      <Field name="duration">
                        {({ field }) => (
                          <Input
                            {...field}
                            type="number"
                            label="Duration (Years)"
                            placeholder="Enter course duration"
                            isInvalid={touched.duration && errors.duration}
                            errorMessage={touched.duration && errors.duration}
                          />
                        )}
                      </Field>
                      <Field name="feeStructure">
                        {({ field }) => (
                          <Input
                            {...field}
                            type="number"
                            label="Fee Structure"
                            placeholder="Enter fee structure"
                            isInvalid={
                              touched.feeStructure && errors.feeStructure
                            }
                            errorMessage={
                              touched.feeStructure && errors.feeStructure
                            }
                          />
                        )}
                      </Field>
                      <Field name="facilities">
                        {({ field }) => (
                          <Input
                            {...field}
                            label="Facilities (comma separated)"
                            placeholder="Enter facilities"
                            isInvalid={touched.facilities && errors.facilities}
                            errorMessage={
                              touched.facilities && errors.facilities
                            }
                          />
                        )}
                      </Field>
                      <Field name="resources">
                        {({ field }) => (
                          <Input
                            {...field}
                            label="Resources (comma separated)"
                            placeholder="Enter resources"
                            isInvalid={touched.resources && errors.resources}
                            errorMessage={touched.resources && errors.resources}
                          />
                        )}
                      </Field>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Cancel
                      </Button>
                      <Button color="primary" type="submit">
                        Create Course
                      </Button>
                    </ModalFooter>
                  </Form>
                )}
              </Formik>
            )}
          </ModalContent>
        </Modal>

        <ToastContainer />
      </div>
    </UniversityLayout>
  );
};

export default UniversityCourses;
