import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
} from "@nextui-org/react";

const EditStudentModal = ({ isOpen, onClose, student, onSubmit, onChange }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl" scrollBehavior="inside">
      <ModalContent className="max-h-[90vh] overflow-y-auto">
        <form onSubmit={onSubmit}>
          <ModalHeader className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold">Edit Student Details</h2>
          </ModalHeader>
          <ModalBody className="overflow-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Name"
              name="name"
              value={student?.profile?.name || ""}
              onChange={onChange}
            />
            <Input
              label="Date of Birth"
              name="dob"
              value={student?.profile?.personalInfo?.dob || ""}
              onChange={onChange}
            />
            <Input
              label="Address"
              name="address"
              value={student?.profile?.personalInfo?.address || ""}
              onChange={onChange}
            />
            <Input
              label="Phone"
              name="phone"
              value={student?.profile?.personalInfo?.phone || ""}
              onChange={onChange}
            />
            <Input
              label="JEE Percentage"
              name="jeePr"
              value={student?.profile?.academicBackground?.jeePr || ""}
              onChange={onChange}
              type="number"
            />
            <Input
              label="Board Percentage"
              name="boardPr"
              value={student?.profile?.academicBackground?.boardPr || ""}
              onChange={onChange}
              type="number"
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">
              Save Changes
            </Button>
            <Button color="danger" variant="light" onPress={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};


export default EditStudentModal;
