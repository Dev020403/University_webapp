import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Textarea,
} from "@nextui-org/react";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Course name is required"),
  description: Yup.string().required("Description is required"),
  feeStructure: Yup.number()
    .positive("Fee must be positive")
    .required("Fee is required"),
  facilities: Yup.string().required("Facilities are required"),
  resources: Yup.string().required("Resources are required"),
});

const CourseCard = ({ course, onEdit, onDelete }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const initialValues = {
    name: course.name,
    description: course.description,
    feeStructure: course.feeStructure,
    facilities: course.facilities.join(", "),
    resources: course.resources.join(", "),
  };

  const handleEditSubmit = (values, { setSubmitting }) => {
    onEdit(course._id, values);
    setSubmitting(false);
    onOpenChange(false);
  };

  const handleDeleteConfirm = () => {
    onDelete(course._id);
    setConfirmDeleteOpen(false);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 p-6 transition-all duration-300 hover:shadow-xl">
      <h3 className="text-2xl font-bold mb-3 text-blue-900">{course.name}</h3>
      <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
      <div className="space-y-2 mb-4">
        <p className="text-gray-800 font-semibold">
          Fee: <span className="text-green-600">${course.feeStructure}</span>
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Facilities:</span>{" "}
          {course.facilities.join(", ")}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Resources:</span>{" "}
          {course.resources.join(", ")}
        </p>
      </div>
      <div className="flex gap-3">
        <Button
          color="primary"
          variant="flat"
          className="flex-1 font-semibold"
          onPress={onOpen}
        >
          Edit Course
        </Button>
        <Button
          color="danger"
          variant="flat"
          className="flex-1 font-semibold"
          onPress={() => setConfirmDeleteOpen(true)}
        >
          Delete Course
        </Button>
      </div>
      {/*Edit modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        size="3xl"
      >
        <ModalContent className="bg-white">
          {(onClose) => (
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleEditSubmit}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form>
                  <ModalHeader className="text-2xl font-bold mb-4">
                    Edit Course
                  </ModalHeader>
                  <ModalBody>
                    <div className="mb-4">
                      <Field
                        as={Input}
                        label="Course Name"
                        name="name"
                        placeholder="Enter course name"
                      />
                      {errors.name && touched.name && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.name}
                        </div>
                      )}
                    </div>
                    <div className="mb-4">
                      <Field
                        as={Textarea}
                        label="Description"
                        name="description"
                        placeholder="Enter course description"
                      />
                      {errors.description && touched.description && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.description}
                        </div>
                      )}
                    </div>
                    <div className="mb-4">
                      <Field
                        as={Input}
                        label="Fee Structure"
                        name="feeStructure"
                        placeholder="Enter fee structure"
                        type="number"
                      />
                      {errors.feeStructure && touched.feeStructure && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.feeStructure}
                        </div>
                      )}
                    </div>
                    <div className="mb-4">
                      <Field
                        as={Input}
                        label="Facilities (comma separated)"
                        name="facilities"
                        placeholder="Enter facilities"
                      />
                      {errors.facilities && touched.facilities && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.facilities}
                        </div>
                      )}
                    </div>
                    <div className="mb-4">
                      <Field
                        as={Input}
                        label="Resources (comma separated)"
                        name="resources"
                        placeholder="Enter resources"
                      />
                      {errors.resources && touched.resources && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.resources}
                        </div>
                      )}
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="danger"
                      variant="light"
                      className="flex-1 font-semibold"
                      onPress={onClose}
                    >
                      Cancel
                    </Button>
                    <Button
                      color="primary"
                      className="flex-1 font-semibold"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Save Changes
                    </Button>
                  </ModalFooter>
                </Form>
              )}
            </Formik>
          )}
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={confirmDeleteOpen}
        onOpenChange={setConfirmDeleteOpen}
        placement="center"
        size="xs"
      >
        <ModalContent className="bg-white">
          <ModalHeader className="text-2xl font-bold mb-4">
            Confirm Delete
          </ModalHeader>
          <ModalBody>
            <p className="text-gray-700">
              Are you sure you want to delete <strong>{course.name}</strong>?
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              className="flex-1 font-semibold"
              onPress={() => setConfirmDeleteOpen(false)}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              className="flex-1 font-semibold"
              onPress={handleDeleteConfirm}
            >
              Confirm Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CourseCard;
