import { Button, Divider, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import React from "react";

const StudentDetails = ({ student }) => {
  if (!student || !student.profile) return null;

  const DetailSection = ({ title, children }) => (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-3 text-primary">{title}</h3>
      <div className="pl-4 border-l-4 border-primary">{children}</div>
    </div>
  );

  const DetailItem = ({ label, value }) => {
    if (value === null || value === undefined || value === "") return null;
    return (
      <p className="mb-2">
        <span className="font-medium text-gray-700">{label}:</span>{" "}
        <span className="text-gray-600">{value}</span>
      </p>
    );
  };

  return (
    <div className="space-y-6">
      <p className="text-xl font-bold text-primary-800 mb-4">
        {student.profile.name}
      </p>

      <DetailSection title="Personal Information">
        <DetailItem label="Date of Birth" value={student.profile.personalInfo?.dob} />
        <DetailItem label="Address" value={student.profile.personalInfo?.address} />
        <DetailItem label="Phone" value={student.profile.personalInfo?.phone} />
      </DetailSection>

      <DetailSection title="Academic Background">
        <DetailItem label="JEE Percentage" value={`${student.profile.academicBackground?.jeePr}%`} />
        <DetailItem label="Board Percentage" value={`${student.profile.academicBackground?.boardPr}%`} />
      </DetailSection>

      <DetailSection title="Preferences">
        <ul className="list-disc pl-5 text-gray-600">
          {student.profile.preferences?.length > 0 ? (
            student.profile.preferences.map((preference, index) => (
              <li key={index} className="mb-1">
                {preference}
              </li>
            ))
          ) : (
            <li>No preferences specified</li>
          )}
        </ul>
      </DetailSection>
    </div>
  );
};
const ViewStudentModal = ({ isOpen, onClose, student }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="inside">
      <ModalContent className="max-h-[90vh]">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold ">University Details</h2>
            </ModalHeader>
            <Divider />
            <ModalBody className="overflow-auto">
              <StudentDetails student={student} />
            </ModalBody>
            <Divider />
            <ModalFooter>
              <Button color="primary" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ViewStudentModal;
