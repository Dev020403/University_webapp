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

const EditUniversityModal = ({
  isOpen,
  onClose,
  university,
  onSubmit,
  onChange,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl" scrollBehavior="inside">
      <ModalContent className="max-h-[90vh] overflow-y-auto">
        <form onSubmit={onSubmit}>
          <ModalHeader className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold">Edit University Details</h2>
          </ModalHeader>
          <ModalBody className="overflow-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Name"
              name="name"
              value={university?.name || ""}
              onChange={onChange}
            />
            <Input
              label="Logo URL"
              name="logo"
              value={university?.logo || ""}
              onChange={onChange}
            />
            <Input
              label="Cover Photo URL"
              name="coverPhoto"
              value={university?.coverPhoto || ""}
              onChange={onChange}
            />
            <Input
              label="Address"
              name="contactDetails.address"
              value={university?.contactDetails?.address || ""}
              onChange={onChange}
            />
            <Input
              label="Phone"
              name="contactDetails.phone"
              value={university?.contactDetails?.phone || ""}
              onChange={onChange}
            />
            <Input
              label="Website"
              name="contactDetails.website"
              value={university?.contactDetails?.website || ""}
              onChange={onChange}
            />
            <Textarea
              label="About"
              name="about"
              value={university?.about || ""}
              onChange={onChange}
            />
            <Textarea
              label="History"
              name="history"
              value={university?.history || ""}
              onChange={onChange}
            />
            <Textarea
              label="Mission"
              name="mission"
              value={university?.mission || ""}
              onChange={onChange}
            />
            <Textarea
              label="Values"
              name="values"
              value={university?.values || ""}
              onChange={onChange}
            />
            <div className="col-span-full">
              <h3 className="text-lg font-semibold mb-2">
                Placement Statistics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Percentage Placed"
                  name="placementStats.percentagePlaced"
                  value={university?.placementStats?.percentagePlaced || ""}
                  onChange={onChange}
                  type="number"
                />
                <Input
                  label="Average Salary"
                  name="placementStats.avgSalary"
                  value={university?.placementStats?.avgSalary || ""}
                  onChange={onChange}
                  type="number"
                />
                <Input
                  label="Highest Salary"
                  name="placementStats.highestSalary"
                  value={university?.placementStats?.highestSalary || ""}
                  onChange={onChange}
                  type="number"
                />
                <Input
                  label="Top Recruiters (comma-separated)"
                  name="placementStats.topRecruiters"
                  value={
                    university?.placementStats?.topRecruiters?.join(", ") || ""
                  }
                  onChange={(e) => {
                    const value = e.target.value
                      .split(",")
                      .map((item) => item.trim());
                    onChange({
                      target: { name: "placementStats.topRecruiters", value },
                    });
                  }}
                />
              </div>
            </div>
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

export default EditUniversityModal;
