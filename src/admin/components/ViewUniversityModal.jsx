import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Divider,
} from "@nextui-org/react";

const UniversityDetails = ({ university }) => {
  if (!university) return null;

  const DetailSection = ({ title, children }) => (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-3 text-primary">{title}</h3>
      <div className="pl-4 border-l-4 border-primary">{children}</div>
    </div>
  );

  const DetailItem = ({ label, value }) => {
    if (!value) return null;
    return (
      <p className="mb-2">
        <span className="font-medium text-gray-700">{label}:</span>{" "}
        <span className="text-gray-600">{value}</span>
      </p>
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-primary-800 mb-4 ">{university.name}</h2>

      <DetailSection title="Contact Information">
        <DetailItem label="Email" value={university.email} />
        <DetailItem label="Status" value={university.status} />
        <DetailItem label="Address" value={university.contactDetails?.address} />
        <DetailItem label="Phone" value={university.contactDetails?.phone} />
        <DetailItem label="Website" value={university.contactDetails?.website} />
      </DetailSection>

      <DetailSection title="About the University">
        {university.about && <p className="text-gray-600 mb-2">{university.about}</p>}
        <DetailItem label="History" value={university.history} />
        <DetailItem label="Mission" value={university.mission} />
        <DetailItem label="Values" value={university.values} />
      </DetailSection>

      <DetailSection title="Placement Statistics">
        <DetailItem label="Percentage Placed" value={`${university.placementStats?.percentagePlaced}%`} />
        <DetailItem label="Average Salary" value={university.placementStats?.avgSalary ? `$${university.placementStats.avgSalary.toLocaleString()}` : null} />
        <DetailItem label="Highest Salary" value={university.placementStats?.highestSalary ? `$${university.placementStats.highestSalary.toLocaleString()}` : null} />
        <DetailItem label="Top Recruiters" value={university.placementStats?.topRecruiters?.join(", ")} />
      </DetailSection>

      <DetailSection title="Courses Offered">
        <ul className="list-disc pl-5 text-gray-600">
          {university.courses?.length > 0 ? (
            university.courses.map((course, index) => (
              <li key={index} className="mb-1">
                {course.name}
              </li>
            ))
          ) : (
            <li>No courses available</li>
          )}
        </ul>
      </DetailSection>
    </div>
  );
};

const ViewUniversityModal = ({ isOpen, onClose, university }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="inside">
      <ModalContent className="max-h-[90vh]">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold ">
                University Details
              </h2>
            </ModalHeader>
            <Divider />
            <ModalBody className="overflow-auto">
              <UniversityDetails university={university} />
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

export default ViewUniversityModal;
