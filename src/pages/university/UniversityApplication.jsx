import React, { useEffect, useState } from "react";
import axios from "axios";
import UniversityLayout from "../../layout/UniversityLayout";
import TableGrid from "../../components/TableGrid";
import { useSelector } from "react-redux";

const Application = () => {
  const [applications, setApplications] = useState([]);
  const rowsPerPage = 10;
  const token = useSelector((state) => state.auth.token);

  const fetchApplications = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/university-applications/6671518cd0af51e7954e3238`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setApplications(response.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      console.log(newStatus);
      // Optimistically update the status locally
      setApplications((prevApplications) =>
        prevApplications.map((application) =>
          application._id === applicationId
            ? { ...application, applicationStatus: newStatus }
            : application
        )
      );

      // Update status on the server
      const response = await axios.put(
        `http://localhost:3000/api/${applicationId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error("Error updating application status:", error);
    }
  };

  const columns = [
    { key: "id", label: "Application ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "contact", label: "Contact" },
    { key: "status", label: "Status" },
    { key: "jeePr", label: "JEE Percentile" },
    { key: "boardPr", label: "Board Percentile" },
  ];

  const rows = applications.map((application, id) => ({
    id: application._id,
    name: application.student.profile.name,
    email: application.student.email,
    contact: application.student.profile.personalInfo.phone,
    status: (
      // <Select
      //   value={application.applicationStatus}
      //   onChange={(e) => handleStatusChange(application._id, e.target)}
      //   aria-label="Select status"
      //   placeholder="Select status"
      // >
      //   <SelectItem value="submitted">Submitted</SelectItem>
      //   <SelectItem value="underReview">Under Review</SelectItem>
      //   <SelectItem value="accepted">Accepted</SelectItem>
      //   <SelectItem value="rejected">Rejected</SelectItem>
      // </Select>
      <select
        value={application.applicationStatus}
        onChange={(e) => handleStatusChange(application._id, e.target.value)}
        aria-label="Select status"
        placeholder="Select status"
      >
        <option value="submitted">Submitted</option>
        <option value="underReview">Under Review</option>
        <option value="accepted">Accepted</option>
        <option value="rejected">Rejected</option>
      </select>
    ),
    jeePr: application.student.profile.academicBackground.jeePr,
    boardPr: application.student.profile.academicBackground.boardPr,
  }));

  return (
    <UniversityLayout>
      <TableGrid
        columns={columns}
        rows={rows}
        rowsPerPage={rowsPerPage}
        name={"Recent Applications"}
      />
    </UniversityLayout>
  );
};

export default Application;
