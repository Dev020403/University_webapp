import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

const DeleteUniversityModal = ({ isOpen, onClose, onConfirm, universityName }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Confirm Deletion</ModalHeader>
        <ModalBody>
          Are you sure you want to delete the university "{universityName}"? This action cannot be undone.
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onPress={onConfirm}>Delete</Button>
          <Button color="primary" variant="light" onPress={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteUniversityModal;