import React from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextInputField from "../auth/TextInputField";
import { Button } from "@nextui-org/react";
import axiosInstance from "../../config/axiosConfig";

const CreateCourseModal = ({ showModal, setShowModal, fetchCourses }) => {
  const universityId = useSelector((state) => state.auth.user._id);
  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.role);

  const initialValues = {
    name: "",
    description: "",
    duration: "",
    feeStructure: "",
    facilities: "",
    resources: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Course name is required"),
    description: Yup.string().required("Description is required"),
    duration: Yup.number()
      .required("Duration is required")
      .positive("Duration must be a positive number"),
    feeStructure: Yup.number()
      .required("Fee structure is required")
      .positive("Fee structure must be a positive number"),
    facilities: Yup.string().required("Facilities are required"),
    resources: Yup.string().required("Resources are required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await axiosInstance.post(
        `/api/create-course`,
        {
          ...values,
          universityId: universityId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            role: role,
          },
        }
      );
      fetchCourses();
      toast.success("Course created successfully");
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error("Error creating course:", error);
      toast.error("Failed to create course");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-1/2 rounded-lg shadow-lg max-h-screen overflow-y-auto">
            <div className="p-4">
              <h2 className="text-xl font-bold mb-4">Create New Course</h2>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="flex flex-col gap-5">
                    <TextInputField
                      label="Course Name"
                      name="name"
                      type="text"
                      placeholder="Enter course name"
                    />
                    <TextInputField
                      label="Description"
                      name="description"
                      type="text"
                      placeholder="Enter course description"
                    />
                    <TextInputField
                      label="Duration (Years)"
                      name="duration"
                      type="number"
                      placeholder="Enter course duration"
                    />
                    <TextInputField
                      label="Fee Structure"
                      name="feeStructure"
                      type="number"
                      placeholder="Enter course fee structure"
                    />
                    <TextInputField
                      label="Facilities (comma separated)"
                      name="facilities"
                      type="text"
                      placeholder="Enter facilities"
                    />
                    <TextInputField
                      label="Resources (comma separated)"
                      name="resources"
                      type="text"
                      placeholder="Enter resources"
                    />
                    <div className="flex justify-end">
                      <Button
                        type="button"
                        className="mr-2"
                        onClick={() => setShowModal(false)}
                        disabled={isSubmitting}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        color="primary"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Creating..." : "Create Course"}
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default CreateCourseModal;
