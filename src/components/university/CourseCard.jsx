import React, { useState } from "react";
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
    onEdit(course._id, {
      ...values,
      facilities: values.facilities.split(",").map(item => item.trim()),
      resources: values.resources.split(",").map(item => item.trim()),
    });
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

      {/* Edit modal */}
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
                    </div>
                    <div className="mb-4">
                      <Field name="description">
                        {({ field }) => (
                          <Textarea
                            {...field}
                            label="Description"
                            placeholder="Enter course description"
                            isInvalid={touched.description && errors.description}
                            errorMessage={touched.description && errors.description}
                          />
                        )}
                      </Field>
                    </div>
                    <div className="mb-4">
                      <Field name="feeStructure">
                        {({ field }) => (
                          <Input
                            {...field}
                            type="number"
                            label="Fee Structure"
                            placeholder="Enter fee structure"
                            isInvalid={touched.feeStructure && errors.feeStructure}
                            errorMessage={touched.feeStructure && errors.feeStructure}
                          />
                        )}
                      </Field>
                    </div>
                    <div className="mb-4">
                      <Field name="facilities">
                        {({ field }) => (
                          <Input
                            {...field}
                            label="Facilities (comma separated)"
                            placeholder="Enter facilities"
                            isInvalid={touched.facilities && errors.facilities}
                            errorMessage={touched.facilities && errors.facilities}
                          />
                        )}
                      </Field>
                    </div>
                    <div className="mb-4">
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