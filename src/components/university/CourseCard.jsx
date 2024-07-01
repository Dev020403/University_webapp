import React, { useState, useEffect } from "react";
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

const CourseCard = ({ course, onEdit, onDelete }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState({
    name: course.name,
    description: course.description,
    feeStructure: course.feeStructure,
    facilities: course.facilities.join(", "),
    resources: course.resources.join(", "),
  });

  useEffect(() => {
    // Update formData when course prop changes
    setFormData({
      name: course.name,
      description: course.description,
      feeStructure: course.feeStructure,
      facilities: course.facilities.join(", "),
      resources: course.resources.join(", "),
    });
  }, [course]);

  const handleEditChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = () => {
    onEdit(course._id, formData);
    onOpenChange(false);
  };

  const handleModalChange = (isOpen) => {
    if (!isOpen) {
      // Reset form data to original course data when modal is closed
      setFormData({
        name: course.name,
        description: course.description,
        feeStructure: course.feeStructure,
        facilities: course.facilities.join(", "),
        resources: course.resources.join(", "),
      });
    }
    onOpenChange(isOpen);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border-1 p-4">
      <h3 className="text-xl font-semibold mb-2">{course.name}</h3>
      <p className="text-gray-700 mb-4">{course.description}</p>
      <p className="text-gray-900 font-bold mb-2">
        Fee: ${course.feeStructure}
      </p>
      <p className="text-gray-700 mb-2">
        Facilities: {course.facilities.join(", ")}
      </p>
      <p className="text-gray-700 mb-4">
        Resources: {course.resources.join(", ")}
      </p>
      <Button color="primary" className="mr-2" onPress={onOpen}>
        Edit
      </Button>
      <Button color="danger" onPress={() => onDelete(course._id)}>
        Delete
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={handleModalChange}
        placement="center"
        size="3xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Course
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Course Name"
                  placeholder="Enter course name"
                  name="name"
                  value={formData.name}
                  onChange={handleEditChange}
                />
                <Textarea
                  label="Description"
                  placeholder="Enter course description"
                  name="description"
                  value={formData.description}
                  onChange={handleEditChange}
                />
                <Input
                  label="Fee Structure"
                  placeholder="Enter fee structure"
                  name="feeStructure"
                  value={formData.feeStructure}
                  onChange={handleEditChange}
                  type="number"
                />
                <Input
                  label="Facilities (comma separated)"
                  placeholder="Enter facilities"
                  name="facilities"
                  value={formData.facilities}
                  onChange={handleEditChange}
                />
                <Input
                  label="Resources (comma separated)"
                  placeholder="Enter resources"
                  name="resources"
                  value={formData.resources}
                  onChange={handleEditChange}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={handleEditSubmit}>
                  Save Changes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CourseCard;
