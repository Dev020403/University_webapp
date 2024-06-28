import React, { useEffect, useState } from "react";
import axios from "axios";
import UniversityLayout from "../../layout/UniversityLayout";
import TableGrid from "../../components/TableGrid";
import { useSelector } from "react-redux";

const Application = () => {
  const [applications, setApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const rowsPerPage = 10;
  const token = useSelector((state) => state.auth.token);

  // Fetch applications data from the backend API
  const fetchApplications = async (page = 1) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/university-applications/6671518cd0af51e7954e3238?page=${page}&limit=${rowsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setApplications(response.data.applications);
      setTotalPages(response.data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []); // Fetch applications on component mount

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
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
        `http://localhost:3000/api/applications/${applicationId}/status`,
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

  const getStatusSelect = (applicationId, currentStatus) => (
    <select
      value={currentStatus}
      onChange={(e) => handleStatusChange(applicationId, e.target.value)}
      aria-label="Select status"
      placeholder="Select status"
    >
      <option value="submitted">Submitted</option>
      <option value="underReview">Under Review</option>
      <option value="accepted">Accepted</option>
      <option value="rejected">Rejected</option>
    </select>
  );

  const rows = applications.map((application) => ({
    id: application._id,
    name: application.student.profile.name,
    email: application.student.email,
    contact: application.student.profile.personalInfo.phone,
    status: getStatusSelect(application._id, application.applicationStatus),
    jeePr: application.student.profile.academicBackground.jeePr,
    boardPr: application.student.profile.academicBackground.boardPr,
  }));

  // Handle page change
  const handlePageChange = (newPage) => {
    fetchApplications(newPage);
  };

  return (
    <UniversityLayout>
      <TableGrid
        columns={columns}
        rows={rows}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        name={"Recent Applications"}
      />
    </UniversityLayout>
  );
};

export default Application;
